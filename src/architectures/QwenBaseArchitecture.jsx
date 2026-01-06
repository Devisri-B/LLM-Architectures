// components/models/QwenBaseArchitecture.jsx
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
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Multilingual Text / Code' }, style: { background: '#fff', border: '1px solid #333' } },
  { id: '2', position: { x: 250, y: 70 }, data: { label: 'Tiktoken Tokenizer\n[Highly efficient compression]' }, style: { background: '#fff3e0', border: '1px solid #ff9800' } },

  { id: '3', position: { x: 200, y: 150 }, data: { label: 'Qwen Block (x32 - x96)' }, style: { width: 350, height: 380, background: 'rgba(237, 231, 246, 0.5)', border: '1px dashed #512da8' }, type: 'group' },

  { id: '3a', position: { x: 50, y: 30 }, parentNode: '3', data: { label: 'RMSNorm (Pre-Norm)' }, style: { width: 250, background: '#fff' } },
  { id: '3b', position: { x: 50, y: 90 }, parentNode: '3', data: { label: 'Flash Attention V2\n[RoPE + LogN Scaling]' }, style: { width: 250, background: '#d1c4e9', border: '1px solid #673ab7' } },
  { id: '3c', position: { x: 50, y: 160 }, parentNode: '3', data: { label: 'Residual Add' }, style: { border: 'none', background: 'transparent' } },
  { id: '3d', position: { x: 50, y: 200 }, parentNode: '3', data: { label: 'RMSNorm' }, style: { width: 250, background: '#fff' } },
  { id: '3e', position: { x: 50, y: 260 }, parentNode: '3', data: { label: 'SwiGLU MLP\n[Silu Activation * Linear]' }, style: { width: 250, background: '#b2dfdb', border: '1px solid #009688' } },

  { id: '4', position: { x: 250, y: 560 }, data: { label: 'Untied Output Embedding\n[Separate parameters from input]' }, style: { background: '#fff9c4', border: '1px solid #fbc02d' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3c-3d', source: '3c', target: '3d' },
  { id: 'e3d-3e', source: '3d', target: '3e' },
  { id: 'e3e-4', source: '3e', target: '4' },
];

export default function QwenBaseArchitecture() {
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