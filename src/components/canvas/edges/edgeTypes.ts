import CustomEdge from './CustomEdge';

export type EdgeTypes = keyof typeof edgeTypes;

const edgeTypes = {
    base: CustomEdge,
};

export default edgeTypes;
