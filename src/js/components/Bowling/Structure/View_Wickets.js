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
					pie_Over_count.push({year:game.Date,value:game.Bowling_WicketsTaken})
				})
	}
	
	// Lines
		Create_Line_Average_PerGame(Player)
			{
	
			Line_Runs_vs_Wickets_Career=[]
			Player.map((game,i)=>{			
				if(game.Bowling_OversBowled_parsed > 0)
					{
						Line_Runs_vs_Wickets_Career.push({Date:game.Date,Runs:game.Bowling_CareerRunsBetweenWickets, Balls:game.Bowling_Career_StrikeRate});
						}
			})
		}
	
		Create_Wickets_vs_Overs_Career(Player)
			{
				
			Line_Overs_vs_Wickets_Career=[]
			Player.map((game,i)=>{			
				if(game.Bowling_OversBowled_parsed > 0)
					{
						Line_Overs_vs_Wickets_Career.push({Date:game.Date,OversBowled:game.Bowling_Total_Overs_Bowled,WicketsTaken:game.Bowling_TotalWicketsTaken});
						}
			})
		}

		
		Create_CompareStrikerate(Player)
			{
				Line_GSR_vs_CSR=[]
				Player.map((game,i)=>{			
				if(game.Bowling_OversBowled_parsed > 0 && game.Bowling_strikeRate != 'Infinity' )
					{
						Line_GSR_vs_CSR.push({Date:game.Date,Game:game.Bowling_strikeRate,Career:game.Bowling_Career_StrikeRate});
						}
			})
		}	
	
	
	
	// Tables
	createTablePlayedCountYears(Player)
		{
			Table_Over_Count=[];
			Player.map((game,i)=>{	
					if(game.Bowling_BallsBowled > 0 && game.Bowling_WicketsTaken > 0){			
						Table_Over_Count.push({name:game.Against, value:game.Bowling_WicketsTaken})
					}
				})
	}
			
			
	componentWillMount(){ 
	
		// Set Vars
		var PlayerObject = this.props.BATTING.BattingObject;

		// Set Stage INT
		Count = this.props.BATTING.Facts["0"].Bowling_CareerWickets;
		
		
		// Create Objects
		// Pies
		this.CreatePieCountArray(PlayerObject)
		
		//Lines
		this.Create_Line_Average_PerGame(PlayerObject)
		this.Create_Wickets_vs_Overs_Career(PlayerObject)
		this.Create_CompareStrikerate(PlayerObject)
		
		// Tables
		TH=["Team","Wickets"];
		this.createTablePlayedCountYears(PlayerObject)
	
	
	
		// Create Tabs
		
		/* Add Content to the 1st Tab */
		Tab_List = [
			{chart:<Stage_Table_Count_Items 
						Title="Wickets by Opposition" 
						TableHeader={TH} 
						TableRow={Table_Over_Count} 
						DisplayClass="col-md-12" />},
		
		
		]
		
		
		/*
			New Graphs
			// pie - percentage chance of taking a wicket
			game wicket percentage
			10% of 1 wicket
			50% 0 wickets
			5%
		
		
		*/
		
		/* Add graphs to the 2nd Tab */
		Tab_Graph=[
			{chart:<Create_Pie_Count_Items 
						Data={pie_Over_count} 
						Title="Wickets Taken by Year" />},
							
			{chart:<Create_Lines_Double 
							Data={Line_Runs_vs_Wickets_Career} 
							Title="Runs vs Balls per Wicket (Career Average)" 
							Line1="Runs"
							Line2="Balls" 
							XaxisLabel="Date"
							Height={300}/>},
			{chart:<Create_Lines_Double 
							Data={Line_Overs_vs_Wickets_Career} 
							Title="Wickets vs Overs" 
							Line1="OversBowled"
							Line2="WicketsTaken" 
							XaxisLabel="Date"
							Height={300}/>},
			{chart:<Create_Lines_Double 
							Data={Line_GSR_vs_CSR} 
							Title="Career Strikerate vs Game Strikerate (balls per wicket)" 
							Line1="Game"
							Line2="Career" 
							XaxisLabel="Date"
							Height={300}/>},
					
		]
	
	
	}
	
	render () {

			return (
				<div id="stage">
					<StatStage 
						Title="Career Wickets" 
						WidgetCount={Count}
						Tab_List={Tab_List}
						Tab_Graph={Tab_Graph}
					/>
				</div>
			)
	}
}