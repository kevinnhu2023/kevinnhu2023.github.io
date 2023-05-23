import './IndividualCard.css'

export default function IndividualCard({ card, handleChoice, cardFlipped, cardDisabled }) {

    const handleClick = () => {
        if(!cardDisabled) {
            handleChoice(card)
        }
    }

    return (
    <div className="card">
        <div className={cardFlipped ? "cardflipped" : ""}>
            <img className="front" src={card.src} alt="card front" />
            <img 
                className="back" 
                src="/img/car-icon.jpeg" 
                onClick={handleClick} 
                alt="card back" 
            />
        </div>
    </div>
    )
}