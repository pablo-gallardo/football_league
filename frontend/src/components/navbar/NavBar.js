import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LeagueDropdown from '../leaguedropdown/LeagueDropdown';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

export default function ButtonAppBar() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/ui/create')
    }

    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>
            <Button color="inherit" onClick={handleClick}>Create league</Button>
            <Container>
            <LeagueDropdown/>
            </Container>
        </Toolbar>
        </AppBar>
    </Box>
    );
}