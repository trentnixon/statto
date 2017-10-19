import React from "react";
import { connect } from "react-redux";
import {  Link,NavLink  } from 'react-router-dom';

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
		
		// console.log(PlayerLevel)
		
		Table=[
			{Title:'Games', 			Value:FF.Bowling_innings,	Link:'bowled',			Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'Wickets Taken', 	Value:FF.Bowling_CareerWickets,	Link:'wickets',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'Balls Bowled', 		Value:FF.Bowling_CareerBallsBolwed,	Link:'balls',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'Economy', 		Value:FF.Bowling_Career_Economy_Rate,	Link:'economy',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'Average',  		Value:FF.Bowling_Average_Career,	Link:'average',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'StrikeRate', 	Value:FF.Bowling_Career_StrikeRate,	Link:'strikerate',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'Overs Bowled', 		Value:FF.Bowling_CompleteOvers,	Link:'overs',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'Bowled Out', 		Value:FF.Bowling_BowledOut,	Link:'bowledout',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
		//	{Title:'Figures vs Runs', Value:FF.NumInnings,	Link:'figruns',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'Over 30', 			Value:FF.Bowling_Over30,	Link:'over30',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'Under 20', 			Value:FF.Bowling_under20,	Link:'under20',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'1 -', 			Value:FF.Bowling_1fa,	Link:'1fa',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'2 -', 			Value:FF.Bowling_2fa,	Link:'2fa',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'3 -', 			Value:FF.Bowling_3fa,	Link:'3fa',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'4 -', 			Value:FF.Bowling_4fa,	Link:'4fa',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'5 -', 			Value:FF.Bowling_5fa,	Link:'5fa',	Award:TrohpyClass[PlayerLevel.Career_Game].class},
			{Title:'6 -', 			Value:FF.Bowling_6fa,	Link:'6fa',	Award:TrohpyClass[PlayerLevel.Career_Game].class},	
		]
	}

	render () {
			return (
				<div id="BasicStats">
				
				<div class="panel panel-inverse" data-sortable-id="table-basic-4">
                        <div class="panel-heading">
                            <h4 class="panel-title">{this.props.Title} <span class="pull-right"><Link to="/lms/app/bowling/"><i class="fa fa-home" aria-hidden="true"></i></Link></span></h4>
                        </div>
                        <div class="panel-body">
                            <table class="table table-striped">
                                <tbody>
								{ Table.map((row,i)=>{
										return(
											<tr key={i}>
												<td><NavLink activeClassName="selected"  to={"/lms/app/bowling/"+row.Link}>{row.Title}</NavLink ></td>
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