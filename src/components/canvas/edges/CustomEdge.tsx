import { BaseEdge, EdgeProps, getBezierPath } from 'reactflow';
import { EdgeData } from '../types';

type Props = EdgeProps;

const CustomEdge = ({
    data,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerStart,
    markerEnd,
    selected,
}: Props) => {

    const { color } = data as EdgeData;
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        curvature: .5,
    });

    return (
        <>
            <BaseEdge
                path={edgePath}
                labelX={labelX}
                labelY={labelY}
                markerStart={'none'}
                markerEnd={'arrow'}
                style={{ ...style, stroke: color, strokeLinecap: 'round', strokeWidth: selected ? 'calc(var(--lg-border-width) * 2)' : 'var(--lg-border-width)' }} />
            {selected && <BaseEdge
                path={edgePath}
                labelX={labelX}
                labelY={labelY}
                markerStart={'none'}
                markerEnd={'arrow'}
                style={{ ...style, stroke: color, opacity: '15%', strokeLinecap: 'round', strokeWidth: 'var(--md-spacing)' }} />
            }
        </>
    )
}

export default CustomEdge
