import React from "react";


export default class ToDoList extends React.Component {

  componentWillMount(){}
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){ }
  
  render() {
	return (
		<div>
			<ul>
						<li>Average winning score</li>
						<li>Average wickets taken</li>
						<li>Players with WRings</li>
						<li>Form guide for players for team</li>
						<li>Select a team: Based on ground - oppo | perhaps list out top to bottom : averages and SRs per oppo</li>
						<li>head to heads - oppo.</li>
						<li>WR progression</li>
						<li>current rankings .. will need to hit LMS every time</li>
					</ul>
		</div>	
    );
  }
}