// components/models/GeminiNano1Architecture.jsx
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
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: On-Device Text / Audio' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // Distillation Source
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Distilled from Gemini Ultra\n[Teacher-Student Training]' }, style: { background: '#e1bee7', border: '1px dashed #8e24aa' } },

  // The 1.8B Block
  { id: '3', position: { x: 200, y: 160 }, data: { label: 'Nano-1 Transformer (1.8B)' }, style: { width: 350, height: 260, background: 'rgba(224, 247, 250, 0.5)', border: '1px dashed #00acc1' }, type: 'group' },
  { id: '3a', position: { x: 50, y: 40 }, parentNode: '3', data: { label: 'Shared Embedding / Output Weights\n[Reduces Param Count]' }, style: { background: '#fff', width: 250 } },
  { id: '3b', position: { x: 50, y: 100 }, parentNode: '3', data: { label: '4-bit Integer Quantization' }, style: { background: '#ffccbc', border: '1px solid #d84315', width: 250 } },
  { id: '3c', position: { x: 50, y: 160 }, parentNode: '3', data: { label: 'MQA (Multi-Query Attention)\n[Fast Mobile Inference]' }, style: { background: '#b2ebf2', width: 250 } },

  { id: '4', position: { x: 250, y: 460 }, data: { label: 'Output: Smart Reply / Summary' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3c-4', source: '3c', target: '4' },
];


export default function GeminiNano1Architecture() {
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