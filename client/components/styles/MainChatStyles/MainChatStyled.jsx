import styled from 'styled-components'

const MainChatStyled = styled.div`
  display: flex;
  width: 100%;
  & > div {
    display: flex;
    flex-direction: column;
    height: 1000px;
    border-top: ${({ theme }) => theme.border.border1};
    border-color: ${({ theme }) => theme.colors.accent};
  }

  .friendList,
  .chatSettings {
    width: 430px;
  }

  .chatWindow {
    flex-grow: 1;
    display: flex;
  }
`

export default MainChatStyled
