import './style.css'
import Logo from '../../assets/Logo.png'

export default function Header() {
    return (
        <header>
            <img src={Logo} alt="ZapRecall Logo"/>
            <h1>ZapRecall</h1>
        </header>
    )
}
