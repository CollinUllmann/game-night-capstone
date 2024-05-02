import { ManaSymbol } from '../../ManaSymbol/ManaSymbol'
import './CardTile.css'

export function CardTile({ card, count }) {


  let key = 0;
  return (
    <div>
      <div className="card-tile-div">
        <div style={{margin:'0 5px'}}>
          <div className="card-tile-image-div" style={{backgroundImage: `url(${card.imageUrl})`, backgroundPositionX: '50%', backgroundPositionY: '25%', }}>

        </div>
        </div>
        <div className="card-tile-name-manacost-div">
          <p className="card-tile-name">{card.name}</p>
          <p className="card-tile-manacost">{card.manaCost.length > 0 ? card.manaCost.split('}{').map(symbol => symbol.replace('{', '').replace('}', '')).map(symbol => `{${symbol}}`).map(symbol => <ManaSymbol key={key++} symbol={symbol}></ManaSymbol>) : null}</p>
        </div>
        <div className="card-tile-count-div">
          <p className="card-tile-count">{count}</p>
        </div>
      </div>
      <div className='decklistCardPreview decklistPreviewActive' style={{backgroundImage: `url(${card.imageUrl})`, backgroundSize: 'cover'}}>
      </div>
    </div>
  )
}