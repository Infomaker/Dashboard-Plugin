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

((Dashboard, React) => {
	/**
	 * Create an Application by extending the Application class
	 * Read more about Application (https://github.com/Infomaker/Dashboard-Plugin/wiki/Application)
	*/
	class Application extends Dashboard.Application {
		constructor(props) {
			super(props)

			this.state = {
				config: props.config
			}
		}

		render() {
			// Get the GUI Library from Dashboard.GUI (https://github.com/Infomaker/Dashboard-Plugin/wiki/GUI-Library)
			const GUI = Dashboard.GUI

			return (
				// Use @plugin_bundle_class and the bundle in the manifest will be used as your class
				<GUI.Wrapper className="@plugin_bundle_class">
					<GUI.Title text={this.state.config.pluginTitle || "hello world"}/>

					<GUI.Button text="Open a modal" size="large" onClick={() => this.openModal(Modal)} />
				</GUI.Wrapper>
			)
		}
	}

	/**
	 * Create an Modal by extending the Modal class
	 * Read more about Modal (https://github.com/Infomaker/Dashboard-Plugin/wiki/Modal)
	*/
	class Modal extends Dashboard.Modal {
		componentWillMount() {

			// Call setTitle to set the component most upper title.
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
	 * Read more about Widget (https://github.com/Infomaker/Dashboard-Plugin/wiki/Widget)
	*/
	class Widget extends Dashboard.Widget {
		render() {
			const GUI = Dashboard.GUI

			return <GUI.WidgetButton text="Dashboard Plugin Widget" onClick={() => window.open("https://www.google.se/?gws_rd=ssl#q=hello+world")}/>
		}
	}

	/**
	 * Create an Agent by extending the Agent class
	 * Read more about Agent (https://github.com/Infomaker/Dashboard-Plugin/wiki/Agent)
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

	/**
	 * Create settings for you plugin by extending the Dashboard.Settings component
	*/
	class Settings extends Dashboard.Settings {
		// Plugin settings will be displayed in the store. These settings will be available for Agent, Widget and Application.
		plugin() {
			return <Dashboard.GUI.ConfigInput ref="pluginTitle" />
		}

		// Application settings will be displayed in application settings mode. These settings will only be available for the application.
		application() {
			return <Dashboard.GUI.ConfigInput ref="pluginTitle" />
		}
	}

	/**
	 * Register your plugin in the Dashboard.
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
