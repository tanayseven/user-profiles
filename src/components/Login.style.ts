import styled from 'styled-components'

export const Wrapper = styled.div`
  border: 1px solid #efefef;
  border-radius: 5px;
  padding: 20px 20px;
  input[type='text'],
  input[type='password'] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .error-msg {
    color: #ff0000;
  }
`

export const ButtonWrapper = styled.div`
  :hover {
    opacity: 0.8;
  }
  input[type='button'] {
    cursor: pointer;
    user-select: none;
    width: 100%;
    height: 40px;
    margin: 5px 0;
  }
`
