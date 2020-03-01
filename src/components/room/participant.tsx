import {Video, VideoMode} from '../media';
import React, {useEffect, useRef} from 'react';
import {IParticipant} from "../../types";

interface Props {
    participant: IParticipant,
    muted?: boolean
}

const Participant = ({participant, muted}: Props) => {
    const videoRef = useRef<HTMLVideoElement | null>(null!);

    console.info("Rendering participant", participant);

    useEffect(() => {

        if (videoRef.current) {
            videoRef.current.srcObject = participant.stream;
        }
    }, [videoRef]);

    return <Video mode={VideoMode.Mini} muted={muted} autoPlay playsinline ref={videoRef} />;
};

export default Participant;
