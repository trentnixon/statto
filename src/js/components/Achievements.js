import React from "react";
import { connect } from "react-redux";
// Globals
import SectionHeader from "./Global/SectionHeader";
import Trophy from "./Charts/Trophy"
import Table from "./Charts/StripedTable"

var AchievmentsList=[], CareerAchievements=[],BattingAchievements=[],BowlingAchievements=[], Display_Achievements,Breakdown,TH,TD;
var DisplayGamesPlayed;

@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			ACHIEVEMENTS: store.ACHIEVEMENTS
		}
	})
export default class Achievements extends React.Component {
	
	
	CreateAchievement(Data, Achievement_value){
		
		console.log(Data.values,Data.values.length,Data.values[Data.values.length-1],Achievement_value, Achievement_value/Data.values.length*100)
		
		var Percentage = Achievement_value/Data.values.length*100;
		
		return(	<div>					
					<div class="progress progress-striped active">
						<div class={AchievmentsList[Achievement_value].class+" progress-bar"} style={{width: Percentage+'%'}}>
							{AchievmentsList[Achievement_value].name}
						</div> 
					</div>
					<p>Next Level at: {Data.values[Achievement_value+1]} {Data.label}</p>
				</div>
			)
	}
	
	componentWillMount(){ 

		Display_Achievements = this.props.ACHIEVEMENTS.Display_Achievements
		AchievmentsList=this.props.ACHIEVEMENTS.Levels;
		Breakdown=this.props.ACHIEVEMENTS.Breakdown;
		
		TH=["Achievement"];
	
		console.log(AchievmentsList)
	
		// Career		
		var Career = Breakdown.Career;
		CareerAchievements=[
			{name:"Games Played",level:"",Data:this.CreateAchievement(Career.NumberofGames, Display_Achievements.Career_Game)}
		]
		// {name:"Favorite Opponent",Data:this.CreateAchievement(Career.OppositionTeams, Display_Achievements.Career_Opposition)},
	    //  {name:"The Dirty Slag",Data:this.CreateAchievement(Career.TeamsPlayedFor, Display_Achievements.Career_TeamsPlayedFor)}

		var Batting = Breakdown.Batting;
		/*
			Runs Scores
			Balls Faced
			# 200+ strike rates
			# 50s
			# 100s
			# Ducks
			# Not outs
			Batted in every position
		*/
		BattingAchievements=[
			{name:"Career Runs",level:"", Data:this.CreateAchievement(Batting.NumberofRuns, Display_Achievements.Batting_Runs)},
			{name:"Career Average",level:"", Data:this.CreateAchievement(Batting.BattingAverage, Display_Achievements.Batting_Average)},
			{name:"Balls Faced",level:"", Data:this.CreateAchievement(Batting.BallsFaced, Display_Achievements.Balls_Faced)},
			{name:"Not Outs",level:"", Data:this.CreateAchievement(Batting.Notouts, Display_Achievements.Batting_NotOut)},
			{name:"Ducks",level:"", Data:this.CreateAchievement(Batting.Ducks, Display_Achievements.Batting_Ducks)},
			{name:"Less than 20",level:"", Data:this.CreateAchievement(Batting.LT20, Display_Achievements.Batting_LT20)},
			{name:"In the 20s",level:"", Data:this.CreateAchievement(Batting.Twenties, Display_Achievements.Batting_Twenties)},
			{name:"In the 30s",level:"", Data:this.CreateAchievement(Batting.Thirties, Display_Achievements.Batting_Thirties)},
			{name:"LMS 50's",level:"", Data:this.CreateAchievement(Batting.LMS50, Display_Achievements.Batting_50s)},
			{name:"LMS 100's",level:"", Data:this.CreateAchievement(Batting.LMS100, Display_Achievements.Batting_100s)},
			{name:"200+ Strike Rate",level:"",Data:this.CreateAchievement(Batting.StrikeRate200, Display_Achievements.Batting_ST200)}
		]		
		//{name:"Batted in every position",Data:this.CreateAchievement(Batting.BattingPosition, Display_Achievements.Batting_Runs)
	}
	render () {
			return (
				<section id="basicInfo">
					<div class="col-md-12">
							<h1 class="page-header">Achievements</h1>
					</div>
					
					<div class="col-md-12">
							<div class="row">							
								{
									AchievmentsList.map((list,i)=>{
										return(
												<div key={'item'+i}  class=" col-md-3"> 
												<div class="panel panel-inverse" data-sortable-id="index-1">
													<div class="panel-heading">
														<h4 class="panel-title">
															<div class={list.class}>
																<i class="fa fa-trophy" aria-hidden="true"></i>
															</div> 
														 	{list.name}
														</h4>
													</div>
												</div>	
												</div>	
											)
									})
								}
							</div>
					</div>	
						
						
					<div class="col-md-12">	
						<div class="row">	
						<div class="panel panel-inverse" data-sortable-id="table-basic-4">
							<div class="panel-heading">
								<h4 class="panel-title">Career Achievements</h4>
							</div>
							<div class="panel-body">
								<table class="table table-striped Achievement">
									<thead>
										<tr>
											{
												TH.map((TH,i)=>{
														return(
															<th key={i}>{TH}</th>
														)
													})
												}
										</tr>
									</thead>
									<tbody>
										
										{
											CareerAchievements.map((item,i)=>{
												return(
													<tr key={i}>
														<td class="show_Achievement">{CareerAchievements[i].name}</td>
														{CareerAchievements[i].Data}
													</tr>
												)
											})
										}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

				<div class="col-md-4">	
						<div class="panel panel-inverse" data-sortable-id="table-basic-4">
							<div class="panel-heading">
								<h4 class="panel-title">Batting Achievements</h4>
							</div>
							<div class="panel-body Dashboard_Table">
								{	TH.map((TH,i)=>{
										return( <div class="TableHeader" key={i}>{TH}</div> )
										})
								}
										
								{
									BattingAchievements.map((item,i)=>{
										return(
												<div class="Table_Row">
													<div class="TableHeader">{BattingAchievements[i].name}</div>
													 { BattingAchievements[i].Data } 
												</div>
											)
									})
								}
							</div>
						</div>
				</div>						
				
				<div class="col-md-4">
						<div class="panel panel-inverse" data-sortable-id="table-basic-4">
							<div class="panel-heading">
								<h4 class="panel-title">Bowling Achievements</h4>
							</div>
							<div class="panel-body">
								<table class="table table-striped Achievement">
									<thead>
										<tr>
											{
												TH.map((TH,i)=>{
														return(
															<th key={i}>{TH}</th>
														)
													})
												}
										</tr>
									</thead>
									<tbody>
										
										{
											CareerAchievements.map((item,i)=>{
												return(
													<tr key={i}>
														<td class="show_Achievement">{CareerAchievements[i].name}</td>
														{CareerAchievements[i].Data}
													</tr>
												)
											})
										}
									</tbody>
								</table>
							</div>
						</div>
				</div>			
				
				
				<div class="col-md-4">
						<div class="panel panel-inverse" data-sortable-id="table-basic-4">
							<div class="panel-heading">
								<h4 class="panel-title">Keeping Achievements</h4>
							</div>
							<div class="panel-body">
								<table class="table table-striped Achievement">
									<thead>
										<tr>
											{
												TH.map((TH,i)=>{
														return(
															<th key={i}>{TH}</th>
														)
													})
												}
										</tr>
									</thead>
									<tbody>
										
										{
											CareerAchievements.map((item,i)=>{
												return(
													<tr key={i}>
														<td class="show_Achievement">{CareerAchievements[i].name}</td>
														{CareerAchievements[i].Data}
													</tr>
												)
											})
										}
									</tbody>
								</table>
							</div>
						</div>
				</div>	
					
				<div class="col-md-12">	
						
						<ul>
							<li>Game Achievments- unlock achievments</li>
							<li>Bowling:
								<ul>
									<li>Games Played</li>
									<li>Teams Played for</li>
								</ul>
							 </li>
							<li>Keeping: 
								<ul>
									<li>Games Played</li>
									<li>Teams Played for</li>
									
								</ul>
							</li>
						</ul>
					</div>
				</section>
			)
  }

}