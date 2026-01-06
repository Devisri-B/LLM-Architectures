import React from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: 'inputs', position: { x: 175, y: 0 }, data: { label: 'Inputs (Text, Image, Code)' }, style: { border: 'none', background: 'none', fontSize: 14, width: 200 } },
  { id: 'multimodal-encoder', position: { x: 185, y: 75 }, data: { label: 'Multimodal Encoder' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 180 } },
  { id: 'cross-modal-attention', position: { x: 175, y: 135 }, data: { label: 'Cross-Modal Attention' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 200 } },
  { id: 'multimodal-decoder', position: { x: 185, y: 195 }, data: { label: 'Multimodal Decoder' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 180 } },
  { id: 'text-expert', position: { x: 75, y: 250 }, data: { label: 'Text Expert\n(60% weight)\nPositive' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 120, whiteSpace: 'pre-line' } },
  { id: 'image-expert', position: { x: 215, y: 250 }, data: { label: 'Image Expert\n(30% weight)\nNeutral' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 120, whiteSpace: 'pre-line' } },
  { id: 'fusion-expert', position: { x: 355, y: 250 }, data: { label: 'Fusion Expert\n(10% weight)\nMismatch Flag' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 120, whiteSpace: 'pre-line' } },
  { id: 'gating-network', position: { x: 205, y: 350 }, data: { label: 'Gating Network' }, style: { border: '1px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 140 } },
  { id: 'final-output', position: { x: 200, y: 400 }, data: { label: 'Output' }, style: { border: 'none', background: 'none', fontSize: 14 } }
];

const initialEdges = [
  { id: 'edge1', source: 'inputs', target: 'multimodal-encoder', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge2', source: 'multimodal-encoder', target: 'cross-modal-attention', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge3', source: 'cross-modal-attention', target: 'multimodal-decoder', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge4', source: 'multimodal-decoder', target: 'text-expert', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge5', source: 'multimodal-decoder', target: 'image-expert', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge6', source: 'multimodal-decoder', target: 'fusion-expert', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge7', source: 'text-expert', target: 'gating-network', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge8', source: 'image-expert', target: 'gating-network', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge9', source: 'fusion-expert', target: 'gating-network', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge10', source: 'gating-network', target: 'final-output', markerEnd: { type: MarkerType.ArrowClosed } }
];

const Gemini = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlowProvider>
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView attributionPosition="bottom-right">
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default Gemini;
