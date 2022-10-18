import styled from 'styled-components'

const ChatCardStyled = styled.div`
  display: flex;
  align-items: center;
  border-bottom: ${({ theme }) => theme.border.border1};
  border-right: ${({ theme }) => theme.border.border1};
  border-color: ${({ theme }) => theme.colors.accent};
  position: relative;

  &:hover {
    &:before {
      position: absolute;
      top: 20%;
      right: 15%;
      content: '●●●';
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.hover};
      cursor: pointer;
    }
  }

  .pfp {
    overflow: hidden;
    margin-inline: ${({ theme }) => theme.margin.margin1};
    margin-block: ${({ theme }) => theme.margin.marginCardBlock};
    height: ${({ theme }) => theme.icon.size2};
    width: ${({ theme }) => theme.icon.size2};
    border-radius: 50%;
  }
`

export default ChatCardStyled
