// components/models/LlamaPythonArchitecture.jsx
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
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input Tokens (Code)' }, style: { background: '#fff', border: '1px solid #333' } },
  
  { id: '2', position: { x: 200, y: 80 }, data: { label: 'Llama 2 Transformer Block' }, style: { width: 350, height: 400, background: 'rgba(232, 245, 233, 0.5)', border: '1px dashed #2e7d32' }, type: 'group' },
  
  // Pre-Norm
  { id: '2a', position: { x: 50, y: 30 }, parentNode: '2', data: { label: 'RMSNorm\n(Root Mean Square Normalization)' }, style: { background: '#fff', border: '1px solid #555', fontSize: '11px', width: 250 } },
  
  // Attention Mechanics
  { id: '2b', position: { x: 50, y: 100 }, parentNode: '2', data: { label: 'Grouped Query Attention (GQA)\n[Efficiency Opt]' }, style: { background: '#e8f5e9', border: '1px solid #2e7d32', width: 250 } },
  { id: '2c', position: { x: 210, y: 100 }, parentNode: '2', data: { label: 'RoPE\n(Rotary Pos Emb)' }, style: { background: '#fff9c4', border: '1px solid #fbc02d', width: 80, fontSize: '10px' } }, // Floating label to side
  
  // Residual
  { id: '2d', position: { x: 50, y: 180 }, parentNode: '2', data: { label: 'Residual Connection (+)' }, style: { height: 30, background: 'transparent', border: 'none', fontWeight: 'bold' } },
  
  // FFN
  { id: '2e', position: { x: 50, y: 230 }, parentNode: '2', data: { label: 'RMSNorm' }, style: { background: '#fff', border: '1px solid #555', fontSize: '11px', width: 250 } },
  { id: '2f', position: { x: 50, y: 290 }, parentNode: '2', data: { label: 'SwiGLU FeedForward\n[Gated Linear Unit]' }, style: { background: '#e1bee7', border: '1px solid #7b1fa2', width: 250 } },

  { id: '3', position: { x: 250, y: 520 }, data: { label: 'Output Projection' }, style: { background: '#fff', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2a', source: '1', target: '2a' },
  { id: 'e2a-2b', source: '2a', target: '2b' },
  { id: 'e2b-2c', source: '2b', target: '2c' },
  { id: 'e2b-2d', source: '2b', target: '2d' },
  { id: 'e2d-2e', source: '2d', target: '2e' },
  { id: 'e2e-2f', source: '2e', target: '2f' },
  { id: 'e2f-3', source: '2f', target: '3' },
];

export default function LlamaPythonArchitecture() {
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