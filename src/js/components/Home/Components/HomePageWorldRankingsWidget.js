import React from "react";
import { connect } from "react-redux";

import DisplayStripedTable from "../../Charts/Ranking_Striped_Table";
		
let  TableHeaders,Games,GameYear,CurrentYear, StartingRank = 1000000;
let  battingBestRank=StartingRank, prevBattingRank=0, BattingStart=0;
let  bowlingBestRank=StartingRank, prevBowlingRank=0, BowlingStart=0;
let  KeepingBestRank=StartingRank, prevKeepingRank=0, KeepingStart=0;


var RankData =[
	{Label:'Batting',start:0,current:0,highest:0,icon:'fa fa-arrow-up'},
	{Label:'Bowling',start:0,current:0,highest:0,icon:'fa fa-arrow-up'},
	{Label:'Keeping',start:0,current:0,highest:0,icon:'fa fa-arrow-up'}]


@connect((store) =>{
		return{
			WORLDRANKINGS:store.WORLDRANKINGS.Rankings
		}
	})
export default class HomePageWorldRankingsWidget extends React.Component {
	
	// Worth moving this into a reducer and expanding it out to cover all years?
	
	CreateTable(Games)
		{
			 battingBestRank=StartingRank, prevBattingRank=0, BattingStart=0;
			 bowlingBestRank=StartingRank, prevBowlingRank=0, BowlingStart=0;
			 KeepingBestRank=StartingRank, prevKeepingRank=0, KeepingStart=0;
			
			if(Games)
			{
	
			var ArrayLength = Games.length -1;
			
			Games.map((game,i)=>{
					
					GameYear = game.Date.split('/');
					CurrentYear = new Date().getFullYear().toString().substr(-2)
					
					var BattingRank = game.WR_Batting;
					var bowlingRank = game.WR_Bowling;
					var keeperRank = game.WR_Keeping;
					
					
						if(CurrentYear == GameYear[2])
							{
								if(!isNaN(parseInt(game.WR_Batting)))
								{prevBattingRank = parseInt(game.WR_Batting);
									if(BattingStart == 0){BattingStart = parseInt(game.WR_Batting)}
								}
								
								if(!isNaN(parseInt(game.WR_Bowling)))
								{ prevBowlingRank = parseInt(game.WR_Bowling);
									if(BowlingStart == 0){BowlingStart = parseInt(game.WR_Bowling)}
								}
								
								if(!isNaN(parseInt(game.WR_Keeping)))
								{ prevKeepingRank = parseInt(game.WR_Keeping);
									if(KeepingStart == 0){KeepingStart = parseInt(game.WR_Keeping)}
								}
						}
						
					if(BattingRank < battingBestRank){battingBestRank = BattingRank;  RankData[0]['highest'] = BattingRank; }
					if(bowlingRank < bowlingBestRank){ bowlingBestRank = bowlingRank;  RankData[1]['highest'] = bowlingRank; }
					if(keeperRank < KeepingBestRank ){ KeepingBestRank = keeperRank;  RankData[2]['highest'] = keeperRank; }	
						
						
						if(i == ArrayLength){
								RankData[0]['current'] = prevBattingRank;
								RankData[0]['start'] = BattingStart;
								RankData[0]['icon']  = (BattingStart > prevBattingRank) ? 'fa fa-arrow-up' :'fa fa-arrow-down';
								
								
								RankData[1]['current'] = prevBowlingRank;
								RankData[1]['start'] = BowlingStart;
								RankData[1]['icon']  = (BowlingStart > prevBowlingRank) ? 'fa fa-arrow-up' :'fa fa-arrow-down';
								
								RankData[2]['current'] = prevKeepingRank;
								RankData[2]['start'] = KeepingStart;
								RankData[2]['icon']  = (KeepingStart > prevKeepingRank) ? 'fa fa-arrow-up' :'fa fa-arrow-down';
							}
			})
		}
	}
	
	
	componentWillMount(){
			
			TableHeaders=['#','Seasons Start','Current', 'Highest'];
			Games = this.props.WORLDRANKINGS;
			this.CreateTable(Games)
		}
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){
		
		Games = nextProps.WORLDRANKINGS;
		this.CreateTable(Games)
		
	}

	render () {
			return (
				<div class="ShowChart">
					<DisplayStripedTable Title={this.props.Title} TableData={RankData} TableHeader={TableHeaders}/>
				</div>
			)
  	}
}