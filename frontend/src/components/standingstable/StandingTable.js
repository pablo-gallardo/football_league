import { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getStandingTable } from '../../services/MatchService'
import '../../styles/standingtable/StandingTable.css'

function StandingsTable({ league }) {
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

    useEffect(() => {
      getStandingTable(league).then((data) => {
        setStanding(sortTable(data))
      })
    }, []);

    if (standings) {
      let standingsRows = []
      standings.map((item, index) => {
        standingsRows.push(
          <TableRow key={index}>
            <TableCell align="left">{item['Team']}</TableCell>
            <TableCell align="right">{item['MP']}</TableCell>
            <TableCell align="right">{item['W']}</TableCell>
            <TableCell align="right">{item['D']}</TableCell>
            <TableCell align="right">{item['L']}</TableCell>
            <TableCell align="right">{item['GF']}</TableCell>
            <TableCell align="right">{item['GA']}</TableCell>
            <TableCell align="right">{item['GD']}</TableCell>
            <TableCell align="right">{item['PTS']}</TableCell>
        </TableRow>
        )
      })

      return (
        <div className='standings'>
          <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">MP</TableCell>
                      <TableCell align="right">W</TableCell>
                      <TableCell align="right">D</TableCell>
                      <TableCell align="right">L</TableCell>
                      <TableCell align="right">GF</TableCell>
                      <TableCell align="right">GA</TableCell>
                      <TableCell align="right">GD</TableCell>
                      <TableCell align="right">PTS</TableCell>
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
    } else { return <div>No Data</div> }
  }

  export default StandingsTable;