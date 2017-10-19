import React from "react";
import { connect } from "react-redux";
// component
	//Bars
		import Create_Stacked_Bars from "../Global/bars/Create_Stacked_Bars";
	//Lines
		import Create_Lines_Single from "../Global/lines/Create_Lines_Single";
		import Create_Lines_Double from "../Global/lines/Create_Lines_Double";
		import Create_Lines_Triple from "../Global/lines/Create_Lines_Triple";
	// Pies
		import Create_Pie_Count_Years from "../Global/pies/PieCountYears";
		import Create_Pie_Count_Items from "../Global/pies/PieCountNumItems";
		import Pie_IncrimentalAdd from "../Global/pies/Pie_IncrimentalAdd"
// Set Comonent Arrays
	var Graph_1=[], Graph_2=[], Graph_3=[],Graph_4=[];

@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
export default class BasicStats extends React.Component {
	
	// Create Objects for Charts
	// Stacked Bars
	CreateWicketsvsRuns(Player)
		{
			Graph_1=[];
			Player.map((game,i)=>{
				if(game.Keeping_DidiKeep)
					{
					if(game.Keeping_catches >0 || game.Keeping_stumpings > 0)
						{
						Graph_1.push({Team:game.Against,Caught_Behind:game.Keeping_catches,Stumpings:game.Keeping_stumpings});		
					}
				}
			})
		}
	
	// Lines 
	CreateWorldRanking(Player){
			Graph_4=[];
			Player.map((game,i)=>{			
				if(game.Keeping_ranking != 0)
					{
						Graph_4.push({Date:game.Date,Rank:game.Keeping_ranking});
						}
			})
		}
	
	// Pies
	CreatePieCountArray(Player)
		{
			Graph_3=[];
			Player.map((game,i)=>{	
				if(game.Keeping_catches > 0)
					{		
					//console.log(game.Against, game.Date, game.Keeping_catches);
					Graph_3.push({year:game.Date,value:game.Keeping_catches})
				}
			})
	}

	CreatePieCountArray2(Player)
		{
			Graph_2=[];
			Player.map((game,i)=>{	
				if(game.Keeping_stumpings > 0)
					{		
					//console.log(game.Against, game.Date, game.Keeping_catches);
					Graph_2.push({year:game.Date,value:game.Keeping_stumpings})
				}
			})
	}	
				
		
	
	// Mount Components	
	componentWillMount(){
		
		// Create Player Object
		var PlayerObject = this.props.BATTING.BattingObject;
		console.log(PlayerObject)
		// Create Stacked Bars
		this.CreateWicketsvsRuns(PlayerObject)
		// Line Chart
		this.CreateWorldRanking(PlayerObject)
		// Pie
		this.CreatePieCountArray(PlayerObject)
		this.CreatePieCountArray2(PlayerObject)
		
	}

	render () {
			
			return (
				<div id="HomePanel">
				
					<Create_Stacked_Bars 
							Data={Graph_1} 
							Title="Caught Behind vs Stumpings" 
							Bar1="Caught_Behind" 
							Bar2="Stumpings" 
							XaxisLabel="Team"/>
					
					<Create_Pie_Count_Items 
						Data={Graph_3} 
						Title="Caught Behind by Year" />	
					
					<Create_Pie_Count_Items 
						Data={Graph_2} 
						Title="Stumpings by Year" />			
					
					
					<Create_Lines_Single 
							Data={Graph_4} 
							Title="World Ranking - Progression" 
							Line1="Rank" 
							XaxisLabel="Date"
							Height={300}/>
				</div>
			)
	}
}