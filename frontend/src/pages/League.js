import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMatches } from "../services/MatchService";
import StandingsTable from "../components/standingstable/StandingTable";
import Matchday from "../components/matchday/Matchday";



export default function League() {
    const [matches, setMatches] = useState(null)
    const { league } = useParams()

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
            matches_obj.push(<Matchday day={day} matches={item}/>)
        })
        return (
            <div className="container">
                <StandingsTable league={league}/>
                {matches_obj}
            </div>
        )
    }

}