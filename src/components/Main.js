import {useState} from 'react'
import { Decks } from './Decks.js'
import FirstScreen from './FirstScreen.js'
import Header from './Header.js'
import Footer from './Footer.js'

const deck = Decks.hiragana
const newDeck = [...deck]
newDeck.sort(() => Math.random() - 0.5)

export default function Main() {
    const [finished, setFinished] = useState([])
    const [clear, setClear] = useState(0)
    const [restart, setRestart] = useState(false)
    const max = newDeck.length

    function attFinished(color) {
        setFinished([...finished, color])
        setClear(clear + 1)
    }
 
    return (
        restart ? <FirstScreen /> :
        <>
            <Header />
            <main style={{'marginBottom': `${clear === max ? 215 : 110}px`}}>
                {newDeck.map(
                    ({question, answer}, i) => 
                    <Question key={question} index={i + 1} question={question} answer={answer} 
                        attFinished={attFinished} />
                )}
            </main>
            <Footer array={finished} clear={clear} max={max} 
                setFinished={setFinished} setClear={setClear} setRestart={setRestart}/>
        </>
    )
}

function Question({question, answer, index, attFinished}) {
    const [show, setShow] = useState(false)
    const [flip, setFlip] = useState('')
    const [icon, setIcon] = useState('')

    function QuestionNumber() {
        return (
            <article className={`question icon-${icon}`}>
                <p>Question {index}</p>
                {icon === '' ? <ion-icon name="play-outline" onClick={() => setShow(true)}></ion-icon> : <Icon />}
            </article>
        )
    }

    function Card() {
        return (
            <article className="flip-card">
                <div className={`flip-card-inner ${flip}`}>
                    <div className="flip-card-front">
                        <p>{question}</p>
                        <ion-icon name="repeat-outline" onClick={() => setFlip('flip')}></ion-icon>
                    </div>
                    <div className="flip-card-back">
                        <p>{answer}</p>
                        <div>
                            <button className='red' onClick={() => returnQuestion('red')}>Didn't remembered</button>
                            <button className='yellow' onClick={() => returnQuestion('yellow')}>Almost didn't remembered</button>
                            <button className='green' onClick={() => returnQuestion('green')}>Zap!</button>
                        </div>
                    </div>
                </div>
            </article>
        )
    }

    function returnQuestion(color) {
        if (color === 'red') {
            setIcon('red')
            attFinished('red')
        } else if (color === "yellow") {
            setIcon('yellow')
            attFinished('yellow')
        } else {
            setIcon('green')
            attFinished('green')
        }
        setShow(false)
    }

    function Icon() {
        if (icon === 'red') {return (<ion-icon name="close-circle"></ion-icon>)}
        else if (icon === 'yellow') {return (<ion-icon name="help-circle"></ion-icon>)}
        else if (icon === 'green') {return (<ion-icon name="checkmark-circle"></ion-icon>)}
    }

    return (
        show ? <Card /> : <QuestionNumber />
    )
}
