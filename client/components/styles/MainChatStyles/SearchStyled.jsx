import styled from 'styled-components'

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
export default SearchStyled
