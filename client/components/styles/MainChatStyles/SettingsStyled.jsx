import styled from 'styled-components'

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

export default SettingsStyled
