import React from "react";
import { connect } from "react-redux";

// Import to stage
	import StatStage from "../../Global/StageBreakdown/";
// Import Components
	// Lines
		import Create_Lines_Single from "../../Global/lines/Create_Lines_Single";
		import Create_Lines_Double from "../../Global/lines/Create_Lines_Double";
		import Create_Lines_Triple from "../../Global/lines/Create_Lines_Triple";
	// Pies
		import Create_Pie_Count_Years from "../../Global/pies/PieCountYears";
		import Create_Pie_Count_Items from "../../Global/pies/PieCountNumItems";
	// Tables
		import Stage_Table_Count_Years from "../../Global/table/Stage_Table_Count_Years";
		import Stage_Table_Count_Items from "../../Global/table/Stage_Table_Count_Items";
	// Bars

// Variables
// Ints
var Count=0;
// Objects
var Tab_List=[],Tab_Graph=[],Line_Runs_vs_Wickets_Career=[],TH=[],pie_Over_count=[],Table_Over_Count=[],Line_Overs_vs_Wickets_Career=[],Line_GSR_vs_CSR=[];


@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
export default class Bowling_Wickets extends React.Component {
	
	// Object Functions
	// Pies
	CreatePieCountArray(Player)
		{
			pie_Over_count=[];
			Player.map((game,i)=>{			
					pie_Over_count.push({year:game.Date,value:game.Runs_parsed})
				})
	}
	
	// Lines
		Create_Line_Average_PerGame(Player)
			{
	
			Line_Runs_vs_Wickets_Career=[]
			Player.map((game,i)=>{			
				if(game.BallsFaced > 0)
					{
						Line_Runs_vs_Wickets_Career.push({Date:game.Date,Batting_Average:game.Average, Runs_Scored:game.Runs_parsed});
						}
			})
		}
	
		Create_Wickets_vs_Overs_Career(Player)
			{
				
			Line_Overs_vs_Wickets_Career=[]
			Player.map((game,i)=>{			
				if(game.BallsFaced > 0)
					{
						Line_Overs_vs_Wickets_Career.push({Date:game.Date,Career_Runs_Scored:game.Runs_Total});
						}
			})
		}

	
	
	
	// Tables
	createTablePlayedCountYears(Player)
		{
			Table_Over_Count=[];
			Player.map((game,i)=>{	
					if(game.BallsFaced > 0 && game.Runs_parsed > 0){			
						Table_Over_Count.push({name:game.Against, value:game.Runs_parsed})
					}
				})
	}
			
			
	componentWillMount(){ 
	
		// Set Vars
		var PlayerObject = this.props.BATTING.BattingObject;

		// Set Stage INT
		Count = this.props.BATTING.Facts["0"].TotalScore;
		
		
		// Create Objects
		// Pies
		this.CreatePieCountArray(PlayerObject)
		
		//Lines
		this.Create_Line_Average_PerGame(PlayerObject)
		this.Create_Wickets_vs_Overs_Career(PlayerObject)
		
		// Tables
		TH=["Team","Runs"];
		this.createTablePlayedCountYears(PlayerObject)
	
	
	
		// Create Tabs
		
		/* Add Content to the 1st Tab */
		Tab_List = [
			{chart:<Stage_Table_Count_Items 
						Title="Runs against Opposition" 
						TableHeader={TH} 
						TableRow={Table_Over_Count} 
						DisplayClass="col-md-12" />},
		
		
		]
		
		
		/* Add graphs to the 2nd Tab */
		Tab_Graph=[
			{chart:<Create_Pie_Count_Items 
						Data={pie_Over_count} 
						Title="Runs over the Years" />},
							
			{chart:<Create_Lines_Double 
							Data={Line_Runs_vs_Wickets_Career} 
							Title="Batting Average vs Runs Scored" 
							Line1="Batting_Average"
							Line2="Runs_Scored" 
							XaxisLabel="Date"
							Height={300}/>},
			{chart:<Create_Lines_Single 
							Data={Line_Overs_vs_Wickets_Career} 
							Title="Career Runs" 
							Line1="Career_Runs_Scored" 
							XaxisLabel="Date"
							Height={300}/>},		
		]
	
	
	}
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillUpdate(nextProps, nextState){
		if(this.props.BATTING.Facts["0"].Batting_World_Rank != nextProps.BATTING.Facts["0"].Batting_World_Rank){
				nextProps.history.push('/'+nextProps.UI.PLAYER.LMSID+'/') 
		 }
	}
	render () {

			return (
				<div id="stage">
					<StatStage 
						Title="Career Runs" 
						WidgetCount={Count}
						Tab_List={Tab_List}
						Tab_Graph={Tab_Graph}
					/>
				</div>
			)
	}
}