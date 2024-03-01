import './CardTile.css'

export function CardTile({ card }) {


  return (
    <div className="card-tile-div">
      <div className="card-tile-image-div" style={{backgroundImage: `url(${card.imageUrl})`, backgroundPositionX: '50%', backgroundPositionY: '25%', }}>
      </div>
      <div className="card-tile-name-manacost-div">
        <p className="card-tile-name">{card.name}</p>
        <p className="card-tile-manacost">{card.manaCost}</p>
      </div>
      <div className="card-tile-count-div">
        <p className="card-tile-count">1</p>
      </div>
    </div>
  )
}