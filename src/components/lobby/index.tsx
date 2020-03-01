import React from 'react';
import {useParams} from 'react-router-dom';
import Room from '../room';
import AuthBox from '../authBox';
import {useRoomContext} from '../../context/roomContext';

const Lobby = () => {
    let {roomId} = useParams();
    let {room} = useRoomContext();

    const id = room.roomId || roomId;

    console.log('ID:', id);

    return (
        (!id || room.username === '') ?
            <AuthBox /> :
            <Room peer={room.peer} id={id} username={room.username} initiator={room.host} />
    );
};

export default Lobby;
