import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import Canvas from '.';

type Props = {}
// wrapping with ReactFlowProvider is done outside of the component
function CanvasWithProvider(props: Props) {
    return (
        <ReactFlowProvider>
            <Canvas {...props} />
        </ReactFlowProvider>
    );
}

export default CanvasWithProvider;
