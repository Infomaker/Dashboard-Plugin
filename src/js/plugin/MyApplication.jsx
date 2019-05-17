/**
 * Create an Application by extending the Application class
 * Read more about Application (https://github.com/Infomaker/Dashboard-Plugin/wiki/Application)
 */

import { Application, GUI } from "Dashboard"

import MyModal from '@components/MyModal'
import MyExampleComponent from '@components/MyExampleComponent'

export default class MyApplication extends Application {
    constructor(props) {
        super(props)

        this.state = {
            config: props.config
        }
    }

    render() {
        const { config } = this.state

        return (
            // Use @plugin_bundle_class and the bundle in the manifest will be used as your class
            <GUI.Wrapper className={"@plugin_bundle_class"}>

                <GUI.Title text={config.pluginTitle || "hello world"} />

                <GUI.Button
                    size={"large"}
                    text={"Open a modal"}
                    onClick={() => this.openModal(MyModal)}
                />

                <MyExampleComponent input={`My example component #1`} />
                <MyExampleComponent input={`My example component #2`} color={'blue'} />
            </GUI.Wrapper>
        )
    }
}