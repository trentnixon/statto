import React from "react";

import Display_Pie_Chart from "../../Charts/PieChart";
import Widget from "../../Global/Widget"; 

let result, win = 0, lose=0, draw=0, total=0, winpercetage=0, pieData=[];

export default class TeamName extends React.Component {

	countResult(Games,needle)
		{
			let count=0;
			Games.map((game,i)=>{
				if(game.GameResult == needle){ count++; }
			})
			return count
	}

  componentWillMount(){
	 
	 	let ThisArray = this.props.Results[1].Filtered_IDS;
	 	win = this.countResult(ThisArray,'W')
		lose = this.countResult(ThisArray,'L')
		draw = this.countResult(ThisArray,'D')		
		total = win+lose+draw;
		winpercetage = ((win/total) * 100).toFixed(2)
		pieData = [{name:'Win',value:win},{name:'Lose',value:lose}];
	 }
  
  shouldComponentUpdate(nextProps, nextState){ return true;}
  
  componentWillUpdate(nextProps, nextState){ 
 
 	console.log(nextProps.Results[1].Filtered_IDS.length, this.props.Results[1].Filtered_IDS.length)
		 if(nextProps.Results[1].Filtered_IDS.length !=  this.props.Results[1].Filtered_IDS.length)
		 	{
				// Raw Stats
					let ThisArray = nextProps.Results[1].Filtered_IDS;
					win  = this.countResult(ThisArray,'W')
					lose = this.countResult(ThisArray,'L')
					draw = this.countResult(ThisArray,'D')		
					total = win+lose+draw;
					winpercetage = ((win/total) * 100).toFixed(2)
					pieData = [{name:'Win',value:win},{name:'Lose',value:lose}];
			}
  }
  
  render() {
	return (
		<section id="variables">
			<div class="container-fluid nopadding">
				<Display_Pie_Chart  Data={pieData} title="Win Lose Ratio"  />
				<div class="row">
					<Widget  Archclass='ach_1' widgetSize="col-md-6 col-sm-6 col-xs-6" heading="Wins" icon="fa-trophy" value={win} Link={"/"} />
					<Widget  Archclass='ach_1' widgetSize="col-md-6 col-sm-6 col-xs-6" heading="Lost" icon="fa-trophy" value={lose} Link={"/"} />
					<Widget  Archclass='ach_1' widgetSize="col-md-6 col-sm-6 col-xs-6" heading="Draws" icon="fa-trophy" value={draw} Link={"/"} />
				<Widget  Archclass='ach_1' widgetSize="col-md-6 col-sm-6 col-xs-6" heading="Win Rate" icon="fa-trophy" value={winpercetage} Link={"/"} />
				</div>
			</div>
		</section>
    );
  }
}