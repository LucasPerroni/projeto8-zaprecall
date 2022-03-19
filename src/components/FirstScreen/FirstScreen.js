import './style.css'
import {useState} from 'react'
import { Decks } from '../Decks'
import Main from '../Main/Main'
import Logo from '../../assets/Logo.png'

export default function FirstScreen() {
    const [show, setShow] = useState(false)
    const [valid, setValid] = useState(true)
    const [input, setInput] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [finalDeck, setFinalDeck] = useState([])
    let decksName = Object.keys(Decks)
    let decksArray = Object.values(Decks)

    function Screen() { 
        let validateInput = input > finalDeck.length || input <= 0 || !parseInt(input) || parseInt(input) > parseInt(cardNumber)
        let validateCardNumber = cardNumber > finalDeck.length || cardNumber <= 0 || !parseInt(cardNumber)

        function changeDeck(index) {
            let deckIndex = index.target.value
            setFinalDeck(decksArray[deckIndex])
        }
        
        function validate() {
            if (validateInput || validateCardNumber) {
                setValid(false)
            } else {
                finalDeck.sort(() => Math.random() - 0.5)
                setValid(true)
                setShow(true)
            }
        }

        return (
            <div className="deck-selection">
                <div className='logo'>
                    <img src={Logo} alt="ZapRecall logo"></img>
                    <h1>ZapRecall</h1>
                </div>
                <Select changeDeck={changeDeck} decksName={decksName} decksArray={decksArray} 
                cardNumber={cardNumber} setCardNumber={setCardNumber}/>
                <input placeholder='Input your Zap goal...' value={input} onInput={e => setInput(e.target.value)}></input>
                <button onClick={validate}>Start Recall!!</button>
                {!valid ? <p>Enter a valid card number/goal</p> : <></>}
            </div>
        )
    }

    return (
        show ? <Main input={input} deck={finalDeck.slice(0, cardNumber)} /> : Screen()
    )
}

function Select({changeDeck, decksName, decksArray, cardNumber, setCardNumber}) {
    return (
        <div className='choose-deck'>
            <select onChange={option => changeDeck(option)}>
                <option value="" hidden>Choose your deck...</option>
                {decksName.map(
                    (deck, i) => 
                    <option key={deck} value={i}>
                        {deck[0].toUpperCase() + deck.slice(1)}, {decksArray[i].length} cards
                    </option>
                )}
            </select>
            <input placeholder='Number of cards...' value={cardNumber} onInput={e => setCardNumber(e.target.value)}></input>
        </div>
    )
}
