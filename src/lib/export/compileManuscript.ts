import type { Scene } from '../model/sceneModel';
export const compileManuscript=(scenes:Scene[])=>scenes.sort((a,b)=>a.order-b.order).map((s)=>`# ${s.title}\n${(s.content.content.length? '...':'')}`).join('\n\n');
