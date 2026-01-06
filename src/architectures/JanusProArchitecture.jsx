// components/models/JanusProArchitecture.jsx
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
  { id: '1', position: { x: 300, y: 0 }, data: { label: 'Input: Image or Text' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // Decoupled Encoders
  { id: '2', position: { x: 150, y: 80 }, data: { label: 'Understanding Encoder\n[SigLIP-L: Semantic Features]' }, style: { background: '#ffccbc', border: '1px solid #bf360c', width: 220 } },
  { id: '3', position: { x: 450, y: 80 }, data: { label: 'Generation Tokenizer\n[VQ-Model: Discrete Visual Tokens]' }, style: { background: '#c8e6c9', border: '1px solid #2e7d32', width: 220 } },

  // Unified Body
  { id: '4', position: { x: 300, y: 180 }, data: { label: 'Unified Transformer (DeepSeek-LLM-7B)' }, style: { width: 400, height: 250, background: 'rgba(236, 239, 241, 0.5)', border: '1px dashed #455a64' }, type: 'group' },
  { id: '4a', position: { x: 75, y: 40 }, parentNode: '4', data: { label: 'Projector (Adapter)\n[Maps SigLIP to LLM Dim]' }, style: { background: '#fff', width: 250 } },
  { id: '4b', position: { x: 75, y: 100 }, parentNode: '4', data: { label: 'Self-Attention Stack\n[Joint Text & Image Processing]' }, style: { background: '#cfd8dc', border: '1px solid #455a64', width: 250 } },
  
  // Decoupled Heads
  { id: '5', position: { x: 150, y: 480 }, data: { label: 'Text Head\n[Next Token Pred]' }, style: { background: '#fff', border: '1px solid #333' } },
  { id: '6', position: { x: 450, y: 480 }, data: { label: 'Image Head\n[Next VQ Token Pred]' }, style: { background: '#fff', border: '1px solid #333' } },
  
  { id: '7', position: { x: 450, y: 550 }, data: { label: 'Image Decoder\n[VQ Tokens -> Pixels]' }, style: { background: '#c8e6c9' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4a', source: '2', target: '4a' },
  { id: 'e3-4b', source: '3', target: '4b', label: 'Input Tokens' },
  { id: 'e4a-4b', source: '4a', target: '4b' },
  { id: 'e4b-5', source: '4b', target: '5' },
  { id: 'e4b-6', source: '4b', target: '6' },
  { id: 'e6-7', source: '6', target: '7' },
];

export default function JanusProArchitecture() {
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