import './custom-card.scss'

export default function Card({ children, onClick }) {
  return (
    <div className="custom-card" onClick={onClick}>
      {children}
    </div>
  )
}
