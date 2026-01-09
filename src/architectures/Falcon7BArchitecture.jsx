import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input Tokens' }, style: { background: '#fff', border: '1px solid #333' } },
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Rotary Positional Embeddings (RoPE)' }, style: { background: '#fff9c4' } },
  
  // PARALLEL BLOCK
  { id: '3', position: { x: 100, y: 160 }, data: { label: 'Falcon Decoder Block (Parallel Design)' }, style: { width: 500, height: 250, background: 'rgba(232, 245, 233, 0.5)', border: '1px dashed #2e7d32' }, type: 'group' },
  { id: '3a', position: { x: 200, y: 30 }, parentNode: '3', data: { label: 'Layer Norm' }, style: { background: '#fff', width: 100 } },
  { id: '3b', position: { x: 30, y: 120 }, parentNode: '3', data: { label: 'Multi-Query Attention (MQA)\n[Shared Key/Value across all heads]' }, style: { background: '#b3e5fc', border: '1px solid #03a9f4', width: 200 } },
  { id: '3c', position: { x: 270, y: 120 }, parentNode: '3', data: { label: 'MLP (FeedForward)' }, style: { background: '#ffccbc', border: '1px solid #ff5722', width: 200 } },
  
  // Parallel Merge Point
  { id: '4', position: { x: 250, y: 450 }, data: { label: 'Add (Input + Attn + MLP)' }, style: { background: '#fff', border: '1px solid #333' } },
  { id: '5', position: { x: 250, y: 520 }, data: { label: 'Output: Autoregressive Token' }, style: { background: '#ccffcc' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3a-3c', source: '3a', target: '3c' },
  { id: 'e3b-4', source: '3b', target: '4' },
  { id: 'e3c-4', source: '3c', target: '4' }, // Both merge into 4
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', label: 'Residual' },
  { id: 'e4-5', source: '4', target: '5' },
];

export default function Falcon7BArchitecture() {
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