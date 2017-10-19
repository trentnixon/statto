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
			var ThisYear=0, CheckYear=0,t=0,Add_Bowling_BallsBowled=0,year_wickets_taken=0,YearStrikeRate;

			Player.map((game,i)=>{
				
					if(game.Bowling_OversBowled_parsed > 0)
						{
							ThisYear = game.Date.split('/');
							if(CheckYear != ThisYear[2])
								{
									if(t !=0)
										{
											var SaveYear = ThisYear[2] - 1;
											SaveYear = '20'+SaveYear;
											YearStrikeRate = YearStrikeRate.toFixed(2)
											YearStrikeRate = parseFloat(YearStrikeRate);
											pie_Over_count.push({name:SaveYear,value:YearStrikeRate})
											}

									CheckYear = ThisYear[2]
									t=0;
									Add_Bowling_BallsBowled=0;
									year_wickets_taken=0;
									YearStrikeRate=0;
							}	
							
						Add_Bowling_BallsBowled = Add_Bowling_BallsBowled + game.Bowling_BallsBowled;
						year_wickets_taken = year_wickets_taken+game.Bowling_WicketsTaken
						
						YearStrikeRate = Add_Bowling_BallsBowled / year_wickets_taken;
						//console.log(CheckYear, Add_Bowling_BallsBowled, year_wickets_taken,YearStrikeRate)
						t++
							
					}
			if(Player.length-1 == i)	
				{
						var SaveYear = 20+ThisYear[2];
						YearStrikeRate = YearStrikeRate.toFixed(2)
						YearStrikeRate = parseFloat(YearStrikeRate);
						pie_Over_count.push({name:SaveYear,value:YearStrikeRate})
					}
			})
	}
	
	
	
	// Lines
	Create_Line_Average_PerGame(Player)
		{
			var CurrentSR = this.props.BATTING.Facts["0"].Bowling_Career_StrikeRate;
			Line_Average_PerGame=[]
			Player.map((game,i)=>{
						Line_Average_PerGame.push({
								Date:game.Date,
								Current_Strike_Rate:CurrentSR,
								Career_Strike_Rate:game.Bowling_Career_StrikeRate
							});
			})
	}

	
	// Tables
	createTablePlayedCountYears(Player)
		{
			Table_Over_Count=[], TableAddArray=[];
			var SelectedTeam=false, StoreEconomy=0, TeamEconomy=0, t=0;
			Player.map((game,i)=>{	
					if(game.Bowling_BallsBowled > 0 && game.Bowling_strikeRate !='Infinity'){			
						Table_Over_Count.push({name:game.Against, value:game.Bowling_strikeRate})
					}
				})
				
		
			Table_Over_Count.sort(function(a, b){
				if(a.name < b.name) return -1;
				if(a.name > b.name) return 1;
				return 0;
			})

			console.log(Table_Over_Count);
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
		Count = this.props.BATTING.Facts["0"].Bowling_Career_StrikeRate;
		
		// Create Objects
		// Pies
		this.CreatePieCountArray(PlayerObject)
		
		//Lines
		this.Create_Line_Average_PerGame(PlayerObject)
		
		
		// Tables
		TH=["Team","Strike Rate"];
		this.createTablePlayedCountYears(PlayerObject)
	
		// Create Tabs
		
		/* Add Content to the 1st Tab */
		Tab_List = [
			{chart:<Stage_Table_Count_Items 
						Title="Strike Rate by Opposition (min 1 wicket)" 
						TableHeader={TH} 
						TableRow={TableAddArray} 
						DisplayClass="col-md-12" />},
		]
		
		
		/* Add graphs to the 2nd Tab */
		Tab_Graph=[
			{chart:<Pie_DisplayOnly 
						Data={pie_Over_count} 
						TableHeader={TH} 
						Title=" Strike Rate over the Years" />},
							
			{chart:<Create_Lines_Double 
							Data={Line_Average_PerGame} 
							Title="Career Strike Rate" 
							Line1="Current_Strike_Rate" 
							Line2="Career_Strike_Rate"
							XaxisLabel="Date"
							Height={300}/>},
		]	
	}
	
	render () {
			return (
				<div id="stage">
					<StatStage 
						Title="Career Strike Rate" 
						WidgetCount={Count}
						Tab_List={Tab_List}
						Tab_Graph={Tab_Graph}
					/>
				</div>
			)
	}
}