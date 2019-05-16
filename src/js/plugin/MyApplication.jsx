/**
 * Create an Application by extending the Application class
 * Read more about Application (https://github.com/Infomaker/Dashboard-Plugin/wiki/Application)
 */

import { GUI, Application } from "Dashboard";
import { MyExampleComponent } from '@components/MyExampleComponent'
import { MyModal } from '@components/MyModal'

const colors = ['green', 'red', 'yellow', 'aqua', 'pink', 'black', 'cyan', 'magenta']

class MyApplication extends Application {
    constructor(props) {
        super(props)
        
        this.state = {
            config: props.config,
            color: "black"
        }
    }

    render() {
        return (
            <GUI.Wrapper className="@plugin_bundle_class">

                <GUI.Title text={this.state.config.pluginTitle || "hello world"} />

                <GUI.Button
                    text="Change color"
                    size="large"
                    onClick={() => {
                        let index = Math.floor(Math.random() * colors.length)
                        this.setState({color: colors[index]})}
                    }
                />

                <GUI.Button
                    text="Open a modal"
                    size="large"
                    onClick={this.openModal(MyModal)}
                />

                <MyExampleComponent input={`My example component #1`} />
                <MyExampleComponent input={`My example component #2`} color={this.state.color} />
            </GUI.Wrapper>
        )
    }
}

export default MyApplication