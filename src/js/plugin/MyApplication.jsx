/**
 * Create an Application by extending the Application class
 * Read more about Application (https://github.com/Infomaker/Dashboard-Plugin/wiki/Application)
 */

import { Application, Modal, GUI } from "Dashboard";
import {MyExampleComponent} from '@components/MyExampleComponent'

export default class MyApplication extends Application {
    constructor(props) {
        super(props)

        this.state = {
            config: props.config
        }
    }

    render() {
        return (
            // Use @plugin_bundle_class and the bundle in the manifest will be used as your class
            <GUI.Wrapper className="@plugin_bundle_class">

                <GUI.Title text={this.state.config.pluginTitle || "hello world"} />

                <GUI.Button
                    text="Open a modal"
                    size="large"
                    onClick={() => this.openModal(MyModal)}
                />

                <MyExampleComponent input={`My example component #1`} />
                <MyExampleComponent input={`My example component #2`} color={'blue'}/>
                <MyExampleComponent input={`My example component #3`} color={'green'} />
            </GUI.Wrapper>
        )
    }
}

/**
 * Create an Modal by extending the Modal class
 * Read more about Modal (https://github.com/Infomaker/Dashboard-Plugin/wiki/Modal)
 */
class MyModal extends Modal {
    componentWillMount() {
        // Call setTitle to set the component most upper title.
        this.props.setModalTitle("My Modal")
    }

    render() {
        const treasures = ["🐢", "🦂", "👑", "🐌", "💍"]

        return (
            <GUI.Section title="You found a modal">
                <GUI.Paragraph
                    text={
                        "You opened it and got " +
                        (Math.floor(Math.random() * 5) + 1) +
                        " gems and a " +
                        treasures[Math.floor(Math.random() * treasures.length)]
                    }
                />
            </GUI.Section>
        )
    }
}
