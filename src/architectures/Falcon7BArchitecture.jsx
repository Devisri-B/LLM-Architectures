import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input Tokens' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // Positional Encoding
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Rotary Positional Embeddings (RoPE)' }, style: { background: '#fff9c4', border: '1px solid #fbc02d' } },

  // The Parallel Block (Key Innovation)
  { id: '3', position: { x: 150, y: 160 }, data: { label: 'Falcon Decoder Block (Parallel Design)' }, style: { width: 500, height: 300, background: 'rgba(232, 245, 233, 0.5)', border: '1px dashed #2e7d32' }, type: 'group' },
  { id: '3a', position: { x: 200, y: 30 }, parentNode: '3', data: { label: 'Layer Norm 1' }, style: { background: '#fff', width: 100 } },
  
  // Parallel Branches
  { id: '3b', position: { x: 50, y: 120 }, parentNode: '3', data: { label: 'Multi-Query Attention (MQA)\n[Shared Key/Value across all heads]' }, style: { background: '#b3e5fc', border: '1px solid #03a9f4', width: 180 } },
  { id: '3c', position: { x: 270, y: 120 }, parentNode: '3', data: { label: 'MLP (FeedForward)' }, style: { background: '#ffccbc', border: '1px solid #ff5722', width: 180 } },
  
  // Rejoining
  { id: '3d', position: { x: 150, y: 220 }, parentNode: '3', data: { label: 'Add (Parallel Sum)\n[x + Attn(LN(x)) + MLP(LN(x))]' }, style: { background: 'transparent', border: 'none', fontWeight: 'bold' } },

  { id: '4', position: { x: 250, y: 500 }, data: { label: 'Output: Autoregressive Token' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  // Parallel split
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3a-3c', source: '3a', target: '3c' },
  // Parallel merge
  { id: 'e3b-3d', source: '3b', target: '3d' },
  { id: 'e3c-3d', source: '3c', target: '3d' },
  { id: 'e3d-4', source: '3d', target: '4' },
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