// components/models/SoraArchitecture.jsx
import React from 'react';
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// 1. Define the specific nodes/edges for THIS model inside the file
const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Variable Resolution Video/Image' }, style: { background: '#fff', border: '1px solid #333', fontWeight: 'bold' } },
  
  // Visual Encoder
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Video Compression Network (VAE)\n[Temporal & Spatial Downsampling]' }, style: { background: '#fff3e0', border: '1px solid #f57c00' } },
  
  // Patching
  { id: '3', position: { x: 250, y: 200 }, data: { label: 'Spacetime Patch Extractor\n[Converts 3D volume to Linear Sequence]' }, style: { background: '#e1bee7', border: '1px solid #8e24aa' } },

  // DiT Block
  { id: '4', position: { x: 100, y: 350 }, data: { label: 'Diffusion Transformer (DiT) Block' }, style: { width: 420, height: 400, background: 'rgba(240,240,240,0.5)', border: '1px dashed #999' }, type: 'group' },
  { id: '4a', position: { x: 60, y: 30 }, parentNode: '4', data: { label: 'Adaptive Layer Norm\n(Conditioned on Timestep t)' }, style: { background: '#fff', fontSize: '11px', width: 300 } },
  { id: '4b', position: { x: 60, y: 120 }, parentNode: '4', data: { label: 'Self-Attention (Spatial + Temporal)' }, style: { background: '#e0f7fa', border: '1px solid #00bcd4', fontSize: '11px', width: 300 } },
  { id: '4c', position: { x: 60, y: 210 }, parentNode: '4', data: { label: 'Pointwise Feedforward' }, style: { background: '#fff', fontSize: '11px', width: 300 } },
  { id: '4d', position: { x: 60, y: 300 }, parentNode: '4', data: { label: 'Zero-Scale Initialization' }, style: { background: '#ffebee', fontSize: '11px', width: 300 } },

  // Output
  { id: '5', position: { x: 250, y: 800 }, data: { label: 'VAE Decoder\n[Latent to Pixel Space]' }, style: { background: '#fff3e0', border: '1px solid #f57c00' } },
  { id: '6', position: { x: 250, y: 900 }, data: { label: 'Output: High-Fidelity Video' }, style: { background: '#ccffcc', border: '1px solid #006400', fontWeight: 'bold' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4a', source: '3', target: '4a' },
  { id: 'e4a-4b', source: '4a', target: '4b' },
  { id: 'e4b-4c', source: '4b', target: '4c' },
  { id: 'e4c-4d', source: '4c', target: '4d' },
  { id: 'e4d-5', source: '4d', target: '5' },
  { id: 'e5-6', source: '5', target: '6' },
];

export default function SoraArchitecture() {
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
