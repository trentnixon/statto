import React from "react";
import { connect } from "react-redux";
import ProgressBar from "./vs_ProgressBar";	

var GW,GR,GO,G=0,W=0,BB=0,BBW=0,BBR=0,A=0,E=0,SR=0, OB=0, RC=0,ach='ach ach_2';
let Bowling_VS = [];

@connect((store) =>{
		return{
			BATTING:store.BATTING
		}
	})
export default class VS_Table extends React.Component {
		
	CreateStats(Player,Facts)
		{
			G=0,W=0,BB=0,BBW=0,BBR=999999,A=0,E=0,SR=0,RC=0,OB=0;
			G = Player.length;
			Bowling_VS=[];
			
			Player.map((game,i)=>{
				
				if(game.game.Bowling_BallsBowled > 0)
					{
						GW = parseInt(game.game.Bowling_WicketsTaken)	
						if(isNaN(GW)){GW = 0;}
						GR = parseInt(game.game.Bowling_RunsConceded)	
						if(isNaN(GR)){GR = 999999;}
						GO = parseInt(game.game.Bowling_OversBowled_parsed)	
						if(isNaN(GO)){GO = 0;}
						// W
						W=W+GW;
						//OB
						OB=OB+GO
						//RC
						RC=RC+GR
						//A
						A = RC/W;
						A = A
						if(A == 'Infinity'){A=0;}
						//E
						E =RC/OB;
						if(E == 'Infinity'){E=0;}
						//SR
						SR = (OB * 5)/W
						if(SR == 'Infinity'){SR=0;}
						
						//BB
				
						if(GW > BBW){
							BBW = GW;
							BBR = GR;
							BB =game.game.Bowling_Figures;
							console.log(GW, GR, BBW, BBR, BB)
						}
						else if(GW == BBW &&GR < BBR ){
							BBR = GR; 
							BBW = GW;
							BB = game.game.Bowling_Figures;
							console.log(GW, GR, BBW, BBR, BB)
						}
					}
		})
		Bowling_VS.push(
				{Title:'Wicket',		Color:ach, Total:W,				Career:Facts["0"].Bowling_CareerWickets},
				{Title:'Best Bowling',	Color:ach, Total:BB,			Career:BBW},
				{Title:'Runs Conceded',	Color:ach, Total:RC,			Career:Facts["0"].Bowling_Total_Runs_Conceded}, 
				{Title:'Average',		Color:ach, Total:A.toFixed(2),	Career:Facts["0"].Bowling_Average_Career},
				{Title:'Economy',		Color:ach, Total:E.toFixed(2),	Career:Facts["0"].Bowling_Career_Economy_Rate},
				{Title:'Strike Rate',	Color:ach, Total:SR.toFixed(2),	Career:Facts["0"].Bowling_Career_StrikeRate},
			)
	}		
		
	componentWillMount(){ this.CreateStats(this.props.Player,this.props.BATTING.Facts) }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){ this.CreateStats(nextProps.Player,nextProps.BATTING.Facts) }	
	
	parseNum(num) {
			num = parseInt(num);
			if(isNaN(num)){num = 0;}
			return num;
	}
		
  render() {
    return (
	<div class="col-md-4">
			<div class="panel panel-inverse" data-sortable-id="table-basic-4">
				<div class="panel-heading">
					<h4 class="panel-title">Bowling</h4>
				</div>
				<div class="panel-body Dashboard_Table"> 
					{
						Bowling_VS.map((game,i)=>{
						let Percentage = this.parseNum(game.Total)/this.parseNum(game.Career)*100;
						let PercentageText = Percentage;
						PercentageText = this.parseNum(PercentageText)
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