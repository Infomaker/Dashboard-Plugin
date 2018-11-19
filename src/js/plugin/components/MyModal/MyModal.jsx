import { Modal, GUI } from "Dashboard";

/**
 * Create an Modal by extending the Modal class
 * Read more about Modal (https://github.com/Infomaker/Dashboard-Plugin/wiki/Modal)
 */
class MyModal extends Modal {
    componentDidMount() {
        // Call setTitle to set the component most upper title.
        this.props.setModalTitle("My Modal")
    }

    render() {
        const treasures = ["🐢", "🦂", "👑", "🐌", "💍"]

        return (
                <GUI.Section title="You found a modal">
                    <GUI.Paragraph
                        text={
                            "You opened it and got " +
                            (Math.floor(Math.random() * 5) + 1) +
                            " gems and a " +
                            treasures[Math.floor(Math.random() * treasures.length)]
                        }
                    />
                </GUI.Section>

        )
    }
}

export default MyModal