import styled from 'styled-components'

const AccountSettingsStyled = styled.div`
  max-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.margin.margin2};
  flex-wrap: wrap;
  align-items: center;
`

const ProfilePictureStyled = styled.div`
  overflow: hidden;
  height: 500px;
  width: 500px;
  border-radius: ${({ theme }) => theme.border.radius2};
  position: relative;
  border: ${({ theme }) => theme.border.border2};
  border-color: ${({ theme }) => theme.colors.accent};

  button {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 90px;
    width: 125px;
    background-color: ${({ theme }) => theme.colors.accent};
    border: none;
    font-size: ${({ theme }) => theme.font.heading1};
    font-weight: bold;
    color: ${({ theme }) => theme.colors.backGround};
    border-top-right-radius: ${({ theme }) => theme.border.radius2};
  }
`

const BioStyled = styled.div`
  border: ${({ theme }) => theme.border.border2};
  border-color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.border.radius2};
  width: 500px;

  textarea {
    resize: none;
    height: 250px;
    width: 484px;
    border: none;
    outline: none;
    font-size: ${({ theme }) => theme.font.heading1};
    border-radius: ${({ theme }) => theme.border.radius2};
    padding: ${({ theme }) => theme.padding.padding2};
    background-color: ${({ theme }) => theme.colors.backGround};
    color: ${({ theme }) => theme.colors.foreGround};

    &::placeholder {
      text-align: center;
      line-height: 150px;
      font-size: ${({ theme }) => theme.font.heading2};
    }
  }
`

const DetailFieldsStyled = styled.div`
  height: 100%;
  border: 1px solid white;
  width: fit-content;
  border: ${({ theme }) => theme.border.border2};
  border-color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.border.radius2};

  form {
    padding: ${({ theme }) => theme.padding.padding2};
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;

    .field {
      width: 1050px;
      height: 65px;
      display: flex;
      align-items: center;
      padding-inline: ${({ theme }) => theme.padding.padding2};
      justify-content: space-between;

      label {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      input {
        width: 830px;
        height: 45px;
        border-radius: ${({ theme }) => theme.border.radius1};
        color: ${({ theme }) => theme.colors.foreGround};
        background-color: ${({ theme }) => theme.colors.active};
        font-size: ${({ theme }) => theme.font.heading1};
        border: none;
        padding-inline-start: ${({ theme }) => theme.padding.padding2};

        &:focus {
          outline: none;
        }
      }
    }
    button {
      align-self: center;
      padding: ${({ theme }) => theme.padding.padding1};
      background-color: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.foreGround};
      font-size: ${({ theme }) => theme.font.heading2};
      border-radius: ${({ theme }) => theme.border.radius1};
    }
  }
`

export {
  AccountSettingsStyled,
  ProfilePictureStyled,
  BioStyled,
  DetailFieldsStyled,
}
