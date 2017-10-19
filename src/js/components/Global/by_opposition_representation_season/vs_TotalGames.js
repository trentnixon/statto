import React from "react";
import { connect } from "react-redux";
import Widget from "../../Global/Widget";	
import ProgressBar from "./vs_ProgressBar";

var T=0,HSP=0,HS=0,A=0,SR=0,OT=0,BF=0,ach='ach ach_6';
let Batting_VS = [];

@connect((store) =>{
		return{
			BATTING:store.BATTING
		}
	})
	
export default class VS_Table extends React.Component {
		
	CreateStats(Player, Facts)
		{
	
			T=0,HS=0,HSP=0,A=0,SR=0,OT=0,BF=0, Batting_VS=[];
			
			Player.map((game,i)=>{
				// Total
				T= T+game.game.Runs_parsed;
				// High Score
				if(game.game.Runs_parsed > HSP){ HS = game.game.Runs; HSP=game.game.Runs_parsed;}
				// Average
				if(game.game.Runs.indexOf("*") == -1 && game.game.BallsFaced > 0){ OT++}
				A=T/OT;
				A=A.toFixed(2)
				if(A == 'Infinity'){A=0;}
				if(isNaN(A)){A = 0;}
				// Strike Rate
				BF= BF+game.game.BallsFaced;
				SR = T/BF*100;
				SR = SR.toFixed(2);
			})
			
			let CHS = this.parseNum(Facts["0"].HighestScore);
			
		Batting_VS.push(
				{Title:'Games Played',Color:ach, Total:Player.length,	Career:Facts["0"].GameCount}
			)
	}	
			
	componentWillMount(){
		this.CreateStats(this.props.Player, this.props.BATTING.Facts)
	}
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillUpdate(nextProps, nextState){
		this.CreateStats(nextProps.Player, nextProps.BATTING.Facts)
	}	
	
	
	parseNum(num)
		{
			num = parseInt(num);
			if(isNaN(num)){num = 0;}
			return num;
	}	
	
  render() {
	  //console.log(T)
    return (	
	<div class="col-md-12">	 
		 <div class="panel panel-inverse" data-sortable-id="table-basic-4">
			<div class="panel-heading">
				<h4 class="panel-title">Games Played</h4>
			</div>
			<div class="panel-body Dashboard_Table">
				{
					Batting_VS.map((game,i)=>{
						let Percentage = this.parseNum(game.Total)/this.parseNum(game.Career)*100;
						let PercentageText = Percentage
						if(Percentage > 100){ Percentage = 100;}
						return(
							<div key={i} class="row Table_Row">
								<div class="col-md-12 ">
									<ProgressBar  
										Percentage={Percentage.toFixed(2)} 
										Color={game.Color} 
										Title={game.Title} 
										Total={game.Total} 
										PercentageText = {PercentageText.toFixed(2)}
										Career={game.Career}/>
								</div>
							</div>
							)
					})	
				}
			</div>
		</div> 
	</div>
	);
  }
}