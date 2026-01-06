// components/models/CodeQwenArchitecture.jsx
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
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Repository / Code Snippet' }, style: { background: '#fff', border: '1px solid #333' } },
  
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Qwen Base' }, style: { background: '#eee', border: '1px solid #999' } },

  { id: '3', position: { x: 200, y: 160 }, data: { label: 'Code Specialization' }, style: { width: 350, height: 280, background: 'rgba(232, 245, 233, 0.5)', border: '1px dashed #388e3c' }, type: 'group' },
  { id: '3a', position: { x: 50, y: 30 }, parentNode: '3', data: { label: 'Fill-In-The-Middle (FIM)\n[Objective for Completion]' }, style: { background: '#c8e6c9', width: 250 } },
  { id: '3b', position: { x: 50, y: 100 }, parentNode: '3', data: { label: 'Long Context Fine-Tuning\n[For large repos]' }, style: { background: '#a5d6a7', width: 250 } },
  { id: '3c', position: { x: 50, y: 170 }, parentNode: '3', data: { label: 'Instruction Tuning (Code)' }, style: { background: '#fff', border: '1px solid #388e3c', width: 250 } },

  { id: '4', position: { x: 250, y: 480 }, data: { label: 'Output: Code Generation / Debug' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3c-4', source: '3c', target: '4' },
];

export default function CodeQwenArchitecture() {
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