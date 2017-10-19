import React from "react";

import {  Link } from 'react-router-dom';
// Import Comoponents
import Checkforupdates from "./checkforupdates";
import NewGamesFound from "./NewGamesFound";
import Thumb from "./Side-Bar-Thumb-and-Name";

let ProfilePicture, BowlingTabs=[],BattingTabs=[],TeamsTab=[],Teams=[], DisplayBar, MyTeams;		  

  
export default class NavList extends React.Component {

	/*Close Side bar for nav on click*/
	CloseSideBar(){
			var active = document.querySelector("#page-container");
			active.classList.remove("page-sidebar-toggled");
		
	}
	
	foo(arr) {
		var a = [], b = [], prev;
		arr.sort();
		for ( var i = 0; i < arr.length; i++ ) {
			if ( arr[i] !== prev ) {
				a.push(arr[i]);
				b.push(1);
			} else {
				b[b.length-1]++;
			}
			prev = arr[i];
		}
		return [a, b];
	}
	
	/*updatable nav*/
	createNav(FF){
		BattingTabs=[
			{Title:'Innings', 			Value:FF.NumInnings,	Link:'career-at-bat'},
			{Title:'Total Runs Scored', Value:FF.TotalScore,	Link:'total-runs'},
			{Title:'Batting Positions', Value:'New',	Link:'batting-position'},
			{Title:'Dismissals', Value:'New',	Link:'dismissals'},
			{Title:'Total Balls Faced', Value:FF.BallsFaced,	Link:'balls-faced'},
			{Title:'Highest Score', 	Value:FF.HighestScore,	Link:'high-scores'},
			{Title:'Not out', 			Value:FF.NotOuts,		Link:'not-outs'},
			{Title:'Ducks', 			Value:FF.Ducks,			Link:'ducks'},
			{Title:'Less than  20', 	Value:FF.LessThantwenty,Link:'less-than-20'},
			{Title:'20s', 				Value:FF.twenty,		Link:'twenties'},
			{Title:'30s', 				Value:FF.thirty,		Link:'thirties'},
			{Title:'50s', 				Value:FF.fifty,			Link:'fifties'},
			{Title:'100s', 				Value:FF.hundreds,		Link:'hundreds'}
		]
	 
		BowlingTabs=[
			{Title:'Games', 		Value:FF.Bowling_innings,				Link:'bowled'	},
			{Title:'Wickets Taken', Value:FF.Bowling_CareerWickets,			Link:'wickets'},
			{Title:'Balls Bowled', 	Value:FF.Bowling_CareerBallsBolwed,		Link:'balls'},
			{Title:'Economy', 		Value:FF.Bowling_Career_Economy_Rate,	Link:'economy'},
			{Title:'Average',  		Value:FF.Bowling_Average_Career,		Link:'average'},
			{Title:'StrikeRate', 	Value:FF.Bowling_Career_StrikeRate, 	Link:'strikerate'},
			{Title:'Overs Bowled', 	Value:FF.Bowling_CompleteOvers,			Link:'overs'},
			{Title:'Bowled Out', 	Value:FF.Bowling_BowledOut,				Link:'bowledout'},
		//	{Title:'Figures vs Runs', Value:FF.NumInnings,	Link:'figruns'},
			{Title:'Over 30', 		Value:FF.Bowling_Over30,				Link:'over30'},
			{Title:'Under 20', 		Value:FF.Bowling_under20,				Link:'under20'},
			{Title:'1 -', 			Value:FF.Bowling_1fa,					Link:'1fa'},
			{Title:'2 -', 			Value:FF.Bowling_2fa,					Link:'2fa'},
			{Title:'3 -', 			Value:FF.Bowling_3fa,					Link:'3fa'},
			{Title:'4 -', 			Value:FF.Bowling_4fa,					Link:'4fa'},
			{Title:'5 -', 			Value:FF.Bowling_5fa,					Link:'5fa'},
			{Title:'6 -', 			Value:FF.Bowling_6fa,					Link:'6fa'},	
		]
	}

