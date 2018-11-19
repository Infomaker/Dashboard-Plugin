import { Component } from 'react'
import { ComponentWrapper } from './style'

class MyExampleComponent extends Component {
    render() {
        const { input, color = 'red' } = this.props

        return (
            <ComponentWrapper color={color}>
                {input}
            </ComponentWrapper>
        )
    }
}

export default MyExampleComponent