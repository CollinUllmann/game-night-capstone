export function ManaSymbol({ symbol }) {
  return <img style={{ width: 20 }} src={`/card-symbols/${symbol.replace('{', '').replace('}', '')}.svg`}/>
}
