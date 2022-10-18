import styled from 'styled-components'

const PageHeaderStyled = styled.div`
  & > div {
    margin: ${({ theme }) => theme.margin.margin2};
  }
`

export default PageHeaderStyled
