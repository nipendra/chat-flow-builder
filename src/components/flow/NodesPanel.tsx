import React from 'react';
import { MessageSquare } from 'lucide-react';

interface NodesPanelProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

const NodesPanel: React.FC<NodesPanelProps> = ({ onDragStart }) => {
  const nodeTypes = [
    {
      type: 'textMessage',
      label: 'Message',
      icon: MessageSquare,
      description: 'Send a text message',
      color: 'bg-[hsl(var(--message-node-bg))]'
    }
    // Future node types can be added here:
  ];

  return (
    <div className="w-64 bg-[hsl(var(--panel-bg))] border-l border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Nodes Panel</h3>
      
      <div className="space-y-3">
        {nodeTypes.map((nodeType) => {
          const IconComponent = nodeType.icon;
          
          return (
            <div
              key={nodeType.type}
              className={`
                p-3 rounded-lg border-2 border-dashed border-gray-300 cursor-grab active:cursor-grabbing
                hover:border-gray-400 hover:bg-gray-50 transition-all duration-200
                ${nodeType.color} bg-opacity-20
              `}
              draggable
              onDragStart={(event) => onDragStart(event, nodeType.type)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-md border border-gray-200">
                  <IconComponent className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">{nodeType.label}</div>
                  <div className="text-xs text-gray-500">{nodeType.description}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-600">
          <strong>Tip:</strong> Drag nodes from here to the canvas to build your chatbot flow.
        </p>
      </div>
    </div>
  );
};

export default NodesPanel;