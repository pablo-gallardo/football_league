import {
    FormControl,
    Button,
    Container,
    TextField
} from '@mui/material'
import { createLeague, createSchedule } from '../../services/MatchService'
import { MuiChipsInput } from 'mui-chips-input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LeagueForm() {
    const [values, setValues] = useState([]);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues(e);
    }

    const handleCreate = () => {
        createLeague(values, name, desc).then((data) =>{
            createSchedule(name).then((data) => {
                navigate('/ui')
            });
        });
    };

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleDescChange = (e) => {
        setDesc(e.target.value)
    }

    return (
        <Container>
            <FormControl>
                <TextField
                    value={name}
                    onChange={handleNameChange}
                    sx={{margin: '1em'}} 
                    variant="outlined" 
                    label='Name'
                />
                <TextField
                    value={desc}
                    onChange={handleDescChange}
                    sx={{margin: '1em'}} 
                    variant="outlined" 
                    label='Description'
                />
                <MuiChipsInput sx={{margin: '1em', display: 'flex'}} value={values} onChange={handleChange} label='Teams'/>
            </FormControl>
            <Button sx={{display: 'flex', marginTop: '1em'}} variant="outlined" onClick={handleCreate}>Create</Button>
        </Container>
    )
}