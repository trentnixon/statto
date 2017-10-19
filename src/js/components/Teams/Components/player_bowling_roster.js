import React from "react";
var _ = require('lodash');

let SortArray=[], playerRoster, favoredBattingPosition, CommonDismissal, StrikeRate, Average=0, Economy=0, SR=0, totalOver=0, total_wickets=0, TeamRuns=0, TeamEconomy=0;
let SortIcon = <small><i class="fa fa-sort" aria-hidden="true"></i></small>;
export default class PlayerRosterBatting extends React.Component {

	constructor(props) {
    		super(props);
    		this.state = {orderBy: 'GamesPlayed'};
  	}

	order(SortArray)
		{
			this.setState({  orderBy: SortArray });			
	}

	frequency(obj)
		{
			let frequency = {};  // array of frequency.
			let max = 0;  // holds the max frequency.
			let result;   // holds the max frequency element.
			for(let v in obj) {
			frequency[obj[v]]=(frequency[obj[v]] || 0)+1; // increment frequency.
			if(frequency[obj[v]] > max) { // is this frequency > max so far ?
				max = frequency[obj[v]];  // update max.
				result = obj[v];          // update result.
				}
			}
		return result
	}
	
	createTable(SortArray, orderBy)
		{
			
			totalOver=0, total_wickets=0, TeamRuns=0;
			SortArray = _.sortBy(SortArray, [function(o) { return o.Stats[orderBy]; }]);	
			SortArray = SortArray.reverse()
			
			playerRoster = SortArray.map((player,i)=>{
		
						Economy=0, SR=0, Average=0;
						Average = player.Stats.runs_conceded/player.Stats.Wickets;
						Economy = player.Stats.runs_conceded/player.Stats.Overs_Bowled;
						SR = (player.Stats.Overs_Bowled * 5) /player.Stats.Wickets
						// GLobals
						totalOver=totalOver+player.Stats.Overs_Bowled
						total_wickets = total_wickets+player.Stats.Wickets
						TeamRuns = TeamRuns +player.Stats.runs_conceded;
						
						return(
								<tr key={i}>
										<td class="name">{player.Stats.Name}</td>
										<td>{player.Stats.GamesPlayed}</td>
										<td>{player.Stats.Overs_Bowled}</td>
										<td>{player.Stats.Wickets}</td>
										<td>{player.Stats.runs_conceded}</td>
										<td>{Economy.toFixed(2)}</td>
										<td>{SR.toFixed(2)}</td>
										<td>{Average.toFixed(2)}</td>
								</tr>
							)
				});
	}
	
	
  componentWillMount(){ this.createTable(this.props.playerRoster, this.state.orderBy);}
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){ this.createTable(nextProps.playerRoster, nextState.orderBy);}
  
  render() {
	return (
		<div class="panel panel-inverse" data-sortable-id="table-basic-4">
        	<div class="panel-body">			
            	<table class="table table-striped PlayerRoster">
          			<thead>
                    	<tr>
							<th></th>
							<th class="order"><h5 onClick={()=>this.order('GamesPlayed')}>G {SortIcon}</h5></th>
							<th class="order"><h5 onClick={()=>this.order('Overs_Bowled')} >OB {SortIcon}</h5></th>
							<th class="order"><h5 onClick={()=>this.order('Wickets')}>W  {SortIcon}</h5></th>
							<th class="order"><h5 onClick={()=>this.order('runs_conceded')}>RC{SortIcon}</h5></th>
							<th><h5>E</h5></th>
							<th><h5>SR</h5></th>
							<th><h5>Avg</h5></th>
							
                        </tr>
                	</thead>
   				<tbody>
					{playerRoster}
				</tbody>
                </table>
			</div>
		</div>
    );
  }
}