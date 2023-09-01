import {
    Box,
    Node,
    NodeOrigin,
    Rect,
    boxToRect,
    getNodePositionWithOrigin,
    rectToBox,
} from 'reactflow';

export const devLog = (str: string = '') => {
    import.meta.env.MODE === 'development' && console.log(str);
};

export const getBoundsOfBoxes = (box1: Box, box2: Box): Box => ({
    x: Math.min(box1.x, box2.x),
    y: Math.min(box1.y, box2.y),
    x2: Math.max(box1.x2, box2.x2),
    y2: Math.max(box1.y2, box2.y2),
});

export const getRectOfNodes = (
    nodes: Node[],
    nodeOrigin: NodeOrigin = [0, 0]
): Rect => {
    if (nodes.length === 0) {
        return { x: 0, y: 0, width: 0, height: 0 };
    }

    const box = nodes.reduce(
        (currBox, node) => {
            const { x, y } = getNodePositionWithOrigin(
                node,
                nodeOrigin
            ).positionAbsolute;
            return getBoundsOfBoxes(
                currBox,
                rectToBox({
                    x,
                    y,
                    width: node.width || 0,
                    height: node.height || 0,
                })
            );
        },
        { x: Infinity, y: Infinity, x2: -Infinity, y2: -Infinity }
    );

    return boxToRect(box);
};
