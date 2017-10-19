import React from "react";
import { connect } from "react-redux";


import DisplayLineCart from "../../Charts/LineChart";
import DisplayBarChart from "../../Charts/BarChart";
import Display_Pie_Chart from "../../Charts/PieChart";


@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
export default class BasicStats extends React.Component {
	
	componentWillMount(){
		console.log(this.props)
		
		 }
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillUpdate(nextProps, nextState){
		if(this.props.BATTING.Facts["0"].Batting_World_Rank != nextProps.BATTING.Facts["0"].Batting_World_Rank){
				nextProps.history.push('/'+nextProps.UI.PLAYER.LMSID+'/') 
		 }
	}
	
	render () {
			
			return (
				<div id="HomePanel">
					<div class="row">
						<div class="col-md-6">
							<h1 class="page-header" >Career Highest Scores (10)</h1>
						</div>
						<div class="col-md-6">
							<p class="pull-right">Total: {this.props.BATTING.Facts["0"].HighestScore}</p>
						</div>
					</div>
				
				
					<h1>High Scores</h1>
					<ul>
						<li>Highest Score</li>
						<li>Highest scores over the years</li>
						
						<li>Top 10 scores with opposition</li>
						
					</ul>
				</div>
			)
	}
}