import React, {useState} from 'react';
import {Button, ButtonCircle} from '../button';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import InviteTeamIcon from '@atlaskit/icon/glyph/invite-team';
import VidHangUpIcon from '@atlaskit/icon/glyph/vid-hang-up';
import VidShareScreenIcon from '@atlaskit/icon/glyph/vid-share-screen';
import VidAudioOnIcon from '@atlaskit/icon/glyph/vid-audio-on';
import VidAudioMutedIcon from '@atlaskit/icon/glyph/vid-audio-muted';
import VidCameraOffIcon from '@atlaskit/icon/glyph/vid-camera-off';
import VidCameraOnIcon from '@atlaskit/icon/glyph/vid-camera-on';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import styled from 'styled-components';

const ButtonsContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: space-between;
  top: 30px;
  height: 50px;   
  width: 100%;
`;

export enum ButtonGroupDirection {
    Left,
    Right,
}

interface ButtonGroupProps {
    direction?: ButtonGroupDirection
}

const ButtonGroup = styled.div<ButtonGroupProps>`
  display: flex;  
  
  >button {
    ${props => props.direction === ButtonGroupDirection.Right ? 'margin-right: 15px' : 'margin-left: 15px'}
  }
  
`;

const ButtonShareScreen = styled(Button)`
  border-radius: 20px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.4);
  width: 300px;
`;

const ShareScreenIconContainer = styled.span`
  margin-right: 10px;
`;

interface IControls {
    onToggleVideo: () => void;
    onToggleAudio: () => void;
    onShareScreen: () => void;
    onHangUp: () => void;
}

const Controls = ({onToggleVideo, onToggleAudio, onShareScreen, onHangUp}: IControls) => {
    const [audio, toggleAudio] = useState(true);
    const [video, toggleVideo] = useState(true);

    const handleToggleAudio = () => {
        toggleAudio(audio => !audio);
        if (onToggleAudio) {
            onToggleAudio();
        }
    };

    const handleToggleVideo = () => {
        toggleVideo(video => !video);
        if (onToggleVideo) {
            onToggleVideo();
        }
    };

    return (
        <ButtonsContainer>
            <ButtonGroup>
                <ButtonCircle>
                    <PeopleGroupIcon label="" primaryColor="white" />
                </ButtonCircle>
                <ButtonCircle>
                    <InviteTeamIcon label="" primaryColor="white" />
                </ButtonCircle>
                <ButtonCircle onClick={onHangUp} backgroundColor="#ED3452" hoverColor="#ED0026">
                    <VidHangUpIcon label="" primaryColor="white" />
                </ButtonCircle>
            </ButtonGroup>
            <ButtonShareScreen onClick={onShareScreen}>
              <ShareScreenIconContainer>
                <VidShareScreenIcon label="" size="small" />
              </ShareScreenIconContainer>
              Share my screen
            </ButtonShareScreen>
            <ButtonGroup direction={ButtonGroupDirection.Right}>
                <ButtonCircle onClick={handleToggleAudio}>
                    {audio ?
                        <VidAudioOnIcon label="" primaryColor="white" /> :
                        <VidAudioMutedIcon label="" primaryColor="white" />
                    }
                </ButtonCircle>
                <ButtonCircle onClick={handleToggleVideo}>
                    {video ?
                        <VidCameraOnIcon label="" primaryColor="white" /> :
                        <VidCameraOffIcon label="" primaryColor="white" />
                    }
                </ButtonCircle>
                <ButtonCircle>
                    <SettingsIcon primaryColor="white" label="" />
                </ButtonCircle>
            </ButtonGroup>
        </ButtonsContainer>
    );
};

export default Controls;
