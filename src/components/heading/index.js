import styled, { css } from 'styled-components';
import Colors from '../../colors';

const baseStyle = css`
  flex: 1;
  cursor: default;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0;
`;

const H5 = styled.h5`
  font-size: 12px;
  line-height: 16px; 
  color: ${Colors.HEADING_SECONDARY};
  
  ${baseStyle}
`;

export {
  H5
};
