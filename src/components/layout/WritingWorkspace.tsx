import styles from './WritingWorkspace.module.css';
import { ContextualLayout } from './ContextualLayout';
import { StoryWorldTree } from '../project/StoryWorldTree';
import { EditorShell } from '../editor/EditorShell';
import { ContextPanel } from '../contextual/ContextPanel';
export const WritingWorkspace = () => <div className={styles.root}><ContextualLayout left={<StoryWorldTree />} center={<EditorShell />} right={<ContextPanel />} /></div>;
