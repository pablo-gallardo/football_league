import Match from "../match/Match"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "../../styles/matchday/Matchday.css"

function Matchday({ day, matches }) {
    let matches_obj = []
    matches.map((match) => {
        matches_obj.push(<Match home={match["home"]} away={match["away"]} scores={match["scores"]} />)
        })
    return (
        <div className="matchday">
        <Accordion>
            <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
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