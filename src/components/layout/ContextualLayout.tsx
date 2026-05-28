import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { ReactNode } from 'react';
export const ContextualLayout = ({ left, center, right }: { left: ReactNode; center: ReactNode; right: ReactNode }) => (
  <PanelGroup direction="horizontal">
    <Panel defaultSize={20}>{left}</Panel><PanelResizeHandle />
    <Panel defaultSize={55}>{center}</Panel><PanelResizeHandle />
    <Panel defaultSize={25}>{right}</Panel>
  </PanelGroup>
);
