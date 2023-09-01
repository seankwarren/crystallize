import { ActionsListType } from '@components/canvas/types';
import { Edge, Node } from 'reactflow';
import { EdgeTypes } from '../edges';
import { NodeTypes } from '../nodes';
import { TOOLBAR_ACTIONS } from './TOOLBAR_ACTIONS';

const allTypesMatch = (
    arr: Node[] | Edge[],
    match: (NodeTypes | EdgeTypes)[]
): boolean => {
    return arr.every((elem) =>
        match.includes(elem.type as NodeTypes | EdgeTypes)
    );
};

const someTypesMatch = (
    arr: Node[] | Edge[],
    match: (NodeTypes | EdgeTypes)[]
): boolean => {
    return arr.some((elem) =>
        match.includes(elem.type as NodeTypes | EdgeTypes)
    );
};

export const getAllowedToolbarActions = (
    selectedNodes: Node[] = [],
    selectedEdges: Edge[] = []
): ActionsListType => {
    const filteredActions = Object.entries(TOOLBAR_ACTIONS).filter(
        ([, action]) => {
            const numNodes = selectedNodes.length;
            const numEdges = selectedEdges.length;

            const allNodesMatchTypes = allTypesMatch(
                selectedNodes,
                action.allowedNodeTypes
            );
            // const allEdgesMatchTypes = allTypesMatch(
            //     selectedEdges,
            //     action.allowedEdgeTypes
            // );
            const someNodesMatchTypes = someTypesMatch(
                selectedNodes,
                action.allowedNodeTypes
            );
            const someEdgesMatchTypes = someTypesMatch(
                selectedEdges,
                action.allowedEdgeTypes
            );

            if (numNodes < 1 && numEdges < 1) {
                // devLog(`${key} there are no selected elements`);
                return false;
            }

            // if both nodes and edges are selected only show matching actions for nodes, and matching actions for edges which have mixedElements as true
            if (numNodes > 0 && numEdges > 0) {
                if (action.allowedNodeTypes.length < 1) {
                    // devLog(`${key} there are no allowed node types`);
                    return false;
                }
                if (!action.allowsMixedElements) {
                    // devLog(`${key} cannot have both nodes and edges selected`);
                    return false;
                }
                if (numNodes > 1 && !action.allowsMultiSelection) {
                    // devLog(`${key} does not allow for multi-selection`);
                    return false;
                }
                if (numNodes <= 1 && action.requiresMultiSelection) {
                    // devLog(`${key} requires multi-selection`);
                    return false;
                }
                if (action.requiresSingleType && !allNodesMatchTypes) {
                    // devLog(`${key} requires a single type selection`);
                    return false;
                }
                if (!someNodesMatchTypes) {
                    // devLog(`${key} does not match the type of the selection`);
                    return false;
                }
                return true;
            }

            if (numNodes > 0) {
                if (action.allowedNodeTypes.length < 1) {
                    // devLog(`${key} there are no allowed nodes types`);
                    return false;
                }
                if (numNodes > 1 && !action.allowsMultiSelection) {
                    // devLog(`${key} does not allow for multi-selection`);
                    return false;
                }
                if (numNodes <= 1 && action.requiresMultiSelection) {
                    // devLog(`${key} requires multi-selection`);
                    return false;
                }
                if (!someNodesMatchTypes) {
                    // devLog(`${key} does not match the type of the selection`);
                    return false;
                }
                return true;
            }

            if (numEdges > 0) {
                if (action.allowedEdgeTypes.length > 1) {
                    // devLog(`${key} there are no allowed edge types`);
                    return false;
                }
                if (numEdges > 1 && !action.allowsMultiSelection) {
                    // devLog(`${key} does not allow for multi-selection`);
                    return false;
                }
                if (numEdges <= 1 && action.requiresMultiSelection) {
                    // devLog(`${key} requires multi-selection`);
                    return false;
                }
                if (!someEdgesMatchTypes) {
                    // devLog(`${key} does not match the type of the selection`);
                    return false;
                }
                return true;
            }
        }
    );
    return Object.fromEntries(filteredActions);
};
