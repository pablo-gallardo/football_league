import './Match.css'

function Match({day, home, away, scores}) {
    if (scores["home"] === null) {
        scores["home"] = "TBD"
    }

    if (scores["away"] === null) {
        scores["away"] = "TBD"
    }

    return (
    <div>
        <h2>Matchday {day}</h2>
        <div>
            <span className="team">{home}</span>
            <span className="score">{scores['home']}</span>
        </div>
        <div>
            <span>{away}</span>
            <span className="score">{scores['away']}</span>
        </div>
    </div>
    )
}

export default Match