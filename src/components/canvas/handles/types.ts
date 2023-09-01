import { Connection, HandleType } from 'reactflow';

export type ValidConnectionFunc = (connection: Connection) => boolean;

export type ConnectionHandle = {
    id: string | null;
    type: HandleType | null;
    nodeId: string;
    x: number;
    y: number;
};
