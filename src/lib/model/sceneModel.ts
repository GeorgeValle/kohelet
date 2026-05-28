import type { EntityId } from './ids';import type { RichTextContent } from '../editor/editorSerialization';
export type Scene={id:EntityId;title:string;order:number;content:RichTextContent};
