import React, { useCallback, useState, useRef } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  OnConnect,
  OnNodesChange,
  OnEdgesChange,
  ReactFlowProvider,
} from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import TextMessageNode, { TextMessageNodeData } from './TextMessageNode';

// Node types configuration for extensibility
const nodeTypes = {
  textMessage: TextMessageNode,
  // Future node types can be added here
};

// Initial flow state
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

/**
 * Main Flow Builder Component
 * Features:
 * - Drag and drop node creation
 * - Node connection with validation (source handles limited to one connection)
 * - Settings panel for node editing
 * - Flow validation and save functionality
 * - Extensible architecture for adding new node types
 */
const FlowBuilder: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  /**
   * Handle new connections between nodes
   * Validates that source handles can only have one outgoing connection
   */
  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      // Check if source handle already has a connection
      const sourceHasConnection = edges.some(
        (edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle
      );

      if (sourceHasConnection) {
        toast({
          title: "Connection Error",
          description: "Each source handle can only have one outgoing connection.",
        });
        return;
      }

      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges, toast]
  );

  /**
   * Handle node selection for settings panel
   */
  const handleNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNode(node);
  }, []);

  /**
   * Handle clicking on empty canvas to deselect nodes
   */
  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  /**
   * Handle drag start for new nodes from the panel
   */
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  /**
   * Handle drop to create new nodes
   */
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: 'test message ' + (nodes.length + 1) },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes.length, setNodes]
  );

  /**
   * Handle dragover for drop functionality
   */
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Update node data from settings panel
   */
  const handleNodeUpdate = useCallback(
    (nodeId: string, newData: Partial<TextMessageNodeData>) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...newData } }
            : node
        )
      );

      // Update selected node state
      if (selectedNode && selectedNode.id === nodeId) {
        setSelectedNode((prev) =>
          prev ? { ...prev, data: { ...prev.data, ...newData } } : null
        );
      }
    },
    [setNodes, selectedNode]
  );

  /**
   * Validate and save the flow
   * Shows error if there are multiple nodes and some have empty target handles
   */
  const handleSave = useCallback(() => {
    if (nodes.length <= 1) {
      toast({
        title: "Flow Saved",
        description: "Your chatbot flow has been saved successfully.",
        variant: "watermelon"
      });
      return;
    }

    // Find nodes with empty target handles (no incoming connections)
    const nodesWithoutTargets = nodes.filter((node) => {
      return !edges.some((edge) => edge.target === node.id);
    });

    if (nodesWithoutTargets.length > 1) {
      toast({
        title: "Cannot save Flow",
        description: "Multiple nodes have empty target handles. Each node except the starting node should have at least one incoming connection.",
        variant: "watermelon"
      });
      return;
    }

    toast({
      title: "Flow Saved",
      description: "Your chatbot flow has been saved successfully.",
      variant: "watermelon"
    });
  }, [nodes, edges, toast]);

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header Bar */}
      <div className="h-14 bg-background border-b flex items-center justify-between px-4 z-20">
        <h1 className="text-lg font-semibold">Chatbot Flow Builder</h1>
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-primary-foreground mr-4"
        >
          Save Changes
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Main Flow Area */}
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={handleNodeClick}
            onPaneClick={handlePaneClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-[hsl(var(--flow-bg))]"
          >
            <Background />
          </ReactFlow>

        </div>

        {/* Right Panel - Nodes or Settings */}
      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          onNodeUpdate={handleNodeUpdate}
          onClose={() => setSelectedNode(null)}
        />
        ) : (
          <NodesPanel onDragStart={onDragStart} />
        )}
      </div>
    </div>
  );
};

/**
 * Flow Builder Wrapper with React Flow Provider
 */
const FlowBuilderWithProvider: React.FC = () => {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
};

export default FlowBuilderWithProvider;