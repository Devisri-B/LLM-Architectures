// components/models/Dalle2Architecture.jsx
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
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Text Prompt' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // CLIP Branch
  { id: '2', position: { x: 100, y: 80 }, data: { label: 'CLIP Text Encoder\n[ViT-L/14]' }, style: { background: '#fff3e0', border: '1px solid #ff9800', width: 200 } },
  { id: '3', position: { x: 400, y: 80 }, data: { label: 'CLIP Image Encoder\n(Training Only)' }, style: { background: '#eee', border: '1px dashed #999', width: 200 } },

  // The Prior (Key Component)
  { id: '4', position: { x: 250, y: 180 }, data: { label: 'Diffusion Prior\n[Maps Text Emb -> Image Emb]' }, style: { background: '#e1bee7', border: '2px solid #8e24aa', fontWeight: 'bold', width: 300 } },
  
  // The Decoder
  { id: '5', position: { x: 250, y: 280 }, data: { label: 'Diffusion Decoder (unCLIP)\n[Conditioned on Image Emb]' }, style: { width: 300, height: 200, background: 'rgba(227, 242, 253, 0.5)', border: '1px solid #2196f3' }, type: 'group' },
  { id: '5a', position: { x: 25, y: 40 }, parentNode: '5', data: { label: 'GLIDE-based UNet' }, style: { background: '#fff', width: 250 } },
  { id: '5b', position: { x: 25, y: 110 }, parentNode: '5', data: { label: 'ADM (Ablated Diffusion Model)\n[Timestep + Clip Embed]' }, style: { background: '#bbdefb', width: 250, fontSize: '11px' } },

  // Upsamplers
  { id: '6', position: { x: 250, y: 520 }, data: { label: 'Upsampler CNNs\n[64px -> 256px -> 1024px]' }, style: { background: '#e0f2f1', border: '1px solid #00695c' } },
  { id: '7', position: { x: 250, y: 600 }, data: { label: 'Output: 1024x1024 Image' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4', style: { strokeDasharray: '5,5' }, label: 'Loss' },
  { id: 'e4-5a', source: '4', target: '5a' },
  { id: 'e5a-5b', source: '5a', target: '5b' },
  { id: 'e5b-6', source: '5b', target: '6' },
  { id: 'e6-7', source: '6', target: '7' },
];

export default function Dalle2Architecture() {
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