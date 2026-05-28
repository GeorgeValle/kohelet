import { expect,it } from 'vitest';import { compileManuscript } from './compileManuscript';
it('orders scenes',()=>{const txt=compileManuscript([{id:'2',title:'B',order:2,content:{type:'doc',content:[]}},{id:'1',title:'A',order:1,content:{type:'doc',content:[]}}]);expect(txt.indexOf('# A')).toBeLessThan(txt.indexOf('# B'));});
