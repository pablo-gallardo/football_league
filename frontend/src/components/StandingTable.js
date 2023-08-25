import { useState, useEffect } from 'react'

function StandingsTable() {
    const [standings, setStanding] = useState([])
    const [showTable, setShowTable] = useState(false)
    useEffect(() => {
      fetch('http://localhost:5001/api/league/liga_a/standings')
        .then((response) => response.json())
        .then((item) => {
          let data = []
          for (let key in item) {
            if (key === '_id') { continue }
            let value = item[key]
            data.push(value)
          } 
          setStanding(data)
          setShowTable(!showTable)
      })
        .catch((err) => {
          console.log(err.message)
        });
    }, []);

    if (showTable) {
        let headings = Object.keys(standings[0])
        return (
            <table>
                <thead>
                    <tr>
                      {
                        headings.map(heading => {
                            return <th key={heading}>{heading}</th>
                        })
                      }
                    </tr>
                </thead>
                <tbody>
                  {
                    standings.map((row, index) => {
                      return <tr key={index}>
                        {headings.map((key, index) => {
                          return <td key={row[key]}>{row[key]}</td>
                        })}
                      </tr>
                    })
                  }
                </tbody>
            </table>
          )
    } else { return <div>No Data</div> }
  }

  export default StandingsTable;