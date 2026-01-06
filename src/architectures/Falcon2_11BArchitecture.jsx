import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: 5T Token RefinedWeb Data' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // Base Transformer
  { id: '2', position: { x: 150, y: 80 }, data: { label: 'Falcon 2 Transformer Stack' }, style: { width: 500, height: 250, background: 'rgba(255, 253, 231, 0.5)', border: '1px dashed #fbc02d' }, type: 'group' },
  { id: '2a', position: { x: 50, y: 40 }, parentNode: '2', data: { label: 'Parallel Attention-MLP' }, style: { background: '#fff', width: 400 } },
  { id: '2b', position: { x: 50, y: 120 }, parentNode: '2', data: { label: 'FlashAttention-2 Integration' }, style: { background: '#b2dfdb', width: 400 } },

  // Untied Embeddings (Key Falcon 2 Feature)
  { id: '3', position: { x: 250, y: 380 }, data: { label: 'Untied Output Embeddings\n[Separate Weights from Input]' }, style: { background: '#e1bee7', border: '2px solid #7b1fa2', width: 300 } },

  { id: '4', position: { x: 250, y: 480 }, data: { label: 'Output: Efficient 11B Generation' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2a' },
  { id: 'e2a-2b', source: '2a', target: '2b' },
  { id: 'e2b-3', source: '2b', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
];

export default function Falcon2_11BArchitecture() {
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