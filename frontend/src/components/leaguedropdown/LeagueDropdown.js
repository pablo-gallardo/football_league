import { getAllLeagues } from '../../services/MatchService';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';


export default function LeagueDropdown() {
    const [leagues, setLeagues] = useState(null)
    const [chosenLeague, setChosenLeague] = useState(null)
    const navigate = useNavigate()

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
        let url = "/ui/leagues/" + chosenLeague;
        navigate(url);
    }


    if (leagues) {
        let leagues_obj = []
        leagues.map((item) => {
            leagues_obj.push(
                <MenuItem value={item}>{item}</MenuItem>
            )
        })
        return (
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
        )
    }

    return (
        <Skeleton animation="wave" variant="rectangular" height={60} />
    )
}