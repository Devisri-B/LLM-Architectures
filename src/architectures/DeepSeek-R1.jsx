import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  Handle,
  Position,
  getBezierPath,
  BaseEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom node for Data Preprocessing: has a right-hand info handle and a bottom vertical handle
const DataPrepNode = ({ data }) => (
  <div style={{
    fontFamily: 'monospace',
    fontWeight: 'bold',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#FFE4B5',
    width: '220px'
  }}>
    {data.label}
    {/* Right-hand handle for info connection */}
    <Handle type="source" position={Position.Right} id="dataPrepInfo" style={{ background: '#555' }} />
    {/* Bottom handle for vertical chain connection */}
    <Handle type="source" position={Position.Bottom} id="dataPrepBottom" style={{ background: '#555' }} />
  </div>
);

// Custom node for Stage 1: Cold Start SFT
const Stage1SFTNode = ({ data }) => (
  <div style={{
    fontFamily: 'monospace',
    fontWeight: 'bold',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#E6F3FF', // Light blue
    width: '220px'
  }}>
    {data.label}
    <Handle type="target" position={Position.Top} id="stage1Top" style={{ background: '#555' }} />
    <Handle type="source" position={Position.Right} id="stage1Info" style={{ background: '#555' }} />
    <Handle type="source" position={Position.Bottom} id="stage1Bottom" style={{ background: '#555' }} />
  </div>
);

// Generic vertical chain node
const VerticalChainNode = ({ data, id }) => (
  <div style={{
    fontFamily: 'monospace',
    fontWeight: 'bold',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: id === 'final-model' ? '#4D99FF' : // Deepest blue for final node
                    id.includes('stage2') ? '#CCE5FF' : // Light blue for stage 2
                    id.includes('stage3') ? '#99CCFF' : // Medium blue for stage 3
                    id.includes('stage4') ? '#66B2FF' : // Deep blue for stage 4
                    id.includes('stage5') ? '#3399FF' : // Darker blue for stage 5
                    '#E6F3FF', // Default light blue
    width: '220px'
  }}>
    {data.label}
    <Handle type="target" position={Position.Top} id={data.topId} style={{ background: '#555' }} />
    {!data.isFinal && (
      <Handle type="source" position={Position.Bottom} id={data.bottomId} style={{ background: '#555' }} />
    )}
  </div>
);

// Custom Info Node: transparent node that displays additional details and has a left-hand target handle
const InfoNode = ({ data }) => (
  <div style={{
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#f5f5f5',
    width: '220px',

  }}>
    {data.info}
    <Handle type="target" position={Position.Left} id={data.handleId} style={{ background: '#555' }} />
  </div>
);

// Add this custom edge component before the node components
const RedArrowEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const [edgePath] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  return (
    <>
      <defs>
        <marker
          id="arrow-red"
          markerWidth="6"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="red" />
        </marker>
      </defs>
      <BaseEdge id={id} path={edgePath} markerEnd="url(#arrow-red)" style={{ stroke: 'red' }} />
    </>
  );
};

const initialNodes = [
  // Data Preprocessing node with custom DataPrepNode type
  {
    id: 'data-prep',
    type: 'dataPrepNode',
    data: { 
      label: (
        <div>
          Data Preprocessing
          <br />- Cleaning
          <br />- Tokenization
          <br />- Augmentation
        </div>
      )
    },
    position: { x: 50, y: 0 },
    style: { backgroundColor: '#FFE5B5'},
  },
  // Base Model node (vertical chain node)
  {
    id: 'base-model',
    type: 'verticalChainNode',
    data: {
      label: (
        <div>
          Base Model
          <br />(DeepSeek-V3) + (Optional) Distilled Variants
        </div>
      ),
      topId: 'baseModelTop',
      bottomId: 'baseModelBottom',
    },
    position: { x: 50, y: 125 },
  },
  // Stage 1: Cold Start SFT node with custom Stage1SFTNode type
  {
    id: 'stage1-sft',
    type: 'stage1SFTNode',
    data: { 
      label: (
        <div>
          Stage 1: Cold Start
          <br />Fine-Tuning (SFT)
          <br />- High Quality reasoning data
        </div>
      )
    },
    position: { x: 50, y: 250 },
  },
  // Stage 2: Reinforcement Learning node (vertical chain)
  {
    id: 'stage2-rl',
    type: 'verticalChainNode',
    data: {
      label: (
        <div>
          Stage 2: Reinforcement Learning for Reasoning (GRPO / RLHF)
          <br />- Balances clarity & depth
        </div>
      ),
      topId: 'stage2Top',
      bottomId: 'stage2Bottom',
    },
    position: { x: 41, y: 375 },
    style: { width: 260 },
  },
  // Stage 3: Data Synthesis node (vertical chain)
  {
    id: 'stage3-data-synth',
    type: 'verticalChainNode',
    data: {
      label: (
        <div>
          Stage 3: Data Synthesis & Rejection Sampling
          <br />- Filter out low-quality outputs 
        </div>
      ),
      topId: 'stage3Top',
      bottomId: 'stage3Bottom',
    },
    position: { x: 50, y: 500 },
  },
  // Stage 4: SFT with Synthetic Data (vertical chain)
  {
    id: 'stage4-sft-synth',
    type: 'verticalChainNode',
    data: {
      label: (
        <div>
          Stage 4: SFT w/ Synthetic Data
          <br />- Additional fine-tuning on best sets
        </div>
      ),
      topId: 'stage4Top',
      bottomId: 'stage4Bottom',
    },
    position: { x: 56, y: 625 },
    style: { width: 230 },
  },
  // Stage 5: Final Reinforcement Learning node (vertical chain)
  {
    id: 'stage5-final-rl',
    type: 'verticalChainNode',
    data: {
      label: (
        <div>
          Stage 5: Final Reinforcement Learning Optimization
          <br />- Further refine clarity vs. depth
        </div>
      ),
      topId: 'stage5Top',
      bottomId: 'stage5Bottom',
    },
    position: { x: 50, y: 750 },
  },
  // Final Model node (vertical chain; final, so no bottom handle)
  {
    id: 'final-model',
    type: 'verticalChainNode',
    data: {
      label: (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ marginBottom: '10px' }}>
            DeepSeek-R1 (MoE + MLA, 671B Params)
          </div>
          <div style={{ width: '50px', height: '50px' }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              shapeRendering="geometricPrecision" 
              textRendering="geometricPrecision" 
              imageRendering="optimizeQuality" 
              fillRule="evenodd" 
              clipRule="evenodd" 
              viewBox="0 0 512 509.64"
            >
              <path fill="#fff" d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.613-115.613 115.613H115.612C52.026 509.64 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"/>
              <path fill="#4D6BFE" fillRule="nonzero" d="M440.898 139.167c-4.001-1.961-5.723 1.776-8.062 3.673-.801.612-1.479 1.407-2.154 2.141-5.848 6.246-12.681 10.349-21.607 9.859-13.048-.734-24.192 3.368-34.04 13.348-2.093-12.307-9.048-19.658-19.635-24.37-5.54-2.449-11.141-4.9-15.02-10.227-2.708-3.795-3.447-8.021-4.801-12.185-.861-2.509-1.725-5.082-4.618-5.512-3.139-.49-4.372 2.142-5.601 4.349-4.925 9.002-6.833 18.921-6.647 28.962.432 22.597 9.972 40.597 28.932 53.397 2.154 1.47 2.707 2.939 2.032 5.082-1.293 4.41-2.832 8.695-4.186 13.105-.862 2.817-2.157 3.429-5.172 2.205-10.402-4.346-19.391-10.778-27.332-18.553-13.481-13.044-25.668-27.434-40.873-38.702a177.614 177.614 0 00-10.834-7.409c-15.512-15.063 2.032-27.434 6.094-28.902 4.247-1.532 1.478-6.797-12.251-6.736-13.727.061-26.285 4.653-42.288 10.777-2.34.92-4.801 1.593-7.326 2.142-14.527-2.756-29.608-3.368-45.367-1.593-29.671 3.305-53.368 17.329-70.788 41.272-20.928 28.785-25.854 61.482-19.821 95.59 6.34 35.943 24.683 65.704 52.876 88.974 29.239 24.123 62.911 35.943 101.32 33.677 23.329-1.346 49.307-4.468 78.607-29.27 7.387 3.673 15.142 5.144 28.008 6.246 9.911.92 19.452-.49 26.839-2.019 11.573-2.449 10.773-13.166 6.586-15.124-33.915-15.797-26.47-9.368-33.24-14.573 17.235-20.39 43.213-41.577 53.369-110.222.8-5.448.121-8.877 0-13.287-.061-2.692.553-3.734 3.632-4.041 8.494-.981 16.742-3.305 24.314-7.471 21.975-12.002 30.84-31.719 32.933-55.355.307-3.612-.061-7.348-3.879-9.245v-.003zM249.4 351.89c-32.872-25.838-48.814-34.352-55.4-33.984-6.155.368-5.048 7.41-3.694 12.002 1.415 4.532 3.264 7.654 5.848 11.634 1.785 2.634 3.017 6.551-1.784 9.493-10.587 6.55-28.993-2.205-29.856-2.635-21.421-12.614-39.334-29.269-51.954-52.047-12.187-21.924-19.267-45.435-20.435-70.542-.308-6.061 1.478-8.207 7.509-9.307 7.94-1.471 16.127-1.778 24.068-.615 33.547 4.9 62.108 19.902 86.054 43.66 13.666 13.531 24.007 29.699 34.658 45.496 11.326 16.778 23.514 32.761 39.026 45.865 5.479 4.592 9.848 8.083 14.035 10.656-12.62 1.407-33.673 1.714-48.075-9.676zm15.899-102.519c.521-2.111 2.421-3.658 4.722-3.658a4.74 4.74 0 011.661.305c.678.246 1.293.614 1.786 1.163.861.859 1.354 2.083 1.354 3.368 0 2.695-2.154 4.837-4.862 4.837a4.748 4.748 0 01-4.738-4.034 5.01 5.01 0 01.077-1.981zm47.208 26.915c-2.606.996-5.2 1.778-7.707 1.88-4.679.244-9.787-1.654-12.556-3.981-4.308-3.612-7.386-5.631-8.679-11.941-.554-2.695-.247-6.858.246-9.246 1.108-5.144-.124-8.451-3.754-11.451-2.954-2.449-6.711-3.122-10.834-3.122-1.539 0-2.954-.673-4.001-1.224-1.724-.856-3.139-3-1.785-5.634.432-.856 2.525-2.939 3.018-3.305 5.6-3.185 12.065-2.144 18.034.244 5.54 2.266 9.727 6.429 15.759 12.307 6.155 7.102 7.263 9.063 10.773 14.39 2.771 4.163 5.294 8.451 7.018 13.348.877 2.561.071 4.74-2.341 6.277-.981.625-2.109 1.044-3.191 1.458z"/>
            </svg>
          </div>
        </div>
      ),
      topId: 'finalModelTop',
      isFinal: true,
    },
    position: { x: 36, y: 875 },
    style: { width: 270, padding: 10},
  },
  // Info Node for Data Preprocessing (connected from the right-hand info handle)
  {
    id: 'data-prep-info',
    type: 'infoNode',
    data: {
      info: 'Additional Info:\nData cleaning removes noise and duplicates.\nTokenization splits text into tokens.\nAugmentation enhances dataset diversity.',
      handleId: 'dataPrepInfo',
    },
    position: { x: 350, y: 5 },
    style: { backgroundColor: '#f5f5f5'}
  },
  // Info Node for Stage 1 (connected from the right-hand info handle)
  {
    id: 'stage1-info',
    type: 'infoNode',
    data: {
      info: 'Additional Info:\nCold Start SFT uses thousands of curated reasoning examples to improve readability and language consistency.',
      handleId: 'stage1Info',
    },
    position: { x: 350, y: 252 },
  },
];

const initialEdges = [
  // Vertical chain edges:
  {
    id: 'edge-data-prep-base',
    source: 'data-prep',
    sourceHandle: 'dataPrepBottom',
    target: 'base-model',
    targetHandle: 'baseModelTop',
    animated: false,
  },
  {
    id: 'edge-base-stage1',
    source: 'base-model',
    sourceHandle: 'baseModelBottom',
    target: 'stage1-sft',
    targetHandle: 'stage1Top',
    animated: false,
  },
  {
    id: 'edge-stage1-stage2',
    source: 'stage1-sft',
    sourceHandle: 'stage1Bottom',
    target: 'stage2-rl',
    targetHandle: 'stage2Top',
    animated: false,
  },
  {
    id: 'edge-stage2-stage3',
    source: 'stage2-rl',
    sourceHandle: 'stage2Bottom',
    target: 'stage3-data-synth',
    targetHandle: 'stage3Top',
    animated: false,
  },
  {
    id: 'edge-stage3-stage4',
    source: 'stage3-data-synth',
    sourceHandle: 'stage3Bottom',
    target: 'stage4-sft-synth',
    targetHandle: 'stage4Top',
    animated: false,
  },
  {
    id: 'edge-stage4-stage5',
    source: 'stage4-sft-synth',
    sourceHandle: 'stage4Bottom',
    target: 'stage5-final-rl',
    targetHandle: 'stage5Top',
    animated: false,
  },
  {
    id: 'edge-stage5-final',
    source: 'stage5-final-rl',
    sourceHandle: 'stage5Bottom',
    target: 'final-model',
    targetHandle: 'finalModelTop',
    animated: false,
  },
  // Animated info edges (only connecting the right-hand handles)
  {
    id: 'edge-data-prep-info',
    source: 'data-prep',
    sourceHandle: 'dataPrepInfo',
    target: 'data-prep-info',
    animated: true,
    style: { stroke: '#4D6BFE' },
  },
  {
    id: 'edge-stage1-info',
    source: 'stage1-sft',
    sourceHandle: 'stage1Info',
    target: 'stage1-info',
    animated: true,
    style: { stroke: '#4D6BFE' },
  },
];

const nodeTypes = {
  dataPrepNode: DataPrepNode,
  stage1SFTNode: Stage1SFTNode,
  verticalChainNode: VerticalChainNode,
  infoNode: InfoNode,
};

// Add edgeTypes object
const edgeTypes = {
  redArrow: RedArrowEdge,
};

// Update the processedEdges to use the red arrow for all edges except info edges
// ... existing code ...

// Update the processedEdges to make all edges animated
const processedEdges = initialEdges.map(edge => ({
  ...edge,
  animated: true,
  type: !edge.id.includes('info') ? 'redArrow' : undefined,
  style: edge.id.includes('info') ? { stroke: '#4D6BFE' } : undefined
}));

// ... existing code ...

function DeepSeekR1() {
  const [nodes] = useState(initialNodes);
  const [edges, setEdges] = useState(processedEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesDraggable={true}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default DeepSeekR1;