	createTeamNav(Teams)
		{	
			if(Teams != false){
				MyTeams =  Teams.map((row,i)=>{
					//console.log(row)
					return(
						<li key={i}>
							<Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"myClub/"+row.teamid}>
									{row.team}
								<span class="badge pull-right">{row.teamCount}</span>
							</Link >
						</li>
					)
				})
			}
		}


  componentWillMount(){ 
  		this.createNav(this.props.FACTS.Facts[0]);
		this.createTeamNav(this.props.MYTEAMS.Teams); 

	}
  shouldComponentUpdate(nextProps, nextState){ return true;}  
  componentWillUpdate(nextProps, nextState){ 
  		this.createNav(nextProps.FACTS.Facts[0]);
		this.createTeamNav(nextProps.MYTEAMS.Teams)		
	}
  
  render() {		
		return (
				<div>
				<div id="sidebar" class="sidebar">
				<div data-scrollbar="true" data-height="100%">
					<ul class="nav">
						<li class="nav-profile">
							<Thumb {...this.props} Name={this.props.UI.PLAYER.UserName} />
						</li>
					</ul>
					<ul class="nav">
						<li><Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL}> <i class="fa fa-tachometer"></i> <span> Dashboard </span></Link></li>
						<li><Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"achievements"}> <i class="fa fa-trophy"></i> <span> Achievements </span></Link></li>
						<li class="nav-header">Career</li>
						<li><Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"history"}> <i class="fa fa-history"></i><span> Game History </span></Link></li>
						<li class="has-sub">
							<a href="javascript:;">
							  <b class="caret pull-right"></b>
							  <i class="fa fa-square"></i> 
							  <span>By:</span> 
							</a>
							<ul class="sub-menu">
							  	<li><Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"Byfor"}> <i class="fa fa-sign-language"></i> <span> Played For </span></Link></li>
								<li><Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"vs"}> <i class="fa fa-cubes"></i> <span> Opponent </span></Link></li>
								<li><Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"ByYear"}> <i class="fa fa-calendar"></i> <span> Year </span></Link></li>
								<li><Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"ByGround"}> <i class="fa fa-flag-o"></i> <span> Ground </span></Link></li>
								<li><Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"ByUmpire"}> <i class="fa fa-hand-pointer-o"></i> <span> Umpire </span></Link></li>		
							</ul>
					    </li>
						<li class="nav-header">Discipline</li>
						<li class="has-sub">
							<a href="javascript:;">
							  <b class="caret pull-right"></b>
							  <i class="fa fa-child"></i> 
							  <span>Batting</span> 
							</a>
							<ul class="sub-menu">
							  <li><Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"batting/"}><span> Career </span></Link></li>
							 	{ BattingTabs.map((row,i)=>{
										return(
											<li key={i}>
												<Link  onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"batting/"+row.Link}>
													{row.Title} 
													<span class="badge pull-right">
														{row.Value}
													</span>
												</Link >
											</li>
										)
									})}
							</ul>
					    </li>
						
						<li class="has-sub">
							<a href="javascript:;">
							  <b class="caret pull-right"></b>
							  <i class="fa fa-futbol-o"></i> 
							  <span>Bowling</span> 
							</a>
							<ul class="sub-menu">
							  <li><Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"bowling/"}><span> Career </span></Link></li>
							 	{ BowlingTabs.map((row,i)=>{
										return(
											<li key={i}>
												<Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"bowling/"+row.Link}>
													{row.Title}
													<span class="badge pull-right">
														{row.Value}
													</span>
												</Link >
											</li>
										)
									})}
							</ul>
					    </li>
						<li><Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"keeping"}><i class="fa  fa-paw"></i> <span> Keeping </span></Link></li>
						
						<li class="nav-header">My Clubs</li>
						
						<li class="has-sub">
							<a href="javascript:;">
							  <b class="caret pull-right"></b>
							  <i class="fa fa-users"></i> 
							  <span>Teams</span> 
							</a>
							<ul class="sub-menu">
									{MyTeams}
							</ul>
					    </li>

				<li class="nav-header">Settings</li>
				<li class="visible-xs-block" ><Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"changeplayer"}> <i class="fa fa-refresh"></i> <span> Change Player </span></Link></li>
				<li class="has-sub">
							<a href="javascript:;">
							  <b class="caret pull-right"></b>
							  <i class="fa fa-cogs"></i> 
							  <span>Statto</span> 
							</a>
							<ul class="sub-menu">
							 	<li><Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"mystatto"}> <i class="fa fa-beer"></i> <span> My Statto </span></Link></li>
								<li><Link onClick={this.CloseSideBar} to={this.props.UI.PLAYER.AppURL+"changelog"}> <i class="fa fa-bug"></i> <span> Change Log </span></Link></li>
				
				<Checkforupdates  {...this.props} Player={this.props.FACTS.BattingObject} PlayerID={this.props.UI.PLAYER.LMSID}/>
				<NewGamesFound {...this.props} Player={this.props.FACTS.BattingObject} PlayerID={this.props.UI.PLAYER.LMSID}/>
				
							</ul>
					    </li>	
				<li class="nav-header"><i class="fa fa-code-fork" aria-hidden="true"></i> Version: {this.props.Version} </li>
			</ul>
		</div>
	</div>
		<div class="sidebar-bg"></div>
</div>
	);  
  }
}