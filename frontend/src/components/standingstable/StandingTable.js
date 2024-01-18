import { useState, useEffect } from 'react'
import { getStandingTable } from '../../services/MatchService'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import '../../styles/standingtable/StandingTable.css'

function StandingsTable({ league, reloadStandings, onReload }) {
    const [standings, setStanding] = useState(null)

    function compareStandings(a, b) {
      if (a['PTS'] > b['PTS']) {
        return -1
      } else if (a['PTS'] < b['PTS']) {
        return 1
      } else {
        if (a['GD'] > b['GD']) {
          return -1
          } else if (a['GD'] < b['GD']) {
            return 1
          } else {
            if (a['GF'] > b['GF']) {
              return -1
            } else if (a['GF'] < b['GF']) {
              return 1
            } else {
              if (a['GA'] > b['GA']) {
                return 1
              } else {
                return -1
              }
            }
          }
      }
    }

    function sortTable(item) {
      let table = []
      for (const key in item) {
        if (key === '_id') { continue }
        table.push(item[key])
      }
      let sortedTable = [...table].sort((a, b) => (
        compareStandings(a, b)
      ));
      return sortedTable
    }

    if (reloadStandings) {
      getStandingTable(league).then((data) => {
        setStanding(sortTable(data))
      })
      onReload()
    }

    useEffect(() => {
      getStandingTable(league).then((data) => {
        setStanding(sortTable(data))
      })
    }, []);

    if (standings) {
      const standingsRowsKeys = ['Team', 'MP', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'PTS']
      let standingsRows = []
      let standingsHeaders = []
      standings.map((item, index) => {
        let tableCells = []
        standingsRowsKeys.map((key) => {
          tableCells.push(<TableCell align="left">{item[key]}</TableCell>)
        })
        standingsRows.push(
          <TableRow key={index}>
            {tableCells}
          </TableRow>
        )
      })
      standingsRowsKeys.map((key) => {
        if (key !== 'Team') {
          standingsHeaders.push(
            <TableCell align="left">{key}</TableCell>
          )
        } else {
          standingsHeaders.push(
            <TableCell></TableCell>
          )
        }
      })


      return (
        <div className='standings'>
          <TableContainer component={Paper}>
                <Table sx={{ overflow: 'auto' }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {
                        standingsHeaders
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      standingsRows
                    }
                  </TableBody>
                </Table>
              </TableContainer>
        </div>
      );
    }
    
    return <Skeleton animation="wave" variant="rectangular" height={260} />
  }

  export default StandingsTable;