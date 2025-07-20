import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';

// WhatsApp SVG icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087z"/>
  </svg>
);

export interface TextMessageNodeData extends Record<string, unknown> {
  label: string;
}

/**
 * Custom Text Message Node component
 * Features:
 * - Displays message content with icon
 * - Has one source handle (bottom) - only one outgoing connection allowed
 * - Has one target handle (top) - multiple incoming connections allowed
 * - Shows selected state with different styling
 */
const TextMessageNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div className={`
      relative min-w-[160px] max-w-[220px] rounded-lg shadow-sm border-2 transition-all duration-200 bg-white
      ${selected 
        ? 'border-blue-500 shadow-md' 
        : 'border-gray-300 hover:border-gray-400'
      }
    `}>
      {/* Target Handle - allows multiple incoming connections */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
        style={{ background: 'hsl(var(--handle-bg))' }}
      />

      {/* Node Header */}
      <div className="flex items-center justify-between px-3 py-2 text-white rounded-t-lg" style={{ backgroundColor: '#57f2d1' }}>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-3 h-3" />
          <span className="text-xs font-medium">Send Message</span>
        </div>
        <WhatsAppIcon className="w-4 h-4" />
      </div>

      {/* Message Body */}
      <div className="p-3 bg-white text-black rounded-b-lg">
        <div className="text-xs break-words">
          {(data as TextMessageNodeData)?.label || 'Enter your message...'}
        </div>
      </div>

      {/* Source Handle - only one outgoing connection allowed */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
        style={{ background: 'hsl(var(--handle-bg))' }}
      />
    </div>
  );
});

TextMessageNode.displayName = 'TextMessageNode';

export default TextMessageNode;