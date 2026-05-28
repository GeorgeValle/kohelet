import type { Scene } from './sceneModel';
export const isSceneValid=(scene:Scene)=>scene.title.trim().length>0 && scene.order>=0;
