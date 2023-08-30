import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import Canvas from '.';

// wrapping with ReactFlowProvider is done outside of the component
function CanvasWithProvider() {
    return (
        <ReactFlowProvider>
            <Canvas />
        </ReactFlowProvider>
    );
}

export default CanvasWithProvider;
