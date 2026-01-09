import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input Tokens' }, style: { background: '#fff', border: '1px solid #333' } },
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Embedding + RoPE' }, style: { background: '#fff9c4' } },

  // SEQUENTIAL BLOCK (Standard)
  { id: '3', position: { x: 150, y: 160 }, data: { label: 'Falcon 3 Block (Standard)' }, style: { width: 400, height: 400, background: 'rgba(236, 239, 241, 0.5)', border: '1px dashed #455a64' }, type: 'group' },
  
  { id: '3a', position: { x: 50, y: 30 }, parentNode: '3', data: { label: 'RMSNorm 1' }, style: { background: '#fff', width: 300 } },
  { id: '3b', position: { x: 50, y: 90 }, parentNode: '3', data: { label: 'FlashAttention-3' }, style: { background: '#b2dfdb', border: '1px solid #009688', width: 300 } },
  { id: '3c', position: { x: 50, y: 150 }, parentNode: '3', data: { label: 'Add (Residual)' }, style: { background: 'transparent', border: 'none' } },
  
  { id: '3d', position: { x: 50, y: 200 }, parentNode: '3', data: { label: 'RMSNorm 2' }, style: { background: '#fff', width: 300 } },
  { id: '3e', position: { x: 50, y: 260 }, parentNode: '3', data: { label: 'SwiGLU MLP' }, style: { background: '#e1bee7', width: 300 } },
  { id: '3f', position: { x: 50, y: 320 }, parentNode: '3', data: { label: 'Add (Residual)' }, style: { background: 'transparent', border: 'none' } },

  { id: '4', position: { x: 250, y: 600 }, data: { label: 'Output' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3c-3d', source: '3c', target: '3d' },
  { id: 'e3d-3e', source: '3d', target: '3e' },
  { id: 'e3e-3f', source: '3e', target: '3f' },
  { id: 'e3f-4', source: '3f', target: '4' },
];

export default function Falcon3_7B_BaseArchitecture() {
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