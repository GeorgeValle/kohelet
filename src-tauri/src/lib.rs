mod project_file_storage;

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            project_file_storage::read_project_file_text,
            project_file_storage::write_project_file_text
        ])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
