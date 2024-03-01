export function ManaSymbol({ symbol }) {
  console.log(symbol)
  return <img style={{ width: 20 }} src={`/card-symbols/${symbol.replace('{', '').replace('}', '')}.svg`}/>
}
