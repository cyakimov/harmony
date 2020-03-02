import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {ScreenContainer, Video, VideoContainer, VideoMode} from '../media';
import Controls from './controls';
import Participant from './participant';
import {useRoomContext} from '../../context/roomContext';
import {IParticipantHash, IRoom} from "../../types";
import Peer from "peerjs";

const getMedia = async (constraints: MediaStreamConstraints): Promise<MediaStream> => {
    return await navigator.mediaDevices.getUserMedia(constraints);
};

// const getScreen = async () => {
//   return await navigator.mediaDevices.getDisplayMedia({ video: true });
// };

const Container = styled.div`
  background-color: #F6F6FD;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

function Room({id: roomId, peer, username, initiator}: IRoom) {
    // const history = useHistory();
    let {leaveRoom} = useRoomContext();
    const activeStream = useRef<HTMLVideoElement | null>(null!);
    const [state, setState] = useState({
        init: false,
        localStream: new MediaStream(),
        peerInitiated: false
    });
    const [participants, setParticipants] = useState<IParticipantHash>({});

    // history.push(`/room/${roomId}`);

    const onCall = (call: Peer.MediaConnection) => {
        console.log('Got call', call);
        call.on('stream', (remoteStream) => {
            console.log('Got stream from remote', remoteStream, call);

            setParticipants(p => (
                {
                    ...p,
                    [remoteStream.id]: {
                        stream: remoteStream,
                        metadata: call.metadata
                    }
                }));
            if (activeStream.current) {
                activeStream.current.srcObject = remoteStream;
            }
        });
        call.on('close', () => {
            console.log('closed');
        });
        call.answer(state.localStream);
    };

    const onConnOpen = () => {
        console.info('Calling', roomId);

        const call = peer.call(roomId, state.localStream, {metadata: {username: username}});
        call.on('stream', remoteStream => {
            console.log('Got stream host', remoteStream);
            setParticipants(p => ({...p, [remoteStream.id]: {stream: remoteStream}}));
            if (activeStream.current) {
                activeStream.current.srcObject = remoteStream;
            }
        });
    };

    useEffect(() => {
        console.log('Init effect');
        const constraints = {
            video: true,
            audio: true
        };
        getMedia(constraints).then(localStream => {
            console.log('Getting local stream');
            setState(state => ({...state, init: true}));
            localStream.getTracks().forEach(t => state.localStream.addTrack(t));
        }).catch(e => {
            // @todo
            throw e;
        });
        if (activeStream.current) {
            activeStream.current.srcObject = state.localStream;
        }

    }, [state.init]);

    useEffect(() => {
        console.log('Peer effect');
        peer.on('call', onCall);

        if (!initiator) {
            console.info('About to call');
            peer.on('open', onConnOpen);
        }

        return function cleanup() {
            console.info('Cleaning Peer effect');
            peer.off('call', onCall);
            peer.off('open', onConnOpen);
        };
    }, [state.init]);

    const shareScreen = () => {
        // let localStream = state.localStream;
        //
        // if (!localStream) {
        //   localStream = action.payload;
        // } else {
        //   // add to current local stream
        //   action.payload.getTracks().map(stream => {
        //     localStream.addTrack(stream);
        //   });
        // }
    };

    const onHangUp = () => {
        const videoTracks = state.localStream.getVideoTracks() || [];
        peer.disconnect();
        videoTracks.forEach((track: MediaStreamTrack) => {
            if (track.enabled) {
                track.stop();
            }
        });
        leaveRoom(roomId);
    };

    const onToggleAudio = () => {
        console.info('Toggling audio');
        const audioTracks = state.localStream.getAudioTracks();
        if (audioTracks.length === 0) {
            return;
        }

        audioTracks.forEach(audio => audio.enabled = !audio.enabled);
        console.debug(audioTracks);
    };

    const onToggleVideo = () => {
        console.info('Toggling video');
        const videoTracks = state.localStream.getVideoTracks();
        if (videoTracks.length === 0) {
            return;
        }

        videoTracks.forEach(video => video.enabled = !video.enabled);
        console.debug(videoTracks);
    };

    return (
        <Container>
            <Video
                mode={VideoMode.Full}
                autoPlay
                playsinline
                ref={activeStream}
                muted={Object.keys(participants).length === 0} />
            <Controls
                onShareScreen={shareScreen}
                onToggleVideo={onToggleVideo}
                onToggleAudio={onToggleAudio}
                onHangUp={onHangUp}
            />
            <ScreenContainer>
                {/*{room.desktopStreams.map(*/}
                {/*    s => <VideoMini key={s.id} autoPlay playsinline srcObject={s} />)}*/}
            </ScreenContainer>
            <VideoContainer>
                {/*<VideoMini autoPlay playsinline ref={localStream} />*/}

                {Object.keys(participants).length === 1 ?
                    // Local video (2 person call)
                    <Participant muted={true} participant={{stream: state.localStream}} /> :
                    Object.keys(participants).map(id =>
                        <Participant key={id} participant={participants[id]} />
                    )
                }
            </VideoContainer>
        </Container>
    );
}

export default Room;
