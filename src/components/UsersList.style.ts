import styled from 'styled-components'

export const Wrapper = styled.div`
  ul {
    padding: 0;
  }
  a {
    color: #0e0e0e;
    text-decoration: none;
  }
  .list li {
    border: 1px solid #ccc;
    display: table;
    border-collapse: collapse;
    width: 400px;
    margin-bottom: 20px;
  }
  .inner {
    display: table-row;
    overflow: hidden;
  }
  .li-img {
    display: table-cell;
    vertical-align: middle;
    width: 30%;
    padding-right: 1em;
  }
  .li-img img {
    display: block;
    width: 100%;
    height: auto;
  }
  .li-text {
    display: table-cell;
    vertical-align: middle;
    width: 70%;
  }
  .li-head {
    margin: 0;
  }
  .li-sub {
    margin: 0;
  }
`

export const NavigationWrapper = styled.div`
  a {
    margin-right: 20px;
  }
`
