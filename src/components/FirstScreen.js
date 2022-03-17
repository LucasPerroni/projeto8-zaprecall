import {useState} from 'react'

export default function FirstScreen() {
    const [show, setShow] = useState(false)

    function Screen() {
        return (
            <div className="deck-selection">
                <div>
                    <img src="images/Logo.png" alt="ZapRecall logo"></img>
                    <h1>ZapRecall</h1>
                </div>
                <button onClick={() => setShow(true)}>Start Recall!!</button>
            </div>
        )
    }

    return (
        show ? <></> : Screen()
    )
}
