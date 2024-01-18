import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMatches } from "../services/MatchService";
import { Box, Container } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import StandingsTable from "../components/standingstable/StandingTable";
import Matchday from "../components/matchday/Matchday";
import ButtonAppBar from "../components/navbar/NavBar";


export default function League() {
    const [matches, setMatches] = useState(null)
    const [standingRefresh, setStandingRefresh] = useState(false)
    const { league } = useParams()

    const handleReload = () => {
        setStandingRefresh(true)
    }

    const standingsReloadCallback = () => {
        setStandingRefresh(false)
    }

    function handleMatches(item) {
      let data = []
      for (let key in item) {
        if (key === '_id') { continue }
        let value = item[key]
        data.push(value)
      } 
      return data
    }

    useEffect(() => {
        getMatches(league).then((item) => {
          setMatches(handleMatches(item))
        })
        }, []);
    
    if (matches) {
        let matches_obj = []
        matches.map((item) => {
            let day = item[0]['day']
            matches_obj.push(<Matchday day={day} matches={item} league={league} reloadStanding={handleReload}/>)
        })
        return (
            <div>
                <ButtonAppBar />
                <Container sx={{marginTop:'1em'}} >
                    <StandingsTable
                        sx={{alignItems:'center', display:'flex', justifyContent:'center'}}
                        league={league} 
                        reloadStandings={standingRefresh} 
                        onReload={standingsReloadCallback}
                    />
                    {matches_obj}
                </Container>
            </div>
        )
    }

    return (
        <Box>
            <ButtonAppBar />
            <Skeleton sx={{margin: 1}} animation="wave" variant="rectangular" height={60} />
            <Skeleton sx={{margin: 1}} animation="wave" variant="rectangular" height={60} />
            <Skeleton sx={{margin: 1}} animation="wave" variant="rectangular" height={60} />
            <Skeleton sx={{margin: 1}} animation="wave" variant="rectangular" height={60} />
        </Box>
    )

}