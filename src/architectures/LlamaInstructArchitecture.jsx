// components/models/LlamaInstructArchitecture.jsx
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
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Base Model: Llama 2 (Pre-trained)' }, style: { background: '#e3f2fd', border: '1px solid #1565c0' } },
  
  // SFT Phase
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Supervised Fine-Tuning (SFT)\n[High-quality Instruction Data]' }, style: { background: '#fff9c4', border: '1px solid #fbc02d' } },
  
  // RLHF Block
  { id: '3', position: { x: 200, y: 160 }, data: { label: 'RLHF Alignment Process' }, style: { width: 350, height: 320, background: 'rgba(255, 243, 224, 0.5)', border: '1px dashed #ef6c00' }, type: 'group' },
  { id: '3a', position: { x: 50, y: 40 }, parentNode: '3', data: { label: 'Reward Model\n[Trained on Human Preferences]' }, style: { background: '#ffe0b2', border: '1px solid #ff9800', width: 250 } },
  { id: '3b', position: { x: 50, y: 120 }, parentNode: '3', data: { label: 'PPO Optimization\n[Proximal Policy Optimization]' }, style: { background: '#fff', border: '1px solid #333', width: 250 } },
  { id: '3c', position: { x: 50, y: 200 }, parentNode: '3', data: { label: 'Safety Reward Model\n[Penalizes Harmful Outputs]' }, style: { background: '#ffcdd2', border: '1px solid #e53935', width: 250 } },

  { id: '4', position: { x: 250, y: 520 }, data: { label: 'Ghost Attention (GAtt)\n[Multi-turn Context Consistency]' }, style: { background: '#d1c4e9', border: '1px solid #512da8' } },
  { id: '5', position: { x: 250, y: 600 }, data: { label: 'Output: Llama-Instruct' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3c-3b', source: '3c', target: '3b', label: 'Safety Signal', style: { stroke: 'red' } },
  { id: 'e3b-4', source: '3b', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
];

export default function LlamaInstructArchitecture() {
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