import styled from 'styled-components'

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
export default RoleListStyled
