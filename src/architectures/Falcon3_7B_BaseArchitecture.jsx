import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Scientific / Code Text' }, style: { background: '#fff', border: '1px solid #333' } },
  
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Embedding Layer' }, style: { background: '#eee', border: '1px solid #999' } },

  // The 7B Block
  { id: '3', position: { x: 150, y: 160 }, data: { label: 'Falcon 3 Block (28 Layers)' }, style: { width: 500, height: 320, background: 'rgba(232, 245, 233, 0.5)', border: '1px dashed #2e7d32' }, type: 'group' },
  { id: '3a', position: { x: 50, y: 40 }, parentNode: '3', data: { label: 'High-Dim Heads (256d)' }, style: { background: '#fff9c4', border: '1px solid #fbc02d', width: 400 } },
  { id: '3b', position: { x: 50, y: 110 }, parentNode: '3', data: { label: 'FlashAttention-3\n[Hopper GPU Optimized]' }, style: { background: '#b2dfdb', width: 400 } },
  { id: '3c', position: { x: 50, y: 180 }, parentNode: '3', data: { label: 'SwiGLU MLP' }, style: { background: '#e1bee7', width: 400 } },
  
  { id: '4', position: { x: 250, y: 520 }, data: { label: 'Output: General Purpose Text' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3c-4', source: '3c', target: '4' },
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