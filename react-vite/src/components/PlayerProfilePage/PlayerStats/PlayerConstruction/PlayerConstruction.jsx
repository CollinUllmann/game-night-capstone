// import Chart from 'chart.js/auto'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
// import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2"
import './PlayerConstruction.css'

export function PlayerConstruction() {
  const {userId} = useParams();

  const decksById = useSelector(state => state.decks)
  const userDecks = Object.values(decksById).filter(deck => deck.userId == userId)
  const cardsById = useSelector(state => state.cards)

  const barChartData = [
    {cmc: '0', count: 0},
    {cmc: '1', count: 0},
    {cmc: '2', count: 0},
    {cmc: '3', count: 0},
    {cmc: '4', count: 0},
    {cmc: '5', count: 0},
    {cmc: '6', count: 0},
    {cmc: '7+', count: 0},
  ]
  for (const deck of userDecks) {
    for (const card of deck.cards) {
      const cardObj = cardsById[card.cardId]
      if (!cardObj.typeLine.toLowerCase().includes('land')) {
        if (cardObj.cmc > 6) {
          barChartData[7].count++
        } else {
          barChartData[cardObj.cmc].count++
        }
      }
    }
  }

  const manaCurveOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Mana Curve Among All User Decks',
      },
    },
  };

  const labels = barChartData.map(row => row.cmc);

  const manaCurveData = {
    labels,
    datasets: [
      {
        label: 'Cards by Mana Value',
        data: barChartData.map(row => row.count),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ],
  };

  const typeDataObj = {
    'land': 0,
    'creature': 0,
    'instant': 0,
    'sorcery': 0,
    'artifact': 0,
    'enchantment': 0,
    'planeswalker': 0
  }
  for (const deck of userDecks) {
    for (const card of deck.cards) {
      const cardObj = cardsById[card.cardId]
      if (cardObj.typeLine.toLowerCase().includes('land')) {
        typeDataObj['land']++
      } else if (cardObj.typeLine.toLowerCase().includes('creature')) {
        typeDataObj['creature']++
      } else if (cardObj.typeLine.toLowerCase().includes('instant')) {
        typeDataObj['instant']++
      } else if (cardObj.typeLine.toLowerCase().includes('sorcery')) {
        typeDataObj['sorcery']++
      } else if (cardObj.typeLine.toLowerCase().includes('artifact')) {
        typeDataObj['artifact']++
      } else if (cardObj.typeLine.toLowerCase().includes('enchantment')) {
        typeDataObj['enchantment']++
      } else if (cardObj.typeLine.toLowerCase().includes('planeswalker')) {
        typeDataObj['planeswalker']++
      }
    }
  }

  const typeData = {
    labels: ['Land', 'Creature', 'Instant', 'Sorcery', 'Artifact', 'Enchantment', 'Planeswalker'],
    // legend: { position: 'right', labels: ['Land', 'Creature', 'Instant', 'Sorcery', 'Artifact', 'Enchantment', 'Planeswalker'] },
    datasets: [
      {
        label: '# of cards',
        data: [typeDataObj['land'], typeDataObj['creature'], typeDataObj['instant'], typeDataObj['sorcery'], typeDataObj['artifact'], typeDataObj['enchantment'], typeDataObj['planeswalker']],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      }
    ]
  }

  const colorDataObj = {
    'white': 0,
    'blue': 0,
    'black': 0,
    'red': 0,
    'green': 0
  }
  for (const deck of userDecks) {
    for (const card of deck.cards) {
      const cardObj = cardsById[card.cardId]
      const cardColors = cardObj.colors.split('')
      for (const color of cardColors) {
        if (color == 'W') {
          colorDataObj['white']++
        } else if (color == 'U') {
          colorDataObj['blue']++
        } else if (color == 'B') {
          colorDataObj['black']++
        } else if (color == 'R') {
          colorDataObj['red']++
        } else if (color == 'G') {
          colorDataObj['green']++
        }
      }
    }
  }
  
  const colorData = {
    labels: ['White', 'Blue', 'Black', 'Red', 'Green'],
    datasets: [
      {
        label: '# of cards',
        data: [colorDataObj['white'], colorDataObj['blue'], colorDataObj['black'], colorDataObj['red'], colorDataObj['green']],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      }
    ]
  }

  const typeOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position:'right'
      },
      title: {
        display: true,
        text: 'Type Breakdown',
        position: 'top'
      }
    }
  }

  const colorOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position:'right'
      },
      title: {
        display: true,
        text: 'Color Breakdown',
        position: 'top'
      }
    }
  }

  return (
    <div className='deck-construction-content-div'>
      <div className='deck-construction-type-pie-chart-div'>
        <div className='deck-construction-test'>
          <Pie data={typeData} options={typeOptions} />
        </div>
        <div className='deck-construction-test'>
          <Pie data={colorData} options={colorOptions} />
        </div>
      </div>
      <div className='deck-construction-mana-curve-chart-div'>
        <Bar options={manaCurveOptions} data={manaCurveData} />
      </div>
    </div>
  )
}



// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Bar Chart',
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => 5),
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => 5),
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// return (
//   <Bar options={options} data={data} />
// );