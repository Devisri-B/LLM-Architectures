// components/models/WhisperArchitecture.jsx
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
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Audio Waveform (30s)' }, style: { background: '#fff', border: '1px solid #333' } },
  
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Feature Extractor\n[80-channel Log-Mel Spectrogram]' }, style: { background: '#fff8e1', border: '1px solid #ff6f00' } },
  { id: '3', position: { x: 250, y: 160 }, data: { label: 'Conv1D Stem\n[2 layers, GELU activation]' }, style: { background: '#e0f2f1', border: '1px solid #00695c' } },

  // Encoder
  { id: '4', position: { x: 50, y: 250 }, data: { label: 'Audio Encoder (Transformer)' }, style: { width: 200, height: 200, background: 'rgba(224, 247, 250, 0.5)', border: '1px solid #00bcd4' }, type: 'group' },
  { id: '4a', position: { x: 20, y: 40 }, parentNode: '4', data: { label: 'Sinusoidal Pos Emb' }, style: { background: '#fff', width: 160, fontSize: '10px' } },
  { id: '4b', position: { x: 20, y: 100 }, parentNode: '4', data: { label: 'Self-Attention Blocks' }, style: { background: '#b2ebf2', width: 160 } },

  // Decoder
  { id: '5', position: { x: 300, y: 250 }, data: { label: 'Text Decoder (Transformer)' }, style: { width: 200, height: 200, background: 'rgba(243, 229, 245, 0.5)', border: '1px solid #9c27b0' }, type: 'group' },
  { id: '5a', position: { x: 20, y: 40 }, parentNode: '5', data: { label: 'Masked Self-Attention' }, style: { background: '#fff', width: 160, fontSize: '10px' } },
  { id: '5b', position: { x: 20, y: 100 }, parentNode: '5', data: { label: 'Cross-Attention\n(To Encoder)' }, style: { background: '#e1bee7', width: 160, border: '2px solid #8e24aa' } },

  { id: '6', position: { x: 300, y: 500 }, data: { label: 'Output: Transcribed Tokens' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4a', source: '3', target: '4a' },
  { id: 'e4b-5b', source: '4b', target: '5b', animated: true, label: 'Cross-Attn' }, // Connecting Encoder to Decoder
  { id: 'e5b-6', source: '5b', target: '6' },
];

export default function WhisperArchitecture() {
  // 2. Initialize state for this specific model
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // 3. Return the isolated ReactFlow instance
  return (
    <div style={{ width: '100%', height: '800px' }}>
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