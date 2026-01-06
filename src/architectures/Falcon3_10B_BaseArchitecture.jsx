import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: 32k Context Window' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // Upscaling Context
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Upscaled Architecture\n[Depth-Scaled from 7B]' }, style: { background: '#e1bee7', border: '1px solid #8e24aa' } },

  // The 10B Block
  { id: '3', position: { x: 150, y: 160 }, data: { label: 'Falcon 3 Block (40 Layers)' }, style: { width: 500, height: 300, background: 'rgba(239, 235, 233, 0.5)', border: '1px dashed #5d4037' }, type: 'group' },
  { id: '3a', position: { x: 50, y: 40 }, parentNode: '3', data: { label: 'FlashAttention-3\n[Ultra-low Latency]' }, style: { background: '#b2ebf2', border: '1px solid #00acc1', width: 400 } },
  { id: '3b', position: { x: 50, y: 120 }, parentNode: '3', data: { label: 'SwiGLU MLP (Gated Linear Unit)' }, style: { background: '#ffccbc', width: 400 } },
  { id: '3c', position: { x: 50, y: 200 }, parentNode: '3', data: { label: 'RMSNorm (Stabilized)' }, style: { background: '#fff', width: 400 } },

  { id: '4', position: { x: 250, y: 500 }, data: { label: 'Output: Deep Reasoning / Math' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3c-4', source: '3c', target: '4' },
];

export default function Falcon3_10B_BaseArchitecture() {
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