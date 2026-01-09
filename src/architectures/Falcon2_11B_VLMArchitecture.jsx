import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 100, y: 0 }, data: { label: 'Visual Input' }, style: { background: '#fff', border: '1px solid #333', width: 150 } },
  { id: '2', position: { x: 400, y: 0 }, data: { label: 'Text Input' }, style: { background: '#fff', border: '1px solid #333', width: 150 } },

  // Vision Branch
  { id: '3', position: { x: 100, y: 80 }, data: { label: 'Frozen CLIP Encoder (ViT-L/14)' }, style: { background: '#ffccbc', border: '1px solid #bf360c', width: 200 } },
  
  // The Projector (Key VLM Feature)
  { id: '4', position: { x: 100, y: 180 }, data: { label: 'Dynamic Projector & Resampler\n[Multi-tile High-Res Encoding]' }, style: { background: '#fff9c4', border: '2px solid #fbc02d', width: 200 } },

  // LLM Backbone
  { id: '5', position: { x: 250, y: 300 }, data: { label: 'Falcon 2 11B Decoder-only Backbone' }, style: { width: 400, height: 150, background: 'rgba(224, 247, 250, 0.5)', border: '1px dashed #00acc1' }, type: 'group' },
  { id: '5a', position: { x: 50, y: 50 }, parentNode: '5', data: { label: 'Fused Multi-Modal Attention' }, style: { background: '#fff', width: 300 } },

  { id: '6', position: { x: 250, y: 500 }, data: { label: 'Output: Image Description / Q&A' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5a', source: '4', target: '5a', label: 'Soft Tokens' },
  { id: 'e2-5a', source: '2', target: '5a', label: 'Text Tokens' },
  { id: 'e5a-6', source: '5a', target: '6' },
];

export default function Falcon2_11B_VLMArchitecture() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView>
        <Controls /><MiniMap /><Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}