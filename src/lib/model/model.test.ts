import { describe,it,expect } from 'vitest';import { isSceneValid } from './validation';
describe('scene validation',()=>{it('validates basic scene',()=>{expect(isSceneValid({id:'s1',title:'Escena',order:0,content:{type:'doc',content:[]}})).toBe(true);});});
