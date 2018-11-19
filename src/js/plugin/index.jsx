/*
|--------------------------------------------------------------------------
| Index.jsx
|--------------------------------------------------------------------------
|
| Welcome to your plugin.
| Documentation can be found at https://github.com/Infomaker/Dashboard-Plugin/wiki.
| Report bugs or leave feedback (about plugins or the Dashboard) at https://github.com/Infomaker/Dashboard-Plugin/issues.
|
*/

import { register } from "Dashboard";
import MyAgent from "@root/MyAgent";
import MyWidget from "@root/MyWidget";
import MySettings from "@root/MySettings";
import MyApplication from "@root/MyApplication";

/**
 * You can also create an Health by extending the Health class from Dashboard (Dashboard.Health).
 * Don't forget to register it as well.
 * Read more about Health (https://github.com/Infomaker/Dashboard-Plugin/wiki/Health)
 */

(() => {
    /**
     * Register your plugin in the Dashboard.
     */
    register({
        // Leave this be and it will fetch the data from your manifest file in the build steps
        bundle: "@plugin_bundle",

        // Only one of these are actually required. If you are developing a widget, just remove the application and agent.
        agent: MyAgent,
        widget: MyWidget,
        application: MyApplication,

        // Settings is optional.
        settings: MySettings
    });
})()
