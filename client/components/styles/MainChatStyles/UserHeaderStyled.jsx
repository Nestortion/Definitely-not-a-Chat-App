import styled from 'styled-components'

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

export default UserHeaderStyled
