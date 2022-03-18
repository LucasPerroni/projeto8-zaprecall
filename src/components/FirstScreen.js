import {useState} from 'react'
import Main from './Main'
import { Decks } from './Decks'

export default function FirstScreen() {
    const [show, setShow] = useState(false)
    const [valid, setValid] = useState(true)
    const [input, setInput] = useState('')

    function Screen() { 
        function validate() {
            if (parseInt(input) > Decks.hiragana.length || parseInt(input) <= 0 || !parseInt(input)) {
                setValid(false)
            } else {
                setValid(true)
                setShow(true)
            }
        }

        return (
            <div className="deck-selection">
                <div>
                    <img src="images/Logo.png" alt="ZapRecall logo"></img>
                    <h1>ZapRecall</h1>
                </div>
                <input placeholder='Input your Zap goal...' value={input} onInput={e => setInput(e.target.value)}></input>
                <button onClick={validate}>Start Recall!!</button>
                {!valid ? <p>Enter a valid goal</p> : <></>}
            </div>
        )
    }

    return (
        show ? <Main input={input} /> : Screen()
    )
}
