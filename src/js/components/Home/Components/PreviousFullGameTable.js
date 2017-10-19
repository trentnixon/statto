import React from "react";
import { connect } from "react-redux";
import {  Link } from 'react-router-dom';
import axios from 'axios';

import {scorecard} from "../../../actions/";
import Scorecard from "../../Scorecard/";

	

var  TableHeaders,Player,Limit=0,TableRows;

TableHeaders=[
				{title:'VS', Abv:'VS',class:"col-md-2 hidden-xs"},
				{title:'Runs' , Abv:'R',class:"col-md-2 col-xs-2"},
				{title:'Balls Faced', Abv:'BF',class:"col-md-1 col-xs-2"},
				{title:'Figures', Abv:'F',class:"col-md-2 col-xs-2"},
				{title:'Overs', Abv:'O',class:"col-md-1 col-xs-2"},
				{title:'Catches', Abv:'CT',class:"col-md-2 col-xs-2"},
				{title:'Stumpings', Abv:'ST',class:"col-md-2 col-xs-2"}
			 ];	 
			 
export default class HomePageWorldRankingsWidget extends React.Component {
	
	constructor() { 
		super();
		this.state = {
			data:false,
		};
	  }
	
	
	FetchScorecard(GameID, first, second){ this.props.dispatch(scorecard(GameID, first, second)); }
	
	CreateTable(Player)
		{
			if(Player.length > 0)
			{
				var NewPlayer = Array.prototype.slice.call(Player);
				NewPlayer = NewPlayer.reverse().slice(0,3);
		
				TableRows = NewPlayer.map((tr,i)=>{
					return(

							<div key={i} class="row Table_Row">
								<a href="#modal-message"  onClick={()=>this.FetchScorecard(tr.GameID, tr.Game_1st_Innings, tr.Game_2nd_Innings)} data-gameID={tr.GameID} data-toggle="modal">
								<div class="col-md-2 col-xs-12"> 
								<i  class="fa fa-list-alt" aria-hidden="true"></i> {tr.Team}</div>
								<div class="col-md-2 col-xs-2">{tr.Batting_Runscored}</div>
								<div class="col-md-1 col-xs-2">{tr.Batting_BallsFaced}</div>
								<div class="col-md-2 col-xs-2">{tr.Bowling_Figures}</div>
								<div class="col-md-1 col-xs-2">{tr.Bowling_OversBowled}</div>
								<div class="col-md-2 col-xs-2">{tr.keeper_Caught}</div>
								<div class="col-md-2 col-xs-2">{tr.keeper_Stumping}</div>
								</a>
							</div>
						)
				})		
		}
	}

	componentWillMount(){ this.CreateTable(this.props.Player.games) }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){  this.CreateTable(nextProps.Player.games); }

	render () { 
	
			return (
				<div class="ShowChart">
					<div class="panel panel-inverse" data-sortable-id="table-basic-4">
                        <div class="panel-heading">
                            <h4 class="panel-title">{this.props.Title} <Link class="pull-right" to={this.props.UI.PLAYER.AppURL+"history"}> Full List <i class="fa fa-list" aria-hidden="true"></i></Link></h4>
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
			)
  	}
}