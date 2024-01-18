import axios from 'axios';

const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT ?  process.env.REACT_APP_BACKEND_PORT : '5001';
const API_URL = process.env.REACT_APP_API_URL ?  process.env.REACT_APP_API_URL : 'http://localhost';
const baseUrl = `${API_URL}:${BACKEND_PORT}`

export async function getStandingTable(league) {
    try {
        const { data } = await axios.get(baseUrl + `/api/league/${league}/standings`);
        return data
    } catch(error) {
        console.log(error)
    }
}

export async function getMatches(league) {
    try {
        const { data } = await axios.get(baseUrl + `/api/league/${league}/match`);
        return data
    } catch(error) {
        console.log(error)
    }
}

export async function getMatchByDay(league, day) {
    try {
        const { data } = await axios.get(baseUrl + `/api/league/${league}/match`, { params: {day: day}});
        return data
    } catch(error) {
        console.log(error)
    }
}

export async function getAllLeagues() {
    try {
        const { data } = await axios.get(baseUrl + '/api/league/all')
        return data
    } catch(error) {
        console.log(error)
    }
}

export async function updateMatches(body, id, league) {
    try {
        const { data } = await axios.put(baseUrl + `/api/league/${league}/match/${id}`, body)
        return data
    } catch(error) {
        console.log(error)
    }
}

export async function createLeague(teams, name, desc) {
    let body = {
        'name': name,
        'desc': desc,
        'teams': teams
    }
    try {
        const { data } = await axios.post(baseUrl + `/api/league/${name}`, body)
        return data
    } catch(error) {
        console.log(error)
    }
}

export async function createSchedule(league) {
    try {
        const { data } = await axios.post(baseUrl + `/api/league/${league}/match`)
        return data
    } catch(error) {
        console.log(error)
    }
}
