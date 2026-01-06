import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 300, y: 0 }, data: { label: 'Input: 3.5T Token Corpus' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // 3D Parallelism Indicator
  { id: '2', position: { x: 300, y: 80 }, data: { label: '3D Parallelism Splitting\n[Tensor + Pipeline + Data]' }, style: { background: '#d1c4e9', border: '1px solid #512da8' } },

  // Architecture Block
  { id: '3', position: { x: 100, y: 160 }, data: { label: 'Falcon-180B Block (Parallel Attn/MLP)' }, style: { width: 600, height: 350, background: 'rgba(224, 242, 241, 0.5)', border: '1px dashed #00796b' }, type: 'group' },
  
  // Dedicated Norms (Optimization for scale)
  { id: '3a', position: { x: 50, y: 50 }, parentNode: '3', data: { label: 'LayerNorm (Attn)' }, style: { background: '#fff', width: 120 } },
  { id: '3b', position: { x: 430, y: 50 }, parentNode: '3', data: { label: 'LayerNorm (MLP)' }, style: { background: '#fff', width: 120 } },
  
  // Components
  { id: '3c', position: { x: 50, y: 150 }, parentNode: '3', data: { label: 'Multigroup Attention\n[Independent KV per Tensor Group]' }, style: { background: '#80deea', border: '1px solid #006064', width: 220 } },
  { id: '3d', position: { x: 330, y: 150 }, parentNode: '3', data: { label: 'Wide MLP\n[4x Hidden Dim]' }, style: { background: '#ffab91', border: '1px solid #d84315', width: 220 } },

  { id: '4', position: { x: 300, y: 550 }, data: { label: 'Output: SOTA Open Source Generation' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  // Splitting to parallel paths
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e2-3b', source: '2', target: '3b' },
  // Norm to Component
  { id: 'e3a-3c', source: '3a', target: '3c' },
  { id: 'e3b-3d', source: '3b', target: '3d' },
  // Rejoining happens implicitly at add step
  { id: 'e3c-4', source: '3c', target: '4' },
  { id: 'e3d-4', source: '3d', target: '4' },
];

export default function Falcon180BArchitecture() {
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