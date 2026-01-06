// components/models/DeepSeekCoderV2Architecture.jsx
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
  { id: '1', position: { x: 300, y: 0 }, data: { label: 'Input: Code / Context (128k Window)' }, style: { background: '#fff', border: '1px solid #333' } },
  { id: '2', position: { x: 300, y: 70 }, data: { label: 'Embedding + Positional Encoding' }, style: { background: '#eee', border: '1px solid #999' } },

  // The MLA Block (Key Innovation)
  { id: '3', position: { x: 100, y: 150 }, data: { label: 'Multi-Head Latent Attention (MLA)' }, style: { width: 400, height: 200, background: 'rgba(227, 242, 253, 0.3)', border: '1px dashed #2196f3' }, type: 'group' },
  { id: '3a', position: { x: 20, y: 40 }, parentNode: '3', data: { label: 'KV Compression\n(Low-Rank Projection)' }, style: { width: 160, fontSize: '10px', background: '#bbdefb' } },
  { id: '3b', position: { x: 220, y: 40 }, parentNode: '3', data: { label: 'Decoupled RoPE\n(Rotary Positional Emb)' }, style: { width: 160, fontSize: '10px', background: '#bbdefb' } },
  { id: '3c', position: { x: 120, y: 120 }, parentNode: '3', data: { label: 'Attention Heads\n(Reduced KV Cache Footprint)' }, style: { width: 160, fontSize: '11px', background: '#fff', border: '2px solid #2196f3' } },

  // The MoE Block (Key Innovation)
  { id: '4', position: { x: 100, y: 380 }, data: { label: 'DeepSeekMoE FeedForward' }, style: { width: 400, height: 220, background: 'rgba(255, 235, 238, 0.3)', border: '1px dashed #e91e63' }, type: 'group' },
  { id: '4a', position: { x: 120, y: 30 }, parentNode: '4', data: { label: 'Gate / Router' }, style: { width: 160, background: '#fff' } },
  { id: '4b', position: { x: 20, y: 100 }, parentNode: '4', data: { label: 'Shared Experts\n(Always Active)' }, style: { width: 140, background: '#ffcdd2', border: '1px solid #b71c1c' } },
  { id: '4c', position: { x: 240, y: 100 }, parentNode: '4', data: { label: 'Routed Experts\n(Fine-Grained Selection)' }, style: { width: 140, background: '#f8bbd0', border: '1px solid #880e4f' } },
  
  { id: '5', position: { x: 300, y: 650 }, data: { label: 'Output Probability Distribution' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a', type: 'smoothstep' },
  { id: 'e2-3b', source: '2', target: '3b', type: 'smoothstep' },
  { id: 'e3a-3c', source: '3a', target: '3c' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3-4a', source: '3c', target: '4a', type: 'smoothstep' },
  { id: 'e4a-4b', source: '4a', target: '4b', animated: true, style: { stroke: '#b71c1c' } },
  { id: 'e4a-4c', source: '4a', target: '4c', animated: true, style: { stroke: '#880e4f' } },
  { id: 'e4-5', source: '4b', target: '5' },
  { id: 'e4-5', source: '4c', target: '5' },
];

export default function DeepSeekCoderV2Architecture() {
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