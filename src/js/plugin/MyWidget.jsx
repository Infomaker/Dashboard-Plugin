/**
 * Create a Widget by extending the Widget class
 * Read more about Widget (https://github.com/Infomaker/Dashboard-Plugin/wiki/Widget)
 */

import { Widget, GUI } from "Dashboard";

export default class MyWidget extends Widget {
    render() {
        const items = [
            {
                id: 'this-should-be-a-unique-string-id',
                content: 'Dashboard Plugin Widget',
                onClick: () => window.open("https://www.google.se/?gws_rd=ssl#q=hello+world")
            }
        ]

        return (
            <GUI.List items={items}/>
        )
    }
}
