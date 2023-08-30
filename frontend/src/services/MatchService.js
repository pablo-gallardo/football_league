import axios from 'axios';

const baseUrl = process.env.API_URL ?  process.env.API_URL : 'http://localhost:5001';

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

export async function getAllLeagues() {
    try {
        const { data } = await axios.get(baseUrl + '/api/league/all')
        return data
    } catch(error) {
        console.log(error)
    }
}
