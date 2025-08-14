import { DispatchCard } from '@/types'
import Card from './Card'

interface CardListProps {
  cards: DispatchCard[]
}

export default function CardList({ cards }: CardListProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-16 text-gray-600 text-lg font-medium">
        <p>No cards match your current filters.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-5">
      {cards.map(card => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  )
}