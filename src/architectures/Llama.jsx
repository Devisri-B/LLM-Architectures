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

function LlamaNxNode() {
  return (
    <div style={nxStyles.container}>
      <div style={nxStyles.nxLabel}>Nx</div>
      <div style={nxStyles.subBlock}>
        <div>RMS Norm</div>
      </div>
      <div style={nxStyles.subBlock}>
        <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Self-Attention</div>
        <div style={nxStyles.qkvContainer}>
          <div style={nxStyles.qkvBlock}>Q</div>
          <div style={nxStyles.qkvBlock}>K</div>
          <div style={nxStyles.qkvBlock}>V</div>
          <div style={nxStyles.qkvBlock}>⊗ Rotary</div>
        </div>
        <div style={{ fontSize: 10 }}>(Grouped Multi-Query, KV Cache)</div>
      </div>
      <div style={nxStyles.subBlock}>
        <div>RMS Norm</div>
      </div>
      <div style={nxStyles.subBlock}>
        <div>Feed Forward</div>
        <div style={{ fontSize: 10 }}>(SwiGLU)</div>
      </div>
      <div style={nxStyles.subBlock}>
        <div>RMS Norm</div>
      </div>
    </div>
  );
}

const nxStyles = {
  container: {
    width: 220,
    minHeight: 280,
    border: '2px dotted #999',
    borderRadius: 6,
    position: 'relative',
    background: '#fafafa',
    fontSize: 12,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: '6px 0'
  },
  nxLabel: {
    position: 'absolute',
    left: -20,
    top: '50%',
    transform: 'translateY(-50%) rotate(-90deg)',
    fontWeight: 'bold',
    color: '#444',
    fontSize: 14
  },
  subBlock: {
    border: '1px solid #ccc',
    margin: '4px 8px',
    borderRadius: 4,
    padding: 6,
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  qkvContainer: {
    display: 'flex',
    gap: '6px',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4
  },
  qkvBlock: {
    border: '1px solid #ccc',
    borderRadius: 4,
    padding: '6px',
    background: '#fff',
    fontSize: 12
  }
};

const nodeTypes = { llamaNx: LlamaNxNode };

const initialNodes = [
  { id: 'input', position: { x: 0, y: 35 }, data: { label: 'Input' }, style: { border: 'none', background: 'none', fontSize: 14 }, type: 'input' },
  { id: 'embeddings', position: { x: 15, y: 100 }, data: { label: 'Embeddings' }, style: { border: '2px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 120 } },
  { id: 'rms-norm-emb', position: { x: 25, y: 175 }, data: { label: 'RMS Norm' }, style: { border: '2px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 100 } },
  { id: 'final-rms', position: { x: 25, y: 398 }, data: { label: 'RMS Norm' }, style: { border: '2px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 100 } },
  { id: 'nx-block', type: 'llamaNx', position: { x: -37, y: 150 }, data: {} },
  { id: 'linear', position: { x: 35, y: 475 }, data: { label: 'Linear' }, style: { border: '2px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 80 } },
  { id: 'softmax', position: { x: 35, y: 525 }, data: { label: 'Softmax' }, style: { border: '2px solid #999', borderRadius: 4, padding: '6px', background: '#fff', textAlign: 'center', width: 80 } },
  { id: 'output', position: { x: 0, y: 575 }, data: { label: 'Output' }, style: { border: 'none', background: 'none', fontSize: 14 }, type: 'output' }
];

const initialEdges = [
  { id: 'edge-input-emb', source: 'input', target: 'embeddings', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge-emb-rms', source: 'embeddings', target: 'rms-norm-emb', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'rgba(0, 0, 0, 0.2)' } },
  { id: 'edge-rms-nx', source: 'rms-norm-emb', target: 'nx-block', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'rgba(0, 0, 0, 0.2)' } },
  { id: 'edge-nx-finalrms', source: 'nx-block', target: 'final-rms', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge-finalrms-linear', source: 'final-rms', target: 'linear', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge-linear-softmax', source: 'linear', target: 'softmax', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'edge-softmax-output', source: 'softmax', target: 'output', markerEnd: { type: MarkerType.ArrowClosed } }
];

const Llama = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodeTypes={nodeTypes}
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

export default Llama;
