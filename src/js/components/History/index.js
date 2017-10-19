import React from "react";
import { connect } from "react-redux";

/*Import Scorcard*/
import {scorecard} from "../../actions/";
import Scorecard from "../Scorecard/";

// Globals
import SectionHeader from "../Global/SectionHeader";

var TableHeaders=[], HistoryTable;

TableHeaders=[
				{title:'Against', Abv:'VS',	class:"col-md-2  hidden-xs"},
				{title:'Date', Abv:'D',		class:"col-md-1  hidden-xs"},
				{title:'Runs' , Abv:'R',	class:"col-md-1 col-xs-2"},
				{title:'Balls Faced', Abv:'BF',class:"col-md-1 col-xs-2"},
				{title:'Rank', Abv:'R',		class:"col-md-1 hidden-xs"},
				{title:'Figures', Abv:'F',	class:"col-md-1 col-xs-2"},
				{title:'Overs', Abv:'O',	class:"col-md-1 col-xs-2"},
				{title:'Rank', Abv:'R',		class:"col-md-1 hidden-xs"},
				{title:'Catches', Abv:'CT',	class:"col-md-1 col-xs-1"},
				{title:'Stumpings', Abv:'ST',class:"col-md-1 col-xs-1"},
				{title:'Rank', Abv:'R',		class:"col-md-1 hidden-xs"}
			 ];
			 

@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			SCORECARD:store.SCORECARD
		}
	})
export default class History extends React.Component {
	
	/*Scorecard*/
	FetchScorecard(GameID, first, second){  this.props.dispatch(scorecard(GameID, first, second));  }
	
	/*Fetch Table*/
	
	history(History){
			
			HistoryTable = Array.prototype.slice.call(History);
			HistoryTable = HistoryTable.reverse();
		}
	
	componentWillMount(){ this.history(this.props.Player.games);  }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){ this.history(nextProps.Player.games); }
	
	render () {
		
			return (
				<section id="basicInfo">
					<div class="row">
						<SectionHeader copy="Career History"/>
					</div>
					<div class="row">
						<div class="panel panel-inverse" data-sortable-id="table-basic-4">
							<div class="panel-heading">
								<h4 class="panel-title">Career History</h4>
							</div>
							<div class="panel-body Dashboard_Table">
							
							
								<div class="row TableHeader hidden-xs">
								
								{ TableHeaders.map((TH,i)=>{
													return( <div key={i} class={TH.class}>{TH.title}</div>)
								})}
							</div>
							<div class="row TableHeader visible-xs">
								{ TableHeaders.map((TH,i)=>{
													return( <div key={i} class={TH.class}>{TH.Abv}</div>)
								})}
							</div>
								{
											HistoryTable.map((game,i)=>{
												return(
													<div key={i} class="row Table_Row">
													<a href="#modal-message"  onClick={()=>this.FetchScorecard(game.GameID, game.Game_1st_Innings, game.Game_2nd_Innings)} data-gameID={game.GameID} data-toggle="modal">
														<div class="col-md-2 col-xs-12">
																<i class="fa fa-list-alt" aria-hidden="true"></i> {game.Team}
														</div>
														<div class="col-md-1 hidden-xs">{game.Date}</div>
														<div class="col-md-1 col-xs-2">{game.Batting_Runscored}</div>
														<div class="col-md-1 col-xs-2">{game.Batting_BallsFaced}</div>
														<div class="col-md-1 hidden-xs">{game.Batting_Rank}</div>
														<div class="col-md-1 col-xs-2">{game.Bowling_Figures}</div>
														<div class="col-md-1 col-xs-2">{game.Bowling_OversBowled}</div>
														<div class="col-md-1 hidden-xs">{game.Bowling_Rank}</div>
														<div class="col-md-1 col-xs-1">{game.keeper_Caught}</div>
														<div class="col-md-1 col-xs-1">{game.keeper_Stumping}</div>
														<div class="col-md-1 hidden-xs">{game.keeper_Rank}</div>
														</a>
													</div>
												)
											})
										}
							</div>
						</div>
					</div>
					<Scorecard data={this.props.SCORECARD.scorecard} />
				</section>
				
		)
	}
}