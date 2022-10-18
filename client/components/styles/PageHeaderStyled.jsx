import styled from 'styled-components'

const PageHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    padding: ${({ page }) =>
      page === 'login'
        ? ({ theme }) => theme.padding.padding2
        : ({ theme }) => theme.padding.padding1};
  }
  .pfp {
    height: ${({ theme }) => theme.icon.size1};
    width: ${({ theme }) => theme.icon.size1};
    border-radius: 50%;
    overflow: hidden;
    margin-inline-end: ${({ theme }) => theme.margin.margin1};
  }
`

export default PageHeaderStyled
