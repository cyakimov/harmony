import React, {FormEvent, FormEventHandler, useState} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '@atlaskit/avatar';
import Panel from '../panel';
import {H5} from '../heading';
import TextInput from "../textinput";
import {ButtonFullWidth} from '../button';
import Colors from '../../colors';
import {useRoomContext} from '../../context/roomContext';
import Peer from 'peerjs';
import {IForm} from '../../types'

const Container = styled(Panel)`
  max-width: 480px;
  padding: 40px;
  margin: 20vh auto 0;
`;

const AuthForm = styled.form<IForm>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 400;
  line-height: 32px;
  color: ${Colors.HEADING_PRIMARY};
`;

const AvatarContainer = styled.div`
  margin-bottom: 20px;
`;

function AuthBox() {
    const {roomId} = useParams();
    const {createRoom, joinRoom} = useRoomContext();
    let [name, setName] = useState('');

    const onSubmit: FormEventHandler = (e: FormEvent) => {
        e.preventDefault();

        if (!roomId) {
            const roomId = 'local';
            const peer = new Peer(roomId, {debug: 2});
            // const peer = new Peer({ initiator: true });
            createRoom(peer, roomId, name);
        } else {
            const peer = new Peer();
            joinRoom(peer, roomId, name);
        }

    };

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };

    return <Container>
        <AuthForm onSubmit={onSubmit}>
            <AvatarContainer>
                <Avatar size="xlarge" src="/logo.png" />
            </AvatarContainer>
            <Title>{roomId ? 'Join meeting' : 'Create a meeting'}</Title>
            <div style={{margin: '20px 0', width: '100%'}}>
                <div style={{marginBottom: '10px'}}>
                    <H5>Name</H5>
                </div>
                <TextInput
                    value={name}
                    onChange={onChange}
                    autoFocus
                    maxLength={30}
                    required
                    placeholder="What should everyone call you?" />
            </div>
            <ButtonFullWidth>
                {roomId ? 'Join' : 'Create'}
            </ButtonFullWidth>
        </AuthForm>
    </Container>;
}

export default AuthBox;
