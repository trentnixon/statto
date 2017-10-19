import React from "react";
import { connect } from "react-redux";

/*Import Scorcard*/
import {scorecard} from "../../../actions/";
import Scorecard from "../../Scorecard/";

let DisplayResults, first, second;

@connect((store) =>{
		return{
			SCORECARD:store.SCORECARD
		}
	})
export default class GameData extends React.Component {
	
	/*Scorecard*/
	FetchScorecard(GameID, first, second){
			console.log(GameID, first, second)  
			//this.props.dispatch(scorecard(GameID, first, second));
			scorecard(GameID, first, second)  
	}
	
	/*Create UI*/
	DisplayUI(FetchedGames)
		{
			DisplayResults = FetchedGames.map((game,i)=>{
			
				if(game.Winner_ID == game.Batted_First_ID){ first='win'; second='lost' } else
				{  second='win'; first='lost';}
			
				return(
					<tr key={i}>
						
							<td>
								<a 	href="#modal-message"  
								onClick={()=>this.FetchScorecard(game.Gameid, game.Batted_First_ID, game.Batting_Second_ID)} 
								data-gameID={game.GameID} 
								data-toggle="modal">
								<i class="fa fa-list-alt" aria-hidden="true"></i>
								</a>
							</td>
							<td class={first}>
								<a 	href="#modal-message"  
								onClick={()=>this.FetchScorecard(game.Gameid, game.Batted_First_ID, game.Batting_Second_ID)} 
								data-gameID={game.GameID} 
								data-toggle="modal">
								{game.Batted_First} {game.First_Score}/{game.First_Wickets} - {game.First_Overs}
								</a>
							</td>
							<td>
								vs
							</td>
							<td class={second}>
								<a 	href="#modal-message"  
								onClick={()=>this.FetchScorecard(game.Gameid, game.Batted_First_ID, game.Batting_Second_ID)} 
								data-gameID={game.GameID} 
								data-toggle="modal">
								{game.Batting_Second} {game.Second_Score}/{game.Second_Wickets} - {game.Second_Overs}
								</a>
							</td>
						
					</tr>
				)
			})
	}

  componentWillMount(){ this.DisplayUI(this.props.Results["0"].Filtered_Scorecards); }
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){ this.DisplayUI(nextProps.Results["0"].Filtered_Scorecards); }

  render() {	  
	return (
		<div class="panel panel-inverse" data-sortable-id="table-basic-4">
        	<div class="panel-body">
            	<table class="table table-striped PlayerRoster">
   				<tbody>
					{DisplayResults}
				</tbody>
                </table>
			</div>
			<Scorecard data={this.props.SCORECARD.scorecard} />
		</div>
    );
  }
}