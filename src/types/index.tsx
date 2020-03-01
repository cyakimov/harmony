import React, {FormEventHandler} from "react";
import Peer from "peerjs";

export interface IForm {
    onSubmit: FormEventHandler
}

export interface IRoom {
    id: string;
    initiator: boolean;
    username: string;
    peer: Peer;
}

export interface IParticipant {
    stream: MediaStream
}

export interface IParticipantHash {
    [id: string]: IParticipant
}

export type OnClick = (e: React.MouseEvent<HTMLButtonElement>) => void;
