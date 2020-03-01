import {useReducer} from 'react';
import constate from 'constate';
import * as Action from './actions';
import Peer from "peerjs";

export interface IRoomState {
    roomId: string;
    username: string;
    host: boolean;
    peer: Peer | null
}

const INITIAL_STATE: IRoomState = {
    roomId: '',
    username: '',
    host: false,
    peer: null
};

const reducer = (state: IRoomState, action: any) => {
    console.info(action.type);
    switch (action.type) {
        case Action.CREATE_ROOM:
            return {
                ...state,
                ...action.payload
            };
        case Action.JOIN_ROOM:
            return {
                ...state,
                ...action.payload
            };
        case Action.LEAVE_ROOM:
            return {
                ...state,
                roomId: '',
                username: ''
            };
        default:
            throw new Error('Unexpected action');
    }
};

const useRoom = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const createRoom = (peer: Peer, roomId: string, username: string) => {
        dispatch({
            type: Action.CREATE_ROOM,
            payload: {
                roomId,
                username,
                host: true,
                peer
            }
        });
    };

    const joinRoom = (peer: Peer, roomId: string, username: string) => {
        dispatch({
            type: Action.JOIN_ROOM,
            payload: {roomId, username, peer}
        });
    };

    const leaveRoom = (roomId: string) => {
        dispatch({
            type: Action.LEAVE_ROOM,
            payload: {roomId}
        });
    };

    return {
        room: state,
        createRoom,
        joinRoom,
        leaveRoom
    };
};

export const [RoomProvider, useRoomContext] = constate(useRoom);
