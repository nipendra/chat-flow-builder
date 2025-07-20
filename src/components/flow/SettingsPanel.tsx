import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Node } from '@xyflow/react';
import { TextMessageNodeData } from './TextMessageNode';

interface SettingsPanelProps {
  selectedNode: Node | null;
  onNodeUpdate: (nodeId: string, data: Partial<TextMessageNodeData>) => void;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  selectedNode,
  onNodeUpdate,
  onClose,
}) => {
  if (!selectedNode) return null;

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onNodeUpdate(selectedNode.id, { label: event.target.value });
  };

  return (
    <div className="w-64 bg-[hsl(var(--panel-bg))] border-l border-gray-200 p-4">
      {/* Panel Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Back to nodes panel"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h3 className="text-lg font-semibold text-gray-800">Settings Panel</h3>
      </div>

      {/* Node Type Display */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-sm font-medium text-gray-600 mb-1">Node Type</div>
        <div className="text-sm text-gray-800">Text Message</div>
      </div>

      {/* Text Content Editor */}
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-gray-700 mb-2 block">Text</span>
          <textarea
            value={(selectedNode.data as TextMessageNodeData)?.label || ''}
            onChange={handleTextChange}
            placeholder="Enter your message..."
            className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       text-sm"
          />
        </label>
      </div>

      {/* Node Information */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-xs text-gray-500 space-y-1">
          <div><strong>Node ID:</strong> {selectedNode.id}</div>
          <div><strong>Position:</strong> ({Math.round(selectedNode.position.x)}, {Math.round(selectedNode.position.y)})</div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-600">
          <strong>Note:</strong> Changes are saved automatically. Use the Save button to validate your flow.
        </p>
      </div>
    </div>
  );
};

export default SettingsPanel;