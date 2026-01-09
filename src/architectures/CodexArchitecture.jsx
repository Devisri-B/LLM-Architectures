// components/models/CodexArchitecture.jsx
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
  // Global Input
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Natural Language / Code Context' }, style: { background: '#fff', border: '1px solid #333', fontWeight: 'bold', width: 250 } },

  // Pre-processing
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Tokenizer (50k+ Vocab)\n[Added Whitespace/Indentation Tokens]' }, style: { background: '#e3f2fd', border: '1px solid #2196f3', width: 250, fontSize: '11px' } },

  // The Transformer Stack Container
  { id: '3', position: { x: 200, y: 160 }, data: { label: 'Decoder Block (Repeated x96 for 175B)' }, style: { width: 350, height: 350, background: 'rgba(240,240,240,0.5)', border: '1px dashed #999', paddingTop: '10px' }, type: 'group' },
  
  // Internal Block Mechanics
  { id: '3a', position: { x: 50, y: 40 }, parentNode: '3', data: { label: 'Layer Norm' }, style: { background: '#fff', border: '1px solid #777', width: 250, fontSize: '10px' } },
  { id: '3b', position: { x: 50, y: 100 }, parentNode: '3', data: { label: 'Masked Multi-Head Self-Attention\n[Sparse Factorized Attention]' }, style: { background: '#fff0f5', border: '1px solid #e91e63', width: 250, fontSize: '11px' } },
  { id: '3c', position: { x: 50, y: 170 }, parentNode: '3', data: { label: 'Add & Norm' }, style: { background: '#fff', border: '1px solid #777', width: 250, fontSize: '10px' } },
  { id: '3d', position: { x: 50, y: 230 }, parentNode: '3', data: { label: 'Feed Forward Network\n[GELU Activation, 4x Width]' }, style: { background: '#e8f5e9', border: '1px solid #4caf50', width: 250, fontSize: '11px' } },
  { id: '3e', position: { x: 50, y: 300 }, parentNode: '3', data: { label: 'Add & Norm' }, style: { background: '#fff', border: '1px solid #777', width: 250, fontSize: '10px' } },

  // Output Stages
  { id: '4', position: { x: 250, y: 550 }, data: { label: 'Linear Decoding' }, style: { background: '#fff', border: '1px solid #333', width: 250 } },
  { id: '5', position: { x: 250, y: 620 }, data: { label: 'Softmax Over Vocab' }, style: { background: '#fff', border: '1px solid #333', width: 250 } },
  { id: '6', position: { x: 250, y: 700 }, data: { label: 'Output: Syntactically Valid Code' }, style: { background: '#ccffcc', border: '1px solid #006400', fontWeight: 'bold', width: 250 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e2-3a', source: '2', target: '3a', type: 'smoothstep' },
  // Internal wiring
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3c-3d', source: '3c', target: '3d' },
  { id: 'e3d-3e', source: '3d', target: '3e' },
  // Output wiring
  { id: 'e3e-4', source: '3e', target: '4', type: 'smoothstep' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-6', source: '5', target: '6' },
];


export default function CodexArchitecture() {
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