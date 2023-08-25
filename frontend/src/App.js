import { useState, useEffect } from 'react'
import StandingsTable from './components/StandingTable'
import Match from './components/match/Match';
import './App.css';



function App() {
  const [matches, setMatches] = useState([])
  const [showMatches, setShowMatches] = useState(false)

  useEffect(() => {
      fetch('http://localhost:5001/api/league/liga_a/match')
        .then((response) => response.json())
        .then((item) => {
          let data = []
          for (let key in item) {
            if (key === '_id') { continue }
            let value = item[key]
            data.push(value)
          } 
          setMatches(data)
          setShowMatches(true)
      })
        .catch((err) => {
          console.log(err.message)
        });
    }, []);

  if (showMatches) {
    // console.log(matches)
    let matches_obj = []
    matches.map((item) => {
      item.map((match) => {
        console.log(match["scores"])
        matches_obj.push(<Match home={match["home"]} away={match["away"]} day={match["day"]} scores={match["scores"]} />)
      })
    })
    return (
      <div className="container">
        <StandingsTable />
        {matches_obj}
      </div>
    )
  }

  return (
    <div className="container">
      <StandingsTable />
    </div>
  )
}

export default App;
