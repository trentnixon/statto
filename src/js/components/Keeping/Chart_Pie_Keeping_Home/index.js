import React from "react";
import { connect } from "react-redux";


import DisplayPieChart from "../../Charts/PieChart";
	
	
var stumpings=0, caught=0,ShowBars,Limit,KeeperStumpings,KeeperCaught;

var Keepingdata= [
		{name: 'Caught', value: 0},
		{name: 'Stumpings', value: 0}
	]

export default class BattingRunsToAverage extends React.Component {
	
	componentWillMount(){ }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){
		Limit = nextProps.Limit;
		var Player = nextProps.Player.games;
		if(Player.length > 0)
			{
				Player= Player.slice(Math.max(Player.length - Limit, 1))
				Player.map((game,i)=>{
						
						KeeperCaught=parseInt(game.keeper_Caught);
						KeeperStumpings=parseInt(game.keeper_Stumping);
					
							if(isNaN(KeeperStumpings)){KeeperStumpings = 0;}
							if(isNaN(KeeperCaught)){KeeperCaught = 0;}
						
						stumpings = stumpings+KeeperStumpings;
						caught = caught+KeeperCaught;				
					})
				Keepingdata[0]['value'] = caught;
				Keepingdata[1]['value'] = stumpings;
		}
	}

	render () {
			  
			if(Keepingdata.length == 0){ ShowBars = 'Creating Pie Chart';}
			else{ ShowBars = <DisplayPieChart 
								Data={Keepingdata} 
								title={this.props.Title}
								XAxis="TeamName"
								Bar="Runs"
								Line="Wickets"
							/>; }
			return (
				<div class="ShowChart">
					{ShowBars}
				</div>
			)
  }

}