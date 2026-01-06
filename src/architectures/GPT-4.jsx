import React from 'react';
import ReactFlow, { ReactFlowProvider, MiniMap, Controls, Background, useNodesState, useEdgesState, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: 'inputs', position: { x: 100, y: 50 }, data: { label: 'Inputs' }, style: { border: 'none', background: 'none', fontSize: 14 } },
  { id: 'outputs-shifted', position: { x: 300, y: 50 }, data: { label: 'Outputs (shifted right)' }, style: { border: 'none', background: 'none', fontSize: 14 } },
  { id: 'input-embedding', position: { x: 110, y: 130 }, data: { label: 'Input Embedding' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 130 } },
  { id: 'output-embedding', position: { x: 310, y: 130 }, data: { label: 'Output Embedding' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 130 } },
  { id: 'pos-enc-encoder', position: { x: 95, y: 210 }, data: { label: 'Positional Encoding (Encoder)' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 160 } },
  { id: 'pos-enc-decoder', position: { x: 295, y: 210 }, data: { label: 'Positional Encoding (Decoder)' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 160 } },
  { id: 'encoder-stack', position: { x: 25, y: 300 }, data: { label: 'Encoder (Nx)\n[Multi-Head Attention + Feed Forward]' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 250, whiteSpace: 'pre-line' } },
  { id: 'decoder-stack', position: { x: 115, y: 400 }, data: { label: 'Decoder (Nx)\n[Masked MHA + MHA (encoder output) + Feed Forward]' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 320, whiteSpace: 'pre-line' } },
  { id: 'linear', position: { x: 235, y: 490 }, data: { label: 'Linear' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 80 } },
  { id: 'softmax', position: { x: 235, y: 560 }, data: { label: 'Softmax' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 80 } },
  { id: 'output-probabilities', position: { x: 200, y: 630 }, data: { label: 'Output Probabilities' }, style: { border: 'none', background: 'none', fontSize: 14 } }
];

const initialEdges = [
  { id: 'edge-inputs-embedding', source: 'inputs', target: 'input-embedding', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge-embedding-posenc-enc', source: 'input-embedding', target: 'pos-enc-encoder', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge-posenc-encoder-stack', source: 'pos-enc-encoder', target: 'encoder-stack', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge-outputs-embedding', source: 'outputs-shifted', target: 'output-embedding', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge-embedding-posenc-dec', source: 'output-embedding', target: 'pos-enc-decoder', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge-posenc-decoder-stack', source: 'pos-enc-decoder', target: 'decoder-stack', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge-encoder-decoder', source: 'encoder-stack', target: 'decoder-stack', animated: true, label: 'Encoder Output', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge-decoder-linear', source: 'decoder-stack', target: 'linear', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge-linear-softmax', source: 'linear', target: 'softmax', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge-softmax-probs', source: 'softmax', target: 'output-probabilities', markerEnd: { type: MarkerType.ArrowClosed } }
];

const GPT4ArchitectureFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          attributionPosition="bottom-right"
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default GPT4ArchitectureFlow;
