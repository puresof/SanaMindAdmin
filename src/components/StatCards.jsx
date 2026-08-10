import './StatCards.css'

function StatCards({ cards }) {
  return (
    <div className="stat-cards">
      {cards.map((card) => (
        <div key={card.label} className="stat-card">
          <span className="stat-card-label">{card.label}</span>
          <span className="stat-card-value">{card.value}</span>
          {card.hint && <span className="stat-card-hint">{card.hint}</span>}
        </div>
      ))}
    </div>
  )
}

export default StatCards
