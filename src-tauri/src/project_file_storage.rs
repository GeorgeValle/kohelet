use std::fs::{self, OpenOptions};
use std::io::{self, Write};
use std::path::{Path, PathBuf};
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Debug, serde::Serialize)]
pub struct ProjectFileCommandError {
    code: &'static str,
    message: String,
    path: String,
}

#[tauri::command]
pub fn read_project_file_text(path: String) -> Result<String, ProjectFileCommandError> {
    read_project_file_text_from_path(Path::new(&path))
}

#[tauri::command]
pub fn write_project_file_text(
    path: String,
    contents: String,
) -> Result<(), ProjectFileCommandError> {
    safe_write_project_file_text(Path::new(&path), contents.as_bytes())
}

pub fn read_project_file_text_from_path(path: &Path) -> Result<String, ProjectFileCommandError> {
    fs::read_to_string(path).map_err(|error| map_io_error(error, path, "read_failed"))
}

pub fn safe_write_project_file_text(
    path: &Path,
    contents: &[u8],
) -> Result<(), ProjectFileCommandError> {
    ensure_replaceable_project_file_destination(path)?;

    let temp_path = temporary_path_for(path)?;
    let backup_path = backup_path_for(path)?;

    match write_temp_file(&temp_path, contents)
        .and_then(|()| replace_with_temp_file(&temp_path, path, &backup_path))
    {
        Ok(()) => Ok(()),
        Err(error) => {
            let _ = fs::remove_file(&temp_path);
            Err(map_io_error(error, path, "write_failed"))
        }
    }
}

fn ensure_replaceable_project_file_destination(path: &Path) -> Result<(), ProjectFileCommandError> {
    match fs::symlink_metadata(path) {
        Ok(metadata) if metadata.file_type().is_file() => Ok(()),
        Ok(_) => Err(ProjectFileCommandError {
            code: "write_failed",
            message: "Project file destination already exists and is not a regular file."
                .to_string(),
            path: path.display().to_string(),
        }),
        Err(error) if error.kind() == io::ErrorKind::NotFound => Ok(()),
        Err(error) => Err(map_io_error(error, path, "write_failed")),
    }
}

fn ensure_replaceable_project_file_destination_for_io(path: &Path) -> io::Result<()> {
    match fs::symlink_metadata(path) {
        Ok(metadata) if metadata.file_type().is_file() => Ok(()),
        Ok(_) => Err(io::Error::new(
            io::ErrorKind::Other,
            "project file destination already exists and is not a regular file",
        )),
        Err(error) if error.kind() == io::ErrorKind::NotFound => Ok(()),
        Err(error) => Err(error),
    }
}

fn write_temp_file(temp_path: &Path, contents: &[u8]) -> io::Result<()> {
    let mut temp_file = OpenOptions::new()
        .write(true)
        .create_new(true)
        .open(temp_path)?;
    temp_file.write_all(contents)?;
    temp_file.sync_all()?;
    drop(temp_file);
    Ok(())
}

fn replace_with_temp_file(
    temp_path: &Path,
    final_path: &Path,
    backup_path: &Path,
) -> io::Result<()> {
    match fs::rename(temp_path, final_path) {
        Ok(()) => Ok(()),
        Err(_first_error) if final_path.exists() => {
            ensure_replaceable_project_file_destination_for_io(final_path)?;
            fs::rename(final_path, backup_path)?;

            match fs::rename(temp_path, final_path) {
                Ok(()) => {
                    let _ = fs::remove_file(backup_path);
                    Ok(())
                }
                Err(replace_error) => {
                    let _ = fs::rename(backup_path, final_path);
                    Err(replace_error)
                }
            }
        }
        Err(first_error) => Err(first_error),
    }
}

fn temporary_path_for(path: &Path) -> Result<PathBuf, ProjectFileCommandError> {
    sibling_path_with_suffix(path, "tmp")
}

fn backup_path_for(path: &Path) -> Result<PathBuf, ProjectFileCommandError> {
    sibling_path_with_suffix(path, "bak")
}

fn sibling_path_with_suffix(path: &Path, suffix: &str) -> Result<PathBuf, ProjectFileCommandError> {
    let parent = path.parent().unwrap_or_else(|| Path::new("."));
    let file_name = path
        .file_name()
        .and_then(|value| value.to_str())
        .ok_or_else(|| ProjectFileCommandError {
            code: "invalid_path",
            message: "Project file path must include a valid file name.".to_string(),
            path: path.display().to_string(),
        })?;
    let unique = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|duration| duration.as_nanos())
        .unwrap_or_default();

    Ok(parent.join(format!(".{file_name}.{unique}.{suffix}")))
}

fn map_io_error(
    error: io::Error,
    path: &Path,
    fallback_code: &'static str,
) -> ProjectFileCommandError {
    let code = match error.kind() {
        io::ErrorKind::NotFound => "not_found",
        io::ErrorKind::PermissionDenied => "permission_denied",
        _ => fallback_code,
    };

    ProjectFileCommandError {
        code,
        message: error.to_string(),
        path: path.display().to_string(),
    }
}

#[cfg(test)]
mod tests {
    use super::{read_project_file_text_from_path, safe_write_project_file_text};
    use std::fs;
    use std::path::PathBuf;
    use std::time::{SystemTime, UNIX_EPOCH};

    fn unique_temp_dir() -> PathBuf {
        let unique = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("system clock should be after Unix epoch")
            .as_nanos();
        std::env::temp_dir().join(format!("kohelet-project-file-storage-test-{unique}"))
    }

    #[test]
    fn reads_project_file_text_from_path() {
        let dir = unique_temp_dir();
        fs::create_dir_all(&dir).expect("test temp dir should be created");
        let path = dir.join("story.kohelet");
        fs::write(&path, "{\"app\":\"kohelet\"}\n").expect("test file should be written");

        let contents =
            read_project_file_text_from_path(&path).expect("project file should be read");

        assert_eq!(contents, "{\"app\":\"kohelet\"}\n");
        fs::remove_dir_all(&dir).expect("test temp dir should be removed");
    }

    #[test]
    fn writes_project_file_text_with_temporary_replacement() {
        let dir = unique_temp_dir();
        fs::create_dir_all(&dir).expect("test temp dir should be created");
        let path = dir.join("story.kohelet");
        fs::write(&path, "old").expect("old test file should be written");

        safe_write_project_file_text(&path, b"new").expect("project file should be safely written");

        assert_eq!(
            fs::read_to_string(&path).expect("final file should be readable"),
            "new"
        );
        let leftovers = fs::read_dir(&dir)
            .expect("test temp dir should be readable")
            .filter_map(Result::ok)
            .filter(|entry| {
                entry
                    .file_name()
                    .to_string_lossy()
                    .contains("story.kohelet")
            })
            .count();
        assert_eq!(leftovers, 1);
        fs::remove_dir_all(&dir).expect("test temp dir should be removed");
    }

    #[test]
    fn rejects_directory_destination_without_moving_or_backing_it_up() {
        let dir = unique_temp_dir();
        fs::create_dir_all(&dir).expect("test temp dir should be created");
        let path = dir.join("story.kohelet");
        fs::create_dir_all(&path).expect("directory destination should be created");

        let error = safe_write_project_file_text(&path, b"new")
            .expect_err("directory destination should be rejected");

        assert_eq!(error.code, "write_failed");
        assert!(path.is_dir());
        assert!(!path.is_file());

        let backup_count = fs::read_dir(&dir)
            .expect("test temp dir should be readable")
            .filter_map(Result::ok)
            .filter(|entry| {
                let file_name = entry.file_name();
                let file_name = file_name.to_string_lossy();
                file_name.starts_with(".story.kohelet.") && file_name.ends_with(".bak")
            })
            .count();
        assert_eq!(backup_count, 0);

        fs::remove_dir_all(&dir).expect("test temp dir should be removed");
    }
}
