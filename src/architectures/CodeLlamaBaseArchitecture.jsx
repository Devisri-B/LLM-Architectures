// components/models/CodeLlamaBaseArchitecture.jsx
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
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Code / Natural Language' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // Positional Encoding Specifics
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'RoPE Scaling (Period 1M)\n[Enables 100k Context Window]' }, style: { background: '#fff9c4', border: '1px solid #fbc02d', width: 250 } },

  // Main Block
  { id: '3', position: { x: 200, y: 160 }, data: { label: 'Code Llama Transformer Block' }, style: { width: 350, height: 320, background: 'rgba(232, 245, 233, 0.5)', border: '1px dashed #2e7d32' }, type: 'group' },
  { id: '3a', position: { x: 50, y: 40 }, parentNode: '3', data: { label: 'Infilling Objective (FIM)\n[Prefix - Middle - Suffix]' }, style: { background: '#c8e6c9', width: 250 } },
  { id: '3b', position: { x: 50, y: 110 }, parentNode: '3', data: { label: 'GQA (Grouped Query Attention)\n[KV Cache Efficiency]' }, style: { background: '#fff', border: '1px solid #2e7d32', width: 250 } },
  { id: '3c', position: { x: 50, y: 180 }, parentNode: '3', data: { label: 'SwiGLU Activation' }, style: { background: '#e1bee7', width: 250 } },
  { id: '3d', position: { x: 50, y: 250 }, parentNode: '3', data: { label: 'RMSNorm (Pre-normalization)' }, style: { background: '#fff', width: 250, fontSize: '11px' } },

  { id: '4', position: { x: 250, y: 520 }, data: { label: 'Output: Code Completion' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3c-3d', source: '3c', target: '3d' },
  { id: 'e3d-4', source: '3d', target: '4' },
];

export default function CodeLlamaBaseArchitecture() {
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