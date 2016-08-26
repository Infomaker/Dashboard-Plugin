/**
 * Hello world plugin for Infomaker Dashboard.
*/
((Dashboard, React) => {
	/**
	 * Create an Application by extending Application class from Dashboard
	 * This application will render a paragraph with the text hello world!
	*/
	class HelloWorldApplication extends Dashboard.Application {
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
				<div className="se-infomaker-hello-world">
					<Title text="Hello World"/>
					<Menu/>
				</div>
			)
		}
	}

	/**
	 * Create an Widget by extending Widget class from Dashboard
	 * This widget will render a button from the Dashboard GUI library
	*/
	class HelloWorldWidget extends Dashboard.Widget {
		render() {
			const Button = Dashboard.components().GUI.Button

			return <Button text="Hello World Widget" click={() => window.open("https://www.google.se/?gws_rd=ssl#q=hello+world")}/>
		}
	}

	/**
	 * Create an Agent by extending Agent class from Dashboard
	 * This agent will do a poll each second.
	*/
	class HelloWorldAgent extends Dashboard.Agent {
		constructor() {
			super()

			this.poll()
		}

		/**
		 * This is a example of a super simple agent. Your agent should do something cooler and hopfully more meaningful than this :)
		*/
		poll() {
			this.interval = window.setInterval(() => {

			}, 1000)
		}
	}

	/**
	 * Register your plugin
	 * The plugin have to declare an application, widget or agent class.
	*/
	Dashboard.register({
		id: "se.infomaker.HelloWorld",
		name: "Hello World",
		author: "Infomaker Scandinavia AB",
		version: 1.0,
		application: HelloWorldApplication,
		widget: HelloWorldWidget,
		agent: HelloWorldAgent
	})

})(Dashboard, React)
