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

const ChatFeedStyled = styled.div`
  flex-grow: 1;
`

const ChatListStyled = styled.div`
  overflow-y: scroll;
`

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

const RoleListStyled = styled.div`
  border-left: ${({ theme }) => theme.border.border1};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.margin.margin2};

  .header {
    text-align: center;
    font-size: ${({ theme }) => theme.font.heading3};
  }
`
const RoleStyled = styled.div`
  margin-inline-start: ${({ theme }) => theme.margin.margin1};
  display: flex;
  flex-direction: column;

  & > div {
    margin-block: 0.5rem;
  }

  .roleTitle {
    color: ${({ color }) => color};
  }
  .memberList {
    display: flex;
    .member {
      height: ${({ theme }) => theme.icon.size1};
      width: ${({ theme }) => theme.icon.size1};
      border-radius: 50%;
      overflow: hidden;
    }
  }
`
const SearchStyled = styled.div`
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 45px;
  color: ${({ theme }) => theme.colors.accent};
  border: ${({ theme }) => theme.border.border1};
  border-left: none;
  border-top: none;
  border-color: ${({ theme }) => theme.colors.accent};

  input[type='text'] {
    margin: ${({ theme }) => theme.margin.margin1};
    height: 45px;
    width: 290px;
    border-radius: ${({ theme }) => theme.border.radius1};

    &::placeholder {
      padding-inline-start: ${({ theme }) => theme.padding.padding1};
    }
  }
  svg {
    margin: ${({ theme }) => theme.margin.margin1};
  }
`

const SettingsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.margin.margin1};
  padding-block: ${({ theme }) => theme.padding.padding2};
  border-left: ${({ theme }) => theme.border.border1};

  .header {
    font-size: ${({ theme }) => theme.font.heading3};
    text-align: center;
  }
  .settingsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    .setting {
      border-radius: ${({ theme }) => theme.border.radius1};
      border: ${({ theme }) => theme.border.border1};
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      width: 180px;
    }
  }
`

const UserHeaderStyled = styled.div`
  height: 72px;
  border-bottom: ${({ theme }) => theme.border.border1};
  border-color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  .pfp {
    border-radius: 50%;
    overflow: hidden;
    margin-inline: ${({ theme }) => theme.margin.margin1};
  }
`

export {
  MainChatStyled,
  ChatCardStyled,
  ChatFeedStyled,
  UserHeaderStyled,
  ChatListStyled,
  MessageConstructorStyled,
  RoleListStyled,
  RoleStyled,
  SearchStyled,
  SettingsStyled,
}
