import BaseEdge from './BaseEdge';

export type EdgeTypes = keyof typeof edgeTypes;

const edgeTypes = {
    base: BaseEdge,
};

export default edgeTypes;
