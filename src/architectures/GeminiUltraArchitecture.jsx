// components/models/GeminiUltraArchitecture.jsx
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
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Inputs: Text, Code, Images, Audio, Video' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // Multimodal Encoders
  { id: '2', position: { x: 100, y: 80 }, data: { label: 'Visual Encoder' }, style: { background: '#ffccbc', width: 120 } },
  { id: '3', position: { x: 250, y: 80 }, data: { label: 'Audio Encoder' }, style: { background: '#c5cae9', width: 120 } },
  { id: '4', position: { x: 400, y: 80 }, data: { label: 'Text Tokenizer' }, style: { background: '#c8e6c9', width: 120 } },

  // Shared Projection
  { id: '5', position: { x: 250, y: 160 }, data: { label: 'Unified Multimodal Embedding Space' }, style: { background: '#fff', border: '1px solid #333', width: 420 } },

  // Main Transformer
  { id: '6', position: { x: 150, y: 240 }, data: { label: 'Gemini Transformer Stack (MoE)' }, style: { width: 350, height: 200, background: 'rgba(224, 242, 241, 0.5)', border: '1px dashed #00695c' }, type: 'group' },
  { id: '6a', position: { x: 50, y: 40 }, parentNode: '6', data: { label: 'Interleaved Attention\n(Text attends to Image)' }, style: { background: '#b2dfdb', border: '1px solid #00695c', width: 250 } },
  { id: '6b', position: { x: 50, y: 120 }, parentNode: '6', data: { label: 'MoE FeedForward\n(Specialized Experts)' }, style: { background: '#fff', border: '1px solid #555', width: 250 } },

  { id: '7', position: { x: 250, y: 480 }, data: { label: 'Output Head' }, style: { background: '#fff', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-6a', source: '5', target: '6a' },
  { id: 'e6a-6b', source: '6a', target: '6b' },
  { id: 'e6b-7', source: '6b', target: '7' },
];

export default function GeminiUltraArchitecture() {
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