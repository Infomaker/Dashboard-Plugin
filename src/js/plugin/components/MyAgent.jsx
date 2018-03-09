/**
 * Create an Agent by extending the Agent class
 * Read more about Agent (https://github.com/Infomaker/Dashboard-Plugin/wiki/Agent)
*/

import { Agent } from 'Dashboard'

export default class MyAgent extends Agent {
	constructor() {
		super()

		this.connect()
	}

	/**
	 * This is a example of a super simple agent. Your agent should do something more meaningful than this 😎
	*/
	connect() {
		console.log("Beep beep, agent is connected...")
	}
}