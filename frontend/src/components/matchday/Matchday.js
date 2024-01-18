import Match from "../match/Match"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import "../../styles/matchday/Matchday.css"

function Matchday({ day, matches, league, reloadStanding }) {
    const handleReload = () => {
        reloadStanding()
    }
    let matches_obj = []
    matches.map((match, index) => {
        matches_obj.push(<Match 
            league={league} home={match["home"]} 
            away={match["away"]} scores={match["scores"]} 
            index={index} day={day} reloadStanding={handleReload}/>)
        })
    return (
        <div className="matchday">
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Matchday {day}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {matches_obj}
                </AccordionDetails>
            </Accordion>
      </div>
    )
}

export default Matchday;