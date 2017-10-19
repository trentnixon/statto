import React from "react";
import { connect } from "react-redux";
import ProgressBar from "./vs_ProgressBar";

var G=0,ST=0,STA=0,CB=0,CBA=0,ach='ach ach_4';
let Keeping_VS = [];

@connect((store) =>{
		return{
			BATTING:store.BATTING
		}
	})
export default class VS_Table extends React.Component {
		
	CreateStats(Player,Facts)
		{
			Keeping_VS = []
			
			G=0,ST=0,STA=0,CB=0,CBA=0;
			G = Player.length
			Player.map((game,i)=>{
				// CB
				CB = CB+ game.game.Keeping_catches;
				// CBA
				CBA = CB/G
				CBA=CBA.toFixed(2)
				//ST
				ST= ST+game.game.Keeping_stumpings;
				//STA
				STA = ST/G;
				STA=STA.toFixed(2)
			})
			
			Keeping_VS.push(
				{Title:'Caught Behind',	Color:ach, Total:CB,	Career:Facts["0"].Keeping_catches_career},
				{Title:'Stumpings',		Color:ach, Total:ST,	Career:Facts["0"].Keeping_stumpings_career},
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
					<h4 class="panel-title">Keeping</h4>
				</div>
				<div class="panel-body Dashboard_Table">
					{
						Keeping_VS.map((game,i)=>{
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