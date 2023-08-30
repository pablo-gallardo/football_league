import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../../styles/match/Match.css"

function Match({home, away, scores}) {
    if (scores["home"] === null) {
        scores["home"] = "TBD"
    }

    if (scores["away"] === null) {
        scores["away"] = "TBD"
    }

    return (
        <TableContainer className='match' component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Team</TableCell>
                        <TableCell align="right">Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        key="0"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">{home}</TableCell>
                        <TableCell align="right">{scores['home']}</TableCell>
                    </TableRow>
                    <TableRow
                        key="!"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">{away}</TableCell>
                        <TableCell align="right">{scores['away']}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Match