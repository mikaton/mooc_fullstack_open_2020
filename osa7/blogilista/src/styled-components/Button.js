import styled from 'styled-components';

const Button = styled.button`
  background: ${props => (props.primary ? '#e53e3e' : '#fff')};
  color: ${props => (props.primary ? '#fff' : '#e53e3e')};
  border: ${props => (props.primary ? '1 px solid #fff' : '1 px solid #e53e3e')};
`;

export default Button;
