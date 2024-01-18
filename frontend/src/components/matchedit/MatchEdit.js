import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { getMatchByDay, updateMatches } from '../../services/MatchService';
import { TextField } from '@mui/material';
import { useState } from 'react';

export default function MatchEdit({ onClose,
                                    onSave,
                                    open,
                                    home,
                                    away,
                                    homeGoals,
                                    awayGoals,
                                    index,
                                    league,
                                    day,
                                    reload
                                }) {
    const [newHomeGoals, setNewHomeGoals] = useState(homeGoals)
    const [newAwayGoals, setNewAwayGoals] = useState(awayGoals)
    
    const handleClose = () => {
        setNewAwayGoals(awayGoals)
        setNewHomeGoals(homeGoals)
        onClose()
    }

    const handleReload = () => {
        reload()
    }

    const onAwayGoalChange = (e) => {
        setNewAwayGoals(e.target.value)
    }

    const onHomeGoalChange = (e) => {
        setNewHomeGoals(e.target.value)
    }

    function handleSave() {
        getMatchByDay(league, day).then((data) => {
            let template = {
                "away": away,
                "day": day,
                "home": home,
                "scores": {
                    "away": newAwayGoals,
                    "home": newHomeGoals
                }
            }

            data[day][index] = template
            const id = data["_id"]
            delete data["_id"]
            let value = data

            let body = {
                value,
                "match_updated": index
            }


            updateMatches(body, id, league).then((data) => {
                console.log(data)
                handleReload()
            })

        })
        onSave(newHomeGoals, newAwayGoals)
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{home} vs {away}</DialogTitle>
            <DialogContent>
                <TableContainer className='match' component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                            <TableRow
                                key="0"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                >
                                <TableCell component="th" sx={{overflow: 'auto'}} scope="row">
                                    <Typography>{home}</Typography>
                                </TableCell>
                                <TableCell sx={{overflow: 'auto'}} align="right">
                                    <TextField sx={{maxWidth: 60}} onChange={onHomeGoalChange} value={newHomeGoals} placeholder={homeGoals} />
                                </TableCell>
                            </TableRow>
                        <TableRow
                            key="1"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, overflow: 'auto' }}
                            >
                                <TableCell component="th" sx={{overflow: 'auto'}} scope="row">
                                    <Typography>{away}</Typography>
                                </TableCell>
                                <TableCell sx={{overflow: 'auto'}} align="right">
                                    <TextField sx={{maxWidth: 60}} onChange={onAwayGoalChange} value={newAwayGoals} placeholder={awayGoals} />
                                </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
        </Dialog>
    )
}