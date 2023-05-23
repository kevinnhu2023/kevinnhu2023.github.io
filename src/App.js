import { useEffect, useState } from 'react'
import './App.css'
import IndividualCard from './components/IndividualCard'

const cardImageArray = [
  { "src": "/img/artura-1.jpeg", matched: false },
  { "src": "/img/divo-1.jpeg", matched: false },
  { "src": "/img/f5-1.jpeg", matched: false },
  { "src": "/img/jesko-1.jpeg", matched: false },
  { "src": "/img/revuelto-1.jpeg", matched: false },
  { "src": "/img/sf90-1.jpeg", matched: false },
  { "src": "/img/spyder-1.jpeg", matched: false },
  { "src": "/img/utopia-1.jpeg", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [playerTurns, setTurns] = useState(0)
  const [playerChoiceOne, setChoiceOne] = useState(null)
  const [playerChoiceTwo, setChoiceTwo] = useState(null)
  const [cardDisabled, setDisabled] = useState(false)

  // shuffling the cards
  const shufflingCards = () => {
    const shufflingCards = [...cardImageArray, ...cardImageArray]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id : Math.random() }))
    
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shufflingCards)
      setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    playerChoiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (playerChoiceOne && playerChoiceTwo) {
      setDisabled(true)

      if (playerChoiceOne.src === playerChoiceTwo.src){
        setCards(previousCards => {
          return previousCards.map(card => {
            if (card.src === playerChoiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [playerChoiceOne, playerChoiceTwo])

  console.log(cards)

  // resets choices & increases turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // starting a new game automatically
  useEffect(() => {
    shufflingCards()
  }, [])

  return (
    <div className="App">
      <h1>HyperCar Matching Game</h1>
      <button onClick={shufflingCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <IndividualCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            cardFlipped={card === playerChoiceOne || card === playerChoiceTwo || card.matched}
            cardDisabled={cardDisabled}
          />
        ))}
      </div>
      <p>Turns Used: {playerTurns}</p>
    </div>
  );
}

export default App