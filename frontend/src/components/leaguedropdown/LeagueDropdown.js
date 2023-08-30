import { getAllLeagues } from '../../services/MatchService';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function LeagueDropdown() {
    const [leagues, setLeagues] = useState(null)
    const [chosenLeague, setChosenLeague] = useState(null)

    useEffect(() => {
        getAllLeagues().then((data) => {
            setLeagues(data)
        })
    }, []);

    const handleChange = (event) => {
        let item = event.target.value
        setChosenLeague(item)
    }

    if (chosenLeague) {
        let url = "/leagues/" + chosenLeague
        return (<Navigate to={url} />)
    }


    if (leagues) {
        let leagues_obj = []
        leagues.map((item) => {
            leagues_obj.push(
                <MenuItem value={item}>{item}</MenuItem>
            )
        })
        return (
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                <InputLabel id="selectLabel">Leagues</InputLabel>
                    <Select
                        labelId='selectLabel'
                        value={chosenLeague}
                        label="Leagues"
                        onChange={handleChange}
                    >
                        {
                            leagues_obj
                        }
                    </Select>
                </FormControl>
            </Box>
        )
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
            <InputLabel id="selectLabel">Leagues</InputLabel>
            <Select
                labelId='selectLabel'
                value="Select Option"
                label="Leagues"
            >
                <MenuItem value="Select Option">Select Option</MenuItem>
            </Select>
            </FormControl>
        </Box>
    )
}