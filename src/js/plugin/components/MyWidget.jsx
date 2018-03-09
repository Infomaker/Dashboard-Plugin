/**
 * Create a Widget by extending the Widget class
 * Read more about Widget (https://github.com/Infomaker/Dashboard-Plugin/wiki/Widget)
*/

import { Widget, GUI } from 'Dashboard'

export default class MyWidget extends Widget {
	render() {
		return <GUI.WidgetButton text="Dashboard Plugin Widget" onClick={() => window.open("https://www.google.se/?gws_rd=ssl#q=hello+world")}/>
	}
}