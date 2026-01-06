// components/models/Dalle3Architecture.jsx
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
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'User Prompt: "A cat on the moon"' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // The Prompt Rewriter (Unique to DALL-E 3)
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Synthetic Captioner (GPT-4)\n[Expands prompt to detailed paragraph]' }, style: { background: '#fff3e0', border: '1px solid #ef6c00', width: 280 } },
  
  // T5 Encoder
  { id: '3', position: { x: 250, y: 160 }, data: { label: 'T5-XXL Text Encoder\n[Fixed LLM Embeddings]' }, style: { background: '#e3f2fd', border: '1px solid #2196f3' } },

  // DiT Core
  { id: '4', position: { x: 200, y: 240 }, data: { label: 'Diffusion Transformer (DiT)' }, style: { width: 350, height: 250, background: 'rgba(243, 229, 245, 0.5)', border: '1px dashed #8e24aa' }, type: 'group' },
  { id: '4a', position: { x: 50, y: 30 }, parentNode: '4', data: { label: 'Patchify Latents' }, style: { background: '#fff', width: 250 } },
  { id: '4b', position: { x: 50, y: 90 }, parentNode: '4', data: { label: 'Transformer Blocks\n[Cross-Attention to T5 Embeds]' }, style: { background: '#e1bee7', border: '1px solid #8e24aa', width: 250 } },
  { id: '4c', position: { x: 50, y: 170 }, parentNode: '4', data: { label: 'Unpatchify' }, style: { background: '#fff', width: 250 } },

  // VAE
  { id: '5', position: { x: 250, y: 520 }, data: { label: 'VAE Decoder' }, style: { background: '#fce4ec', border: '1px solid #c2185b' } },
  { id: '6', position: { x: 250, y: 600 }, data: { label: 'Output Image' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4a', source: '3', target: '4a' },
  { id: 'e4a-4b', source: '4a', target: '4b' },
  { id: 'e4b-4c', source: '4b', target: '4c' },
  { id: 'e4c-5', source: '4c', target: '5' },
  { id: 'e5-6', source: '5', target: '6' },
];


export default function Dalle3Architecture() {
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