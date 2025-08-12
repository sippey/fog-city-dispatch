import { DispatchCard } from '../types'
import Card from './Card'

interface CardListProps {
  cards: DispatchCard[]
}

function CardList({ cards }: CardListProps) {
  if (cards.length === 0) {
    return (
      <div className="no-results">
        <p>No cards match your current filters.</p>
      </div>
    )
  }

  return (
    <div className="card-list">
      {cards.map(card => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  )
}

export default CardList