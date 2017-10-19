import React from "react";

/*Import Scorcard*/
import {scorecard} from "../../../actions/";
import Scorecard from "../../Scorecard/";


var TableHeaders=[],TableRows,Player;

export default class VS_Table extends React.Component {
		
	/*Scorecard*/
	FetchScorecard(GameID, first, second){ 
		console.log(GameID, first, second)
		this.props.dispatch(scorecard(GameID, first, second)); 
	}
	
		
	CreateStats(Player)
		{
			if(Player.length > 0)
			{
				TableRows = Player.map((tr,i)=>{
					return(

							<div key={i} class="row Table_Row">
							<a href="#modal-message"  onClick={()=>this.FetchScorecard(tr.game.GameID, tr.game.Game_1st_Innings, tr.game.Game_2nd_Innings)} data-gameID={tr.game.GameID} data-toggle="modal">
								<div class="col-md-1  hidden-xs"><i class="fa fa-list-alt" aria-hidden="true"></i> {i+1}</div>
								<div class="col-md-1  hidden-xs">{tr.game.Date}</div>
								<div class="col-md-2  col-xs-4">{tr.game.Against}</div>
								<div class="col-md-1  col-xs-2">{tr.game.Runs}</div>
								<div class="col-md-1  col-xs-1">{tr.game.BallsFaced}</div>
								<div class="col-md-2  col-xs-2">{tr.game.Bowling_Figures}</div>
								<div class="col-md-1  col-xs-1">{tr.game.Bowling_OversBowled}</div>
								<div class="col-md-1  col-xs-1">{tr.game.Keeping_catches}</div>
								<div class="col-md-1  col-xs-1">{tr.game.Keeping_stumpings}</div>
							</a>
							</div>
						)
				})		
			}	
		}		
		
		
	componentWillMount(){ 
			
		console.log(this.props)	
		this.CreateStats(this.props.Player) 
		TableHeaders=[
				{title:'#' , Abv:'#',			class:"col-md-1 hidden-xs"},
				{title:'Date' , Abv:'D',		class:"col-md-1 hidden-xs"},
				{title:'VS' , Abv:'VS',			class:"col-md-2 col-xs-4"},
				{title:'Runs' , Abv:'R',		class:"col-md-1 col-xs-2"},
				{title:'Balls Faced', Abv:'BF',	class:"col-md-1 col-xs-1"},
				{title:'Figures', Abv:'F',		class:"col-md-2 col-xs-2"},
				{title:'Overs', Abv:'O',		class:"col-md-1 col-xs-1"},
				{title:'Catches', Abv:'CT',		class:"col-md-1 col-xs-1"},
				{title:'Stumpings', Abv:'ST',	class:"col-md-1 col-xs-1"}
			 ];		
	}
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){ this.CreateStats(nextProps.Player) }	
	
  render() {
    return (
		<div class="col-md-12">	 
			<div class="panel panel-inverse" data-sortable-id="table-basic-4">
				<div class="panel-heading">
					<h4 class="panel-title">History</h4>
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
					{TableRows}  
				 </div>
			</div>
			<Scorecard data={this.props.SCORECARD.scorecard} />
		</div>
	);
  }
}