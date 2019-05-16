/**
 * Create settings for you plugin by extending the Dashboard.Settings component
 */

import { Settings, GUI } from "Dashboard"

export default class MySettings extends Settings {
    /**
     *  Plugin settings will be displayed in the store. These settings will be available for Agent, Widget and Application.
     */
    plugin() {
        return (
            <GUI.ConfigInput name="Title2" ref={ref => this.handleRefs(ref, 'pluginTitle')} />
        )
    }

    // Application settings will be displayed in application settings mode. These settings will only be available for the application.
    application() {
        return <GUI.ConfigInput name="Title" ref={ref => this.handleRefs(ref, 'pluginTitle')}  />
    }
}
