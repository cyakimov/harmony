import React from 'react';
import Spinner from '@atlaskit/spinner';
import styled from 'styled-components';
import Colors from '../../colors';
import {OnClick} from "../../types";

interface IBaseButton {
    fullWidth?: boolean;
    width?: string;
}

interface IButton extends IBaseButton {
    className?: string;
    children?: React.ReactNode;
    hoverColor?: string;
    backgroundColor?: string;
    loading?: boolean;
    onClick?: OnClick;
}

const Base = styled.button.attrs((props: IBaseButton) => ({
    fullWidth: false
}))`
  &:hover, &:focus, &:active {
    background-color: ${Colors.PRIMARY_HOVER};  
    outline: none;
  }

  background-color: ${Colors.PRIMARY};
  display: flex;
  cursor: pointer;
  position: relative;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  color: ${Colors.PRIMARY_TEXT};
  height: 44px;

  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  border-radius: 3px;
  
  padding: 2px 16px;
  transition: background-color .17s ease,color .17s ease;
  width: ${(props: IBaseButton) => props.fullWidth ? '100%' : (props.width || 'auto')};
`;

const FullWidth = styled(Base)`
  min-width: 130px;
  min-height: 44px;
  width: 100%;
`;

const Button = ({children, className, onClick, loading}: IButton) => {

    return (
        <Base className={className} onClick={onClick}>
            {loading ? <Spinner size="small" /> : null}
            {loading ? null : children}
        </Base>
    );
};

const ButtonFullWidth = ({children, loading, className}: IButton) => {

    return (
        <FullWidth className={className}>
            {loading ? <Spinner size="medium" /> : null}
            {loading ? null : children}
        </FullWidth>
    );
};

const Circle = styled.button<IButton>`
  &:hover, &:active {
    background-color: ${props => props.hoverColor || Colors.PRIMARY_HOVER};  
    outline: none;
  }

  &:focus {
  outline: none;
  }

  display:block;
  color: white;
  cursor: pointer;
  background-color: ${props => props.backgroundColor || 'rgba(0,0,0, 0.3)'};
  height: 50px;
  width: 50px;
  border-color: transparent;
  border-radius: 50%;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
`;

const ButtonCircle = (props: IButton) =>
    <Circle {...props}>
        {props.loading ? <Spinner size="medium" /> : null}
        {props.loading ? null : props.children}
    </Circle>;

export {
    Button,
    ButtonFullWidth,
    ButtonCircle
};
