import React from "react";
import { connect } from "react-redux";
import {  Link } from 'react-router-dom';

var Table=[];

@connect((store) =>{
		return{
			FACTS:store.BATTING,
			ACHIEVEMENTS: store.ACHIEVEMENTS
		}
	})
export default class BasicStats extends React.Component {
	
	componentWillMount(){ 
		var FF = this.props.FACTS.Facts[0];
		
		var TrohpyClass = this.props.ACHIEVEMENTS.Levels;
		var PlayerLevel = this.props.ACHIEVEMENTS.Display_Achievements
		
		console.log(PlayerLevel)
		
		Table=[
			{Title:'Innings', 			Value:FF.NumInnings,	Link:'career-at-bat',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'Total Runs Scored', Value:FF.TotalScore,	Link:'total-runs',		Award:TrohpyClass[PlayerLevel.Batting_Runs].class},
			{Title:'Total Balls Faced', Value:FF.BallsFaced,	Link:'balls-faced',		Award:TrohpyClass[PlayerLevel.Balls_Faced].class},
			{Title:'Highest Score', 	Value:FF.HighestScore,	Link:'high-scores',		Award:TrohpyClass[PlayerLevel.Batting_HighestScore].class},
			{Title:'Not out', 			Value:FF.NotOuts,		Link:'not-outs',		Award:TrohpyClass[PlayerLevel.Batting_NotOut].class},
			{Title:'Ducks', 			Value:FF.Ducks,			Link:'ducks',			Award:TrohpyClass[PlayerLevel.Batting_Ducks].class},
			{Title:'Less than  20', 	Value:FF.LessThantwenty,Link:'less-than-20',	Award:TrohpyClass[PlayerLevel.Batting_LT20].class},
			{Title:'20s', 				Value:FF.twenty,		Link:'twenties',		Award:TrohpyClass[PlayerLevel.Batting_Twenties].class},
			{Title:'30s', 				Value:FF.thirty,		Link:'thirties',		Award:TrohpyClass[PlayerLevel.Batting_Thirties].class},
			{Title:'50s', 				Value:FF.fifty,			Link:'fifties',			Award:TrohpyClass[PlayerLevel.Batting_50s].class},
			{Title:'100s', 				Value:FF.hundreds,		Link:'hundreds',		Award:TrohpyClass[PlayerLevel.Batting_100s].class}
		]
	}

	render () {
			return (
				<div id="BasicStats">
				
				<div class="panel panel-inverse" data-sortable-id="table-basic-4">
                        <div class="panel-heading">
                            <h4 class="panel-title">{this.props.Title} <span class="pull-right"><Link to="/lms/app/batting/"><i class="fa fa-home" aria-hidden="true"></i></Link></span></h4>
                        </div>
                        <div class="panel-body">
                            <table class="table table-striped">
                                <tbody>
								{ Table.map((row,i)=>{
										return(
											<tr key={i}>
												<td><Link to={"/lms/app/batting/"+row.Link}><i class="fa fa-eye" aria-hidden="true"></i></Link></td>
												<td><Link to={"/lms/app/batting/"+row.Link}>{row.Title}</Link></td>
												<td>{row.Value}</td>										
												<td class="td_trophy"><Link to="/lms/app/achievements"><i class={row.Award+" fa fa-trophy"}  aria-hidden="true"></i></Link></td>
											</tr>
										)
									})}
								</tbody>
                            </table>
                        </div>
                    </div>
				</div>
			)
  }

}