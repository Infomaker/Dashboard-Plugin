/*
|--------------------------------------------------------------------------
| Index.jsx
|--------------------------------------------------------------------------
|
| Welcome to your plugin. Your plugin can have an agent, widget and a application.
| Documentation can be found at https://github.com/Infomaker/Dashboard-Plugin/wiki.
|
*/

((Dashboard, React) => {
	/**
	 * Create an Application by extending the Application class
	*/
	class Application extends Dashboard.Application {
		constructor(props) {
			super(props)

			this.state = {
				config: props.config
			}
		}

		render() {
			const GUI = Dashboard.GUI

			return (
				<GUI.Wrapper className="se-infomaker-dashboard-plugin">
					<GUI.Title text={this.state.config.pluginTitle || "hello world"}/>

					<GUI.Button text="Open a modal" size="large" onClick={() => this.openModal(Modal)} />
				</GUI.Wrapper>
			)
		}
	}

	/**
	 * Create an Modal by extending the Modal class
	*/
	class Modal extends Dashboard.Modal {
		componentWillMount() {
			this.props.setTitle("My Modal")
		}

		render() {
			const GUI = Dashboard.GUI
			const treasures = ["🐢", "🦂", "👑", "🐌", "💍"]

			return (
				<GUI.Section title="You found a modal">
					<GUI.Paragraph text={"You opened it and got " + (Math.floor(Math.random() * 5) + 1) + " gems and a " + treasures[Math.floor(Math.random() * treasures.length)]} />
				</GUI.Section>
			)
		}
	}

	/**
	 * Create a Widget by extending the Widget class
	*/
	class Widget extends Dashboard.Widget {
		render() {
			const GUI = Dashboard.GUI

			return <GUI.Button text="Dashboard Plugin Widget" onClick={() => window.open("https://www.google.se/?gws_rd=ssl#q=hello+world")}/>
		}
	}

	/**
	 * Create an Agent by extending the Agent class
	*/
	class Agent extends Dashboard.Agent {
		constructor() {
			super()

			this.connect()
		}

		/**
		 * This is a example of a super simple agent. Your agent should do something more meaningful than this :)
		*/
		connect() {
			console.log("Beep beep, agent is connected...")
		}
	}

	class Settings extends Dashboard.Settings {
		application() {
			return <Dashboard.GUI.ConfigInput ref="pluginTitle" />
		}
	}

	/**
	 * Register your plugin
	*/
	Dashboard.register({
		// Leave this be and it will fetch the data from your manifest file in the build steps
		bundle: "@plugin_bundle",
		// Only of of these are actually required. If you are developing a widget, just remove the application and agent.
		application: Application,
		widget: Widget,
		agent: Agent,

		// Settings is optional.
		settings: Settings
	})

})(window.Dashboard, window.React)
