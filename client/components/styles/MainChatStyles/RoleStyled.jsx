import styled from 'styled-components'
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

export default RoleStyled
