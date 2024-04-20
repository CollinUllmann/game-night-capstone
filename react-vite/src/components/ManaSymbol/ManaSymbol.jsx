export function ManaSymbol({ symbol }) {
  return <img style={{ width: 13 }} src={`/card-symbols/${symbol.replace('{', '').replace('}', '')}.svg`}/>
}
