/**
 * Create an Health by extending the Health class
 * Read more about Health (https://github.com/Infomaker/Dashboard-Plugin/wiki/Health)
*/

import { Health, GUI } from 'Dashboard'

export default class MyHealth extends Health {
	render() {
		return <GUI.Wrapper>
			<GUI.Paragraph text='My Health Status'/>
		</GUI.Wrapper>
	}
}