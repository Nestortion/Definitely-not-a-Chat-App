import styled from 'styled-components'

const LoginStyled = styled.div`
  display: flex;
  justify-content: space-between;
  & > div {
    margin: ${({ theme }) => theme.margin.margin2};
    height: ${({ theme }) => theme.containers.loginContent.height};
    width: ${({ theme }) => theme.containers.loginContent.width};
  }

  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .container {
      width: 500px;
      height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .header {
        font-size: ${({ theme }) => theme.font.heading4};
        .description {
          font-size: ${({ theme }) => theme.font.heading2};
        }
      }
      form {
        .fields {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          input[type='text'],
          input[type='password'] {
            height: 36px;
            width: 320px;
            font-size: ${({ theme }) => theme.font.heading2};
          }

          input::placeholder {
            padding-inline-start: ${({ theme }) => theme.padding.padding1};
            font-size: ${({ theme }) => theme.font.heading2};
          }
        }
        .options {
          display: flex;
          flex-wrap: wrap;
          width: 320px;
          justify-content: space-between;
          margin-top: ${({ theme }) => theme.margin.margin2};

          button {
            height: 24px;
            width: 62px;
            border: none;
            background-color: ${({ theme }) => theme.colors.accent};
            color: ${({ theme }) => theme.colors.backGround};
            margin-inline-end: ${({ theme }) => theme.margin.margin1};
          }
          & > span {
            font-size: ${({ theme }) => theme.font.heading1};
            margin-inline: ${({ theme }) => theme.margin.margin1};
          }
          .stayLogged {
            margin-top: ${({ theme }) => theme.margin.margin2};
          }
        }
      }
    }
  }
`

export default LoginStyled
