/*
|--------------------------------------------------------------------------
| Index.jsx
|--------------------------------------------------------------------------
|
| Welcome to your plugin. Your plugin can have an agent, widget and a application.
| All of this is accesible through the Dashboard object.
| Please write some awesome code!
|
*/

((Dashboard, React) => {
	/**
	 * Create an Application by extending Application class from Dashboard
	 * This application will render a paragraph with the text hello world!
	*/
	class Application extends Dashboard.Application {
		constructor(props) {
			super(props)

			// Get components from Dashboard
			this.components = Dashboard.components()

			// State will be updated with user config
			this.state = {
				config: props.config
			}
		}

		render() {
			const { Title, Menu } = this.components.GUI

			return (
				<div className="se-infomaker-dashboard-plugin">
					<Title text="Hello World"/>
				</div>
			)
		}
	}

	/**
	 * Create an Widget by extending Widget class from Dashboard
	 * This widget will render a button from the Dashboard GUI library
	*/
	class Widget extends Dashboard.Widget {
		render() {
			const Button = Dashboard.components().GUI.Button

			return <Button text="Dashboard Plugin Widget" click={() => window.open("https://www.google.se/?gws_rd=ssl#q=hello+world")}/>
		}
	}

	/**
	 * Create an Agent by extending Agent class from Dashboard
	 * This agent will do a "poll" each second.
	*/
	class Agent extends Dashboard.Agent {
		constructor() {
			super()

			this.poll()
		}

		/**
		 * This is a example of a super simple agent. Your agent should do something cooler and hopfully more meaningful than this :)
		*/
		poll() {
			this.interval = window.setInterval(() => {
				console.log("poll")
			}, 1000)
		}
	}

	/**
	 * Register your plugin
	*/
	Dashboard.register({
		// Leave this be and it will fetch the data from your manifest file (./manifest.json) in the build steps
		id: "@plugin_id",
		name: "@plugin_name",
		author: "@plugin_author",
		version: "@plugin_version",

		// Only of of these are actually required. If you are developing a widget, just remove the application and agent properties.
		application: Application,
		widget: Widget,
		agent: Agent
	})

})(Dashboard, React)
