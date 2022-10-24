import styled from 'styled-components'

const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 16.66vw);
`

const ListContainerStyled = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
`

const CardStyled = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.font.heading1};
  border: ${({ theme }) => theme.border.border1};
  border-color: ${({ theme }) => theme.colors.accent};
  background-color: ${({ theme }) => theme.colors.active};

  .pfp {
    margin: ${({ theme }) => theme.margin.margin1};
    border-radius: 50%;
    overflow: hidden;
  }
`

const ListHeaderStyled = styled.div`
  text-align: Center;
  font-size: ${({ theme }) => theme.font.heading4};
  margin: ${({ theme }) => theme.padding.padding2};
`

export { CardStyled, ListContainerStyled, ListStyled, ListHeaderStyled }
