import React from 'react'
import { ComponentWrapper } from './style'

const MyExampleComponent = props => {
    const { input, color = 'red' } = props

    return (
        <ComponentWrapper color={color}>
            {input}
        </ComponentWrapper>
    )
}

export default MyExampleComponent