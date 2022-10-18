import styled, { ThemeContext } from 'styled-components'

const MessageConstructorStyled = styled.div`
  display: flex;
  font-size: 2rem;
  border-top: ${({ theme }) => theme.border.border1};
  padding-top: ${({ theme }) => theme.padding.padding1};
  border-color: ${({ theme }) => theme.colors.accent};

  input[type='text'] {
    flex-grow: 1;
    border-radius: ${({ theme }) => theme.border.radius1};
  }

  svg {
    margin-inline: ${({ theme }) => theme.margin.margin1};
  }
`
export default MessageConstructorStyled
