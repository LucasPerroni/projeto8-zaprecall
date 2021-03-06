import './style.css'

export default function Footer({array, clear, max, input, setFinished, setClear, setRestart}) {

    function restartRecall() {
        setRestart(true)
        setFinished([])
        setClear(0)
    }

    return (
        <footer style={{'height': `${max === clear ? 190 : 75}px`}}>
            {max === clear ? <Clear array={array} input={input} /> : <p>{clear}/{max} CLEARED</p>}
            <div>
                {array.map(
                    (color, i) => <Icons key={`${color} - ${i}`} color={color}/> 
                )}
            </div>
            {max === clear ? <button onClick={restartRecall}>RESTART RECALL</button> : <></>}
        </footer>
    )
}

function Clear({array, input}) {
    let counter = 0
    array.forEach(color => color === 'green' ? counter++ : <></>)

    if (counter >= input) {
        return (
            <>
                <h1>&#x1F973; YEYYY</h1>
                <p className="clear-p">You reached your goal!</p>
            </>
        )
    } else {
        return (
            <>
                <h1>&#x1F625; WELP</h1>
                <p className="clear-p">Don't give up. You can do it!</p>
            </>
        )
    }
}

function Icons({color}) {
    if (color === 'red') {
        return (<ion-icon name="close-circle" style={{'color': '#FF3030'}}></ion-icon>)
    } else if (color === 'yellow') {
        return (<ion-icon name="help-circle" style={{'color': '#FF922E'}}></ion-icon>)
    } else if (color === 'green') {
        return (<ion-icon name="checkmark-circle" style={{'color': '#2FBE34'}}></ion-icon>)
    }
}
