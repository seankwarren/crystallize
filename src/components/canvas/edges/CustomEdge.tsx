import { BaseEdge, EdgeProps, getBezierPath } from 'reactflow';

type Props = EdgeProps;

const CustomEdge = ({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: Props) => {

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <BaseEdge
            labelX={labelX}
            labelY={labelY}
            path={edgePath}
            markerEnd={markerEnd}
            style={style} />
    )
}

export default CustomEdge
