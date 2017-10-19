import React from "react";
var _ = require('lodash');

let SortArray=[], playerRoster, favoredBattingPosition, CommonDismissal, StrikeRate, Average=0, TotalRuns=0, totalBallsFaced=0, totalfifties=0, averageScore=0, totalInnings=0;
let SortIcon = <small><i class="fa fa-sort" aria-hidden="true"></i></small>;
export default class PlayerRosterBatting extends React.Component {

	constructor(props) {
    		super(props);
    		this.state = {orderBy: 'GamesPlayed'};
  	}

	order(SortArray)
		{
			console.log("Order Me", SortArray)	
			    this.setState({
				  orderBy: SortArray
				});			
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
			TotalRuns = 0, totalBallsFaced=0, totalfifties=0, totalInnings=0;
			SortArray = _.sortBy(SortArray, [function(o) { return o.Stats[orderBy]; }]);	
			SortArray = SortArray.reverse()
			
			playerRoster = SortArray.map((player,i)=>{
		
				favoredBattingPosition = this.frequency(player.Stats.batting_position);
				CommonDismissal = this.frequency(player.Stats.How_Out);
				StrikeRate = player.Stats.Runs/player.Stats.Balls_Faced*100;
				StrikeRate = StrikeRate.toFixed(2);
				Average = player.Stats.Runs/(player.Stats.Innings-player.Stats.NotOut);
				Average = Average.toFixed(2);
				
				// Global
				TotalRuns = TotalRuns + player.Stats.Runs;
				totalBallsFaced = totalBallsFaced +player.Stats.Balls_Faced
				totalfifties = totalfifties + player.Stats.fifties;
				totalInnings = totalInnings + (player.Stats.Innings-player.Stats.NotOut);
				
						return(
								<tr key={i}>
										<td class="name">{player.Stats.Name}</td>
										<td>{player.Stats.GamesPlayed}</td>
										<td>{player.Stats.Innings}</td>
										<td class="hidden-xs">{player.Stats.NotOut}</td>
										<td>{player.Stats.Runs}</td>
										<td class="hidden-xs">{player.Stats.Balls_Faced}</td>
										<td>{Average}</td>
										<td>{StrikeRate}</td>
										<td>{player.Stats.HS}</td>
										<td>{player.Stats.fifties}</td>
										<td>{CommonDismissal}</td>
								</tr>
							)
				});
	}
	
  componentWillMount(){ this.createTable(this.props.playerRoster, this.state.orderBy) }
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){ this.createTable(nextProps.playerRoster, nextState.orderBy) }
  
  render() {
	return (
		<div class="panel panel-inverse" data-sortable-id="table-basic-4">
        	<div class="panel-body">
            	<table class="table table-striped PlayerRoster">
          			<thead>
                    	<tr>
							<th></th>
							<th class="order"><h5 onClick={()=>this.order('GamesPlayed')}>G {SortIcon}</h5></th>
							<th class="order"><h5 onClick={()=>this.order('Innings')}>Inn  {SortIcon}</h5></th>
							<th class="order hidden-xs"><h5 onClick={()=>this.order('NotOut')}>N/O  {SortIcon}</h5></th>
							<th class="order"><h5 onClick={()=>this.order('Runs')}>Runs{SortIcon}</h5></th>
							<th class="order  hidden-xs"><h5 onClick={()=>this.order('Balls_Faced')}>BF {SortIcon}</h5></th>
							<th><h5>Avg</h5></th>
							<th><h5>SR</h5></th>
							<th class="order"><h5 onClick={()=>this.order('HS')}>HS {SortIcon}</h5></th>
							<th class="order"><h5 onClick={()=>this.order('fifties')}>50s {SortIcon}</h5></th>
							<th><h5>MCD</h5></th>
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