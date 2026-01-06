import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 300, y: 0 }, data: { label: 'Input: Large Scale Text' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // Distributed Context
  { id: '2', position: { x: 300, y: 70 }, data: { label: 'Distributed Embedding (ZeRO Stage 3)' }, style: { background: '#e1bee7', border: '1px dashed #7b1fa2' } },

  // Block
  { id: '3', position: { x: 150, y: 150 }, data: { label: 'Falcon-40B Decoder Block' }, style: { width: 500, height: 350, background: 'rgba(255, 235, 238, 0.5)', border: '1px dashed #d32f2f' }, type: 'group' },
  { id: '3a', position: { x: 200, y: 30 }, parentNode: '3', data: { label: 'Input Layer Norm' }, style: { background: '#fff', width: 100 } },
  
  // FlashAttention + MQA
  { id: '3b', position: { x: 20, y: 120 }, parentNode: '3', data: { label: 'FlashAttention (MQA)\n[IO-Aware Exact Attention]' }, style: { background: '#b2dfdb', border: '1px solid #00695c', width: 220 } },
  { id: '3c', position: { x: 260, y: 120 }, parentNode: '3', data: { label: 'MLP (GeLU Activation)' }, style: { background: '#ffccbc', width: 220 } },
  
  { id: '3d', position: { x: 200, y: 250 }, parentNode: '3', data: { label: 'Parallel Residual Connection' }, style: { background: '#fff', width: 100 } },

  { id: '4', position: { x: 300, y: 550 }, data: { label: 'Output: High-Fidelity Text' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3a-3c', source: '3a', target: '3c' },
  { id: 'e3b-3d', source: '3b', target: '3d' },
  { id: 'e3c-3d', source: '3c', target: '3d' },
  { id: 'e3d-4', source: '3d', target: '4' },
];

export default function Falcon40BArchitecture() {
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