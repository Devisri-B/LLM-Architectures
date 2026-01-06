import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Mobile/Web Data' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // Compact Architecture
  { id: '2', position: { x: 200, y: 80 }, data: { label: 'Falcon 3 Compact Block (1B)' }, style: { width: 400, height: 250, background: 'rgba(225, 245, 254, 0.5)', border: '1px dashed #0277bd' }, type: 'group' },
  { id: '2a', position: { x: 50, y: 40 }, parentNode: '2', data: { label: 'Standard Self-Attention' }, style: { background: '#fff', width: 300 } },
  { id: '2b', position: { x: 50, y: 100 }, parentNode: '2', data: { label: 'SwiGLU MLP' }, style: { background: '#e1bee7', width: 300 } },
  { id: '2c', position: { x: 50, y: 160 }, parentNode: '2', data: { label: 'RMSNorm' }, style: { background: '#fff', width: 300 } },

  { id: '3', position: { x: 250, y: 380 }, data: { label: 'Output: Fast/Lightweight Text' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2a', source: '1', target: '2a' },
  { id: 'e2a-2b', source: '2a', target: '2b' },
  { id: 'e2b-2c', source: '2b', target: '2c' },
  { id: 'e2c-3', source: '2c', target: '3' },
];

export default function Falcon3_1B_BaseArchitecture() {
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