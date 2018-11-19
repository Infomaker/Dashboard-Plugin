import styled from 'styled-components'

export const ComponentWrapper = styled.div`
    margin: 10px;
    padding: 10px;
    border: 5px solid ${({color}) => color};
    width: 250px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`