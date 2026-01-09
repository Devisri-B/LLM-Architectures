import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: 8k - 32k Tokens' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // Distillation Process
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Knowledge Distillation\n[Pruned from Falcon3-7B-Base]' }, style: { background: '#ffccbc', border: '1px solid #bf360c' } },

  // 3B Block
  { id: '3', position: { x: 150, y: 160 }, data: { label: 'Falcon 3 Block (22 Layers)' }, style: { width: 500, height: 280, background: 'rgba(255, 243, 224, 0.5)', border: '1px dashed #e65100' }, type: 'group' },
  { id: '3a', position: { x: 50, y: 40 }, parentNode: '3', data: { label: 'GQA [12 Query Heads : 4 KV Heads]' }, style: { background: '#fff', width: 400 } },
  { id: '3b', position: { x: 50, y: 110 }, parentNode: '3', data: { label: 'SwiGLU MLP' }, style: { background: '#ffe0b2', width: 400 } },
  { id: '3c', position: { x: 50, y: 180 }, parentNode: '3', data: { label: 'RMSNorm' }, style: { background: '#fff', width: 400 } },

  { id: '4', position: { x: 250, y: 480 }, data: { label: 'Output: Balanced Text Gen' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3c-4', source: '3c', target: '4' },
];

export default function Falcon3_3B_BaseArchitecture() {
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