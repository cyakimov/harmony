import styled from 'styled-components';
import Colors from '../../colors';

const TextInput = styled.input`
  &:hover, &:focus, &:active {
    outline: none;
  }

  &:hover {
    border-color: #040405;
  }
  
  &:focus {
    border-color: ${Colors.PRIMARY};
  }

  font-size: 16px;
  font-weight: 500;
  box-sizing: border-box;
  width: 100%;
  border-radius: 3px;
  color: ${Colors.INPUT_TEXT};
  background-color: ${Colors.INPUT_BG};
  border: none;
  transition: border-color .2s ease-in-out;
  padding: 10px;
  height: 40px;
`;

export default TextInput;
