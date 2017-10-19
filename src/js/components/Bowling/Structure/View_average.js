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
		import Pie_DisplayOnly from "../../Global/pies/Pie_DisplayOnly"
	// Tables
		import Stage_Table_Count_Years from "../../Global/table/Stage_Table_Count_Years";
		import Stage_Table_Count_Items from "../../Global/table/Stage_Table_Count_Items";
	// Bars

// Variables
// Ints
var Count=0;
// Objects
var Tab_List=[],Tab_Graph=[],Line_Average_PerGame=[],TH=[],pie_Over_count=[],Table_Over_Count=[],Years=[], TableAddArray=[];


@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
export default class BasicStats extends React.Component {	
	
	// Object Functions
	// Pies
	CreatePieCountArray(Player)
		{
			pie_Over_count=[];
			var ThisYear=0, CheckYear=0,t=0,AddEconomy=0,yearEconomy=0;

			Player.map((game,i)=>{
				
					if(game.Bowling_WicketsTaken > 0)
						{
							ThisYear = game.Date.split('/');
							if(CheckYear != ThisYear[2])
								{
									if(t !=0)
										{
											var SaveYear = ThisYear[2] - 1;
											SaveYear = '20'+SaveYear;
											yearEconomy = yearEconomy.toFixed(2)
											yearEconomy = parseFloat(yearEconomy);
											pie_Over_count.push({name:SaveYear,value:yearEconomy})
											}

									CheckYear = ThisYear[2]
									t=0;
									AddEconomy=0;
									yearEconomy=0;
							}	
							
						AddEconomy = AddEconomy + game.Bowling_Average
						yearEconomy = AddEconomy / t;
						t++
							
					}
			if(Player.length-1 == i)	
				{
						var SaveYear = 20+ThisYear[2];
						yearEconomy = yearEconomy.toFixed(2)
						yearEconomy = parseFloat(yearEconomy);
						pie_Over_count.push({name:SaveYear,value:yearEconomy})
					}
			})
	}
	
	
	
	// Lines
	Create_Line_Average_PerGame(Player)
		{
			var CurrentAverage = this.props.BATTING.Facts["0"].Bowling_Average_Career;
			Line_Average_PerGame=[]
			Player.map((game,i)=>{			
				if(game.Bowling_WicketsTaken > 0)
					{
						Line_Average_PerGame.push({
								Date:game.Date,
								Current_Average:CurrentAverage,
								Career_Average:game.Bowling_Average_Career
							});
						}
			})
	}

	
	// Tables
	createTablePlayedCountYears(Player)
		{
			Table_Over_Count=[], TableAddArray=[];
			var SelectedTeam=false, StoreEconomy=0, TeamEconomy=0, t=0;
			Player.map((game,i)=>{	
					if(game.Bowling_WicketsTaken > 0 ){			
						Table_Over_Count.push({name:game.Against, value:game.Bowling_Average})
					}
				})
				
		
			Table_Over_Count.sort(function(a, b){
				if(a.name < b.name) return -1;
				if(a.name > b.name) return 1;
				return 0;
			})

			Table_Over_Count.map((game,i)=>{
					if(game.name !=SelectedTeam)
						{
							TeamEconomy = TeamEconomy.toFixed(2)
							TeamEconomy = parseFloat(TeamEconomy);
							TableAddArray.push({name:SelectedTeam,value:TeamEconomy})
							SelectedTeam = game.name;
							StoreEconomy=0
							t=0;
							}
					
					t++
					StoreEconomy = StoreEconomy+game.value;
					TeamEconomy = StoreEconomy/t;	
		})
	}
			
			
	componentWillMount(){ 
	
		// Set Vars
		var PlayerObject = this.props.BATTING.BattingObject;

		// Set Stage INT
		Count = this.props.BATTING.Facts["0"].Bowling_Average_Career;
		
		// Create Objects
		// Pies
		this.CreatePieCountArray(PlayerObject)
		
		//Lines
		this.Create_Line_Average_PerGame(PlayerObject)
		
		
		// Tables
		TH=["Team","Average"];
		this.createTablePlayedCountYears(PlayerObject)
	
		// Create Tabs
		
		/* Add Content to the 1st Tab */
		Tab_List = [
			{chart:<Stage_Table_Count_Items 
						Title="Averages by Opposition" 
						TableHeader={TH} 
						TableRow={TableAddArray} 
						DisplayClass="col-md-12" />},
		]
		
		
		/* Add graphs to the 2nd Tab */
		Tab_Graph=[
			{chart:<Pie_DisplayOnly 
						Data={pie_Over_count} 
						TableHeader={TH} 
						Title="Bowling Average over the Years" />},
							
			{chart:<Create_Lines_Double 
							Data={Line_Average_PerGame} 
							Title="Career Averages" 
							Line1="Current_Average" 
							Line2="Career_Average"
							XaxisLabel="Date"
							Height={300}/>},
		]	
	}
	
	render () {
			return (
				<div id="stage">
					<StatStage 
						Title="Career Economy" 
						WidgetCount={Count}
						Tab_List={Tab_List}
						Tab_Graph={Tab_Graph}
					/>
				</div>
			)
	}
}