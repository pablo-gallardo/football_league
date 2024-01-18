import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import MatchEdit from '../matchedit/MatchEdit';
import "../../styles/match/Match.css"

function Match({home, away, scores, index, league, day, reloadStanding}) {
    const [homeGoals, setHomeGoals] = useState(scores['home'])
    const [awayGoals, setAwayGoals] = useState(scores['away'])
    const [open, setOpen] = useState(false)

    const handleClickEdit = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
      };

    const handleSave = (home, away) => {
        setOpen(false);
        setHomeGoals(home)
        setAwayGoals(away)
    }

    const handleReload = () => {
        reloadStanding()
    }

    return (
        <Box sx={{margin: 1, overflow: 'auto'}}>
        <TableContainer className='match' component={Paper}>
            <Table sx={{ overflow: 'auto' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right">Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow
                            key="0"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                            >
                            <TableCell component="th" sx={{overflow: 'auto'}} scope="row">{home}</TableCell>
                            <TableCell sx={{overflow: 'auto'}} align="right">{homeGoals}</TableCell>
                        </TableRow>
                    <TableRow
                        key="1"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, overflow: 'auto' }}
                        >
                        <TableCell component="th" sx={{overflow: 'auto'}} scope="row">{away}</TableCell>
                        <TableCell sx={{overflow: 'auto'}} align="right">{awayGoals}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <Button variant="outlined" onClick={handleClickEdit}>Edit</Button>
        <MatchEdit
            onClose={handleClose}
            onSave={handleSave}
            open={open}
            home={home}
            away={away}
            homeGoals={homeGoals}
            awayGoals={awayGoals}
            index={index}
            league={league}
            day={day}
            reload={handleReload}
        />
        </Box>
    )
}

export default Match