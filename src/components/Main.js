import {useState} from 'react'

const deck = [
    {question: "Test 1", answer: "Answer 1"},
    {question: "Test 2", answer: "Answer 2"},
    {question: "Test 3", answer: "Answer 3"},
    {question: "Test 4", answer: "Answer 4"}, 
    {question: "Test 5", answer: "Answer 5"}, 
    {question: "Test 6", answer: "Answer 6"}, 
    {question: "Test 7", answer: "Answer 7"}, 
    {question: "Test 8", answer: "Answer 8"}, 
    {question: "Test 9", answer: "Answer 9"}, 
    {question: "Test 10", answer: "Answer 10"}
]

export default function Main() {
    const newDeck = [...deck]
    newDeck.sort(() => Math.random() - 0.5)

    return (
        <main>
            {newDeck.map(
                ({question, answer}, i) => 
                <Question key={question} index={i + 1} question={question} answer={answer} />
            )}
        </main>
    )
}

function Question({question, answer, index}) {
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
        } else if (color === "yellow") {
            setIcon('yellow')
        } else {
            setIcon('green')
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
