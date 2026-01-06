// components/models/MathQwenArchitecture.jsx
import React from 'react';
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Math Problem / Logic Query' }, style: { background: '#fff', border: '1px solid #333' } },
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Qwen Base' }, style: { background: '#eee', border: '1px solid #999' } },

  { id: '3', position: { x: 200, y: 160 }, data: { label: 'Math Specialization' }, style: { width: 350, height: 250, background: 'rgba(255, 248, 225, 0.5)', border: '1px dashed #ff8f00' }, type: 'group' },
  { id: '3a', position: { x: 50, y: 40 }, parentNode: '3', data: { label: 'Math SFT\n[GSM8K / MATH Datasets]' }, style: { background: '#ffecb3', width: 250 } },
  { id: '3b', position: { x: 50, y: 110 }, parentNode: '3', data: { label: 'Chain-of-Thought (CoT) Optimization' }, style: { background: '#ffe082', border: '1px solid #ff6f00', width: 250 } },

  { id: '4', position: { x: 250, y: 450 }, data: { label: 'Output: Step-by-Step Solution' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-4', source: '3b', target: '4' },
];

export default function MathQwenArchitecture() {
  // 2. Initialize state for this specific model
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // 3. Return the isolated ReactFlow instance
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}