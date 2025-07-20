# Chat Flow Builder

A modern, interactive flow builder application for creating and managing workflow diagrams. Built with React and TypeScript, this application provides an intuitive drag-and-drop interface for designing complex workflows.

## 🚀 Features

- **Drag & Drop Interface**: Intuitive node creation and connection
- **Real-time Flow Building**: Live preview of workflow construction
- **Custom Node Types**: Extensible node system with custom components
- **Connection Validation**: Smart connection rules and validation
- **Responsive Design**: Works seamlessly across different screen sizes
- **Toast Notifications**: User-friendly feedback system
- **Flow Persistence**: Save and load workflow configurations

## 🛠 Technology Stack

### Core Framework

- **React 18.3.1**: Chosen for its mature ecosystem, excellent performance with concurrent features, and extensive community support
- **TypeScript**: Provides type safety, better IDE support, and reduces runtime errors in complex flow logic
- **Vite 5.4.10**: Fast build tool with instant HMR, optimal for development experience and production builds

### UI & Styling

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development and consistent design system
- **Radix UI**: Accessible, unstyled components that provide solid foundation for custom UI elements
- **Lucide React**: Modern icon library with tree-shaking support and consistent design

### Flow Management

- **@xyflow/react**: Specialized library for building node-based workflows with advanced features:
  - Optimized rendering for large graphs
  - Built-in zoom, pan, and selection
  - Extensible node and edge system
  - Touch support for mobile devices

### Development Tools

- **ESLint**: Code quality and consistency enforcement
- **PostCSS**: CSS processing for Tailwind integration

## 🏗 Architecture Overview

### Component Architecture

```
src/
├── components/
│   ├── flow/
│   │   ├── FlowBuilder.tsx      # Main flow container and state management
│   │   ├── NodesPanel.tsx       # Draggable node palette
│   │   ├── SettingsPanel.tsx    # Flow configuration panel
│   │   └── TextMessageNode.tsx  # Custom node implementation
│   └── ui/
│       ├── button.tsx           # Reusable button component
│       ├── textarea.tsx         # Form textarea component
│       ├── tooltip.tsx          # Tooltip component
│       └── toast/               # Toast notification system
├── pages/
│   ├── Index.tsx               # Main application page
│   └── NotFound.tsx            # 404 error page
├── hooks/
│   └── use-toast.ts            # Toast notification hook
└── lib/
    └── utils.ts                # Utility functions
```

### Data Flow Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   NodesPanel    │    │   FlowBuilder    │    │  SettingsPanel  │
│                 │    │                  │    │                 │
│ • Node Templates│────▶│ • State Management│◀───│ • Configuration │
│ • Drag Sources  │    │ • Node Registry   │    │ • Validation    │
└─────────────────┘    │ • Edge Management │    └─────────────────┘
                       │ • Event Handlers  │
                       └──────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   ReactFlow      │
                       │                  │
                       │ • Viewport       │
                       │ • Node Rendering │
                       │ • Edge Rendering │
                       │ • Interactions   │
                       └──────────────────┘
```

### State Management Flow

1. **Node Creation**: Nodes are dragged from NodesPanel and dropped onto FlowBuilder canvas
2. **State Updates**: FlowBuilder manages all node and edge state using React hooks
3. **Validation**: Connection attempts are validated before edge creation
4. **Persistence**: Flow state can be serialized for saving/loading
5. **User Feedback**: Toast notifications provide immediate feedback for user actions

## 🔄 Data Flow Details

### Node Management

- **Node State**: Managed by `useNodesState` hook from @xyflow/react
- **Node Types**: Registered in FlowBuilder with custom components
- **Node Data**: Each node contains typed data structure for its specific functionality

### Edge Management

- **Edge State**: Managed by `useEdgesState` hook
- **Connection Validation**: Custom logic prevents invalid connections
- **Edge Types**: Support for different edge styles and behaviors

### Event Flow

```
User Action → Event Handler → State Update → React Render → UI Update
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- Modern web browser with ES6+ support

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd flow-builder

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

### Building for Production

```bash
# Create production build
npm run build
# or
bun run build

# Preview production build
npm run preview
# or
bun run preview
```

## 🎯 Usage

### Creating a Flow

1. **Add Nodes**: Drag nodes from the left panel onto the canvas
2. **Connect Nodes**: Click and drag from output handles to input handles
3. **Configure Nodes**: Select nodes to edit their properties in the settings panel
4. **Save Flow**: Use the save functionality to persist your workflow

### Node Types

- **Text Message Node**: Send text messages in the workflow
- **Custom Nodes**: Easily extensible for additional node types

### Connection Rules

- Each source handle can only have one outgoing connection
- Nodes (except starting nodes) should have at least one incoming connection
- Self-connections are prevented

## 🔧 Customization

### Adding New Node Types

1. Create a new component in `src/components/flow/`
2. Register the node type in FlowBuilder's `nodeTypes` object
3. Add the node to the NodesPanel for drag-and-drop functionality

### Styling Customization

The project uses Tailwind CSS with a custom design system defined in:

- `src/index.css`: Global styles and CSS custom properties
- `tailwind.config.ts`: Tailwind configuration and theme extensions
