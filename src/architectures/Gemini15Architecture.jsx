// components/models/Gemini15Architecture.jsx
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
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Multimodal Context' }, style: { background: '#fff', border: '1px solid #333', width: 250 } },
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Long Context Processing\n[Supports Extended Windows]' }, style: { background: '#e1bee7', border: '1px solid #7b1fa2', width: 280 } },
  
  // MoE Group (Container)
  { id: '3', position: { x: 200, y: 160 }, data: { label: 'Gemini 1.5 MoE Architecture' }, style: { width: 350, height: 350, background: 'rgba(232, 245, 233, 0.5)', border: '1px dashed #2e7d32' }, type: 'group' },
  
  // Expert Nodes
  { id: '3a', position: { x: 50, y: 30 }, parentId: '3', data: { label: 'Gating Network\n[Assigns Weights to Experts]' }, style: { background: '#fff', width: 250 } },
  { id: '3b', position: { x: 20, y: 100 }, parentId: '3', data: { label: 'Text Expert' }, style: { background: '#c8e6c9', width: 90, fontSize: '10px' } },
  { id: '3c', position: { x: 130, y: 100 }, parentId: '3', data: { label: 'Image Expert' }, style: { background: '#c8e6c9', width: 90, fontSize: '10px' } },
  { id: '3d', position: { x: 240, y: 100 }, parentId: '3', data: { label: 'Fusion Expert' }, style: { background: '#c8e6c9', width: 90, fontSize: '10px' } },
  { id: '3e', position: { x: 50, y: 180 }, parentId: '3', data: { label: 'Cross-Modal Attention' }, style: { background: '#fff', width: 250 } },
  
  { id: '4', position: { x: 250, y: 550 }, data: { label: 'Output Generation' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b', animated: true },
  { id: 'e3a-3c', source: '3a', target: '3c', animated: true },
  { id: 'e3a-3d', source: '3a', target: '3d', animated: true },
  { id: 'e3b-3e', source: '3b', target: '3e' },
  { id: 'e3c-3e', source: '3c', target: '3e' },
  { id: 'e3d-3e', source: '3d', target: '3e' },
  { id: 'e3e-4', source: '3e', target: '4' },
];


export default function Gemini15Architecture() {
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