// components/models/GeminiBaseArchitecture.jsx
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
  { id: '1', position: { x: 300, y: 0 }, data: { label: 'Inputs: Audio / Visual / Text' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // Encoders
  { id: '2', position: { x: 150, y: 80 }, data: { label: 'Visual Encoder' }, style: { background: '#ffccbc', width: 120 } },
  { id: '3', position: { x: 450, y: 80 }, data: { label: 'Audio Encoder' }, style: { background: '#c5cae9', width: 120 } },
  
  // Projection
  { id: '4', position: { x: 300, y: 160 }, data: { label: 'Multimodal Projection Layer\n[Aligns to Text Space]' }, style: { background: '#fff', border: '1px solid #555' } },

  // Transformer
  { id: '5', position: { x: 300, y: 240 }, data: { label: 'Decoder-Only Transformer' }, style: { width: 400, height: 200, background: 'rgba(236, 239, 241, 0.5)', border: '1px dashed #455a64' }, type: 'group' },
  { id: '5a', position: { x: 75, y: 40 }, parentNode: '5', data: { label: 'Multi-Query Attention (MQA)' }, style: { background: '#cfd8dc', width: 250 } },
  { id: '5b', position: { x: 75, y: 100 }, parentNode: '5', data: { label: 'SwiGLU FFN' }, style: { background: '#eceff1', width: 250 } },

  { id: '6', position: { x: 300, y: 480 }, data: { label: 'Output: Multimodal Response' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5a', source: '4', target: '5a' },
  { id: 'e5a-5b', source: '5a', target: '5b' },
  { id: 'e5b-6', source: '5b', target: '6' },
];

export default function GeminiBaseArchitecture() {
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