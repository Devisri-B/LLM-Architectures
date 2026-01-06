// components/models/QwenChatArchitecture.jsx
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
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Chat History + System Prompt' }, style: { background: '#fff', border: '1px solid #333' } },
  
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Qwen Base Model\n[RoPE + LogN + SwiGLU]' }, style: { background: '#e3f2fd', border: '1px solid #1976d2' } },

  { id: '3', position: { x: 200, y: 160 }, data: { label: 'Alignment Phase' }, style: { width: 350, height: 250, background: 'rgba(255, 235, 238, 0.5)', border: '1px dashed #d32f2f' }, type: 'group' },
  { id: '3a', position: { x: 50, y: 30 }, parentNode: '3', data: { label: 'SFT (Chat Data)\n[Multi-turn Dialogue]' }, style: { background: '#fff', width: 250 } },
  { id: '3b', position: { x: 50, y: 100 }, parentNode: '3', data: { label: 'RM (Reward Model)' }, style: { background: '#ffcdd2', width: 250 } },
  { id: '3c', position: { x: 50, y: 170 }, parentNode: '3', data: { label: 'PPO (Policy Optimization)' }, style: { background: '#fff', border: '1px solid #d32f2f', width: 250 } },

  { id: '4', position: { x: 250, y: 450 }, data: { label: 'Tool Use / Function Calling Layer' }, style: { background: '#fff9c4', border: '1px solid #fbc02d' } },
  { id: '5', position: { x: 250, y: 520 }, data: { label: 'Output: Conversational Response' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3c-4', source: '3c', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
];


export default function QwenChatArchitecture() {
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