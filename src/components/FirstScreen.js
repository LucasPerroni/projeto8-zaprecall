import {useState} from 'react'
import Main from './Main'
import { Decks } from './Decks'

export default function FirstScreen() {
    const [show, setShow] = useState(false)
    const [valid, setValid] = useState(true)
    const [input, setInput] = useState('')
    const [finalDeck, setFinalDeck] = useState([])
    let decksName = Object.keys(Decks)
    let decksArray = Object.values(Decks)

    function Screen() { 
        function changeDeck(index) {
            let deckIndex = index.target.value
            setFinalDeck(decksArray[deckIndex])
        }
        
        function validate() {
            if (parseInt(input) > finalDeck.length || parseInt(input) <= 0 || !parseInt(input)) {
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
                <Select changeDeck={changeDeck} decksName={decksName} decksArray={decksArray} />
                <input placeholder='Input your Zap goal...' value={input} onInput={e => setInput(e.target.value)}></input>
                <button onClick={validate}>Start Recall!!</button>
                {!valid ? <p>Enter a valid goal</p> : <></>}
            </div>
        )
    }

    return (
        show ? <Main input={input} deck={finalDeck.sort(() => Math.random() - 0.5)} /> : Screen()
    )
}

function Select({changeDeck, decksName, decksArray}) {
    return (
        <select onChange={option => changeDeck(option)}>
            <option value="" hidden>Choose your deck...</option>
            {decksName.map(
                (deck, i) => 
                <option key={deck} value={i}>
                    {deck[0].toUpperCase() + deck.slice(1)}, {decksArray[i].length} cards
                </option>
            )}
        </select>
    )
}
