import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Long Sequence (up to 32k)' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // Untied Embeddings
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Untied Input Embeddings' }, style: { background: '#e1bee7', border: '1px solid #8e24aa' } },

  // Mamba Block
  { id: '3', position: { x: 150, y: 160 }, data: { label: 'Mamba (SSM) Block x64' }, style: { width: 500, height: 320, background: 'rgba(232, 245, 233, 0.5)', border: '1px dashed #2e7d32' }, type: 'group' },
  { id: '3a', position: { x: 150, y: 30 }, parentNode: '3', data: { label: 'RMSNorm' }, style: { background: '#fff', width: 200 } },
  
  { id: '3b', position: { x: 50, y: 100 }, parentNode: '3', data: { label: 'Linear Expansion (x2)' }, style: { background: '#b3e5fc', width: 180 } },
  { id: '3c', position: { x: 270, y: 100 }, parentNode: '3', data: { label: '1D Convolution (Local)' }, style: { background: '#ffecb3', width: 180 } },
  
  { id: '3d', position: { x: 150, y: 180 }, parentNode: '3', data: { label: 'Selective State Space (SSM)\n[Time-Variant Dynamics]' }, style: { background: '#c8e6c9', border: '2px solid #2e7d32', width: 200, fontWeight: 'bold' } },
  
  { id: '3e', position: { x: 150, y: 250 }, parentNode: '3', data: { label: 'Linear Projection (Contract)' }, style: { background: '#fff', width: 200 } },

  { id: '4', position: { x: 250, y: 550 }, data: { label: 'Output: Linear Time Inference' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3c-3d', source: '3c', target: '3d' },
  { id: 'e3d-3e', source: '3d', target: '3e' },
  { id: 'e3e-4', source: '3e', target: '4' },
];

export default function Falcon3_Mamba_7BArchitecture() {
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