import styled from 'styled-components';

export enum VideoMode {
    Full,
    Mini,
}

interface IVideo {
    mode: VideoMode
    muted?: boolean
    autoPlay?: boolean
}

export const Video = styled.video<IVideo>`
background-color: #F6F6FB;
  height: 100%;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.4);
  border-radius: ${props => props.mode === VideoMode.Full ? 0 : '16px'};
  object-fit: cover;
  width: ${props => props.mode === VideoMode.Full ? '100%' : '200px'};
  position: ${props => props.mode === VideoMode.Full ? 'relative' : 'absolute'};
  transform: scaleX(-1);
`;

const MediaContainer = styled.div`
  position: absolute;
  bottom: 20px;
  height: 140px;   
  //width: 100%;
`;

export const VideoContainer = styled(MediaContainer)`
  right: 20px;
  transform: scaleX(-1);
`;

export const ScreenContainer = styled(MediaContainer)`
  left: 20px;
`;
