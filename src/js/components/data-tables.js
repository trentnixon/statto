import React from "react";
import { connect } from "react-redux";

var DataStore, keys=[],TRs, TH=[], THFG=[], TRFG;

@connect((store) =>{
		return{
			BATTING:store.BATTING,
			FORMGUIDE:store.FORMGUIDE
		}
	})
	
export default class dataTables extends React.Component {
  constructor() { super();  }
  
  componentWillMount(){
	  	  DataStore = this.props.BATTING;
		  console.log(DataStore.BattingObject)

		TH=["GameID","Against","Date","Runs","Runs_parsed","Runs_Total","BallsFaced","BallsFaced_Total","Average","StrikeRate","Rank","GamePoints","Bowling Figures","RunsConceded","Total Runs","WicketsTaken","TotalWicketsTaken","Overs","Overs Parsed","Total Overs","Average per over","Career Average per over","Wickets vs balls","Career Wickets vs balls","Runs vs Wickets","Career Runs vs Wickets", "Balls Bowled","Career Balls Bowled","Bowling_Rank","Bowling_GamePoints"]
		  
		  TRs = DataStore.BattingObject.map((game, i)=>{
			  return(
								<tr key={i}>
									<td>{game.GameID}</td>
									<td>{game.Against}</td>
									<td>{game.Date}</td>
									<td>{game.Runs}</td>
									<td>{game.Runs_parsed}</td>
									<td>{game.Runs_Total}</td>
									<td>{game.BallsFaced}</td>
									<td>{game.BallsFaced_Total}</td>
									<td>{game.Average}</td>
									<td>{game.StrikeRate}</td>
									<td>{game.Rank}</td>
									<td>{game.GamePoints}</td>
									<td>{game.Bowling_Figures}</td>
									<td>{game.Bowling_RunsConceded}</td>
									<td>{game.Bowling_TotalRunsConceded}</td>
									<td>{game.Bowling_WicketsTaken}</td>
									<td>{game.Bowling_TotalWicketsTaken}</td>
									<td>{game.Bowling_OversBowled}</td>
									<td>{game.Bowling_OversBowled_parsed}</td>
									<td>{game.Bowling_Total_Overs_Bowled}</td>
									<td>{game.Bowling_Weekly_Average}</td>
									<td>{game.Bowling_Career_Average}</td>
									<td>{game.Bowling_strikeRate}</td>
									<td>{game.Bowling_Career_StrikeRate}</td>
									
									<td>{game.Bowling_RunsBetweenWickets}</td>
									<td>{game.Bowling_CareerRunsBetweenWickets}</td>
									
									<td>{game.Bowling_BallsBowled}</td>
									<td>{game.Bowling_CareerBallsBolwed}</td>
									
									<td>{game.Bowling_Rank}</td>
									<td>{game.Bowling_GamePoints}</td>			
								</tr>
							  )
			  })
	
	
	
	
	
	/*
		Against
		Batting_Average
		Batting_BallsFaced
		Batting_BallsFaced_Total
		Batting_Runs
		Bowling_Average
		Bowling_Figures
		Bowling_OverAverage
		Bowling_OversBowled
		Bowling_RunsConceded
		Bowling_Total_Runs
		Bowling_Wickets
		Bowling_WicketsTaken
		Date

	*/
	THFG=[
		"Date",
		"Against",
		"Batting_Runs",
		"Batting_Average",
		"Batting_BallsFaced",
		"Batting_BallsFaced_Total",
		"Bowling_Figures",
		"Bowling_RunsConceded",
		"Bowling_Total_Runs",
		"Bowling_OversBowled",
		"Bowling_Overs_Complete",
		"Bowling_Wickets",
		"Bowling_WicketsTaken",
		"runs 2 wickets",
		"runs per over"
	]
	var FormGuide = this.props.FORMGUIDE.FormGuide;
	console.log(FormGuide)
		
	TRFG = FormGuide.map((game,i)=>{
			return(
					<tr key={"thfg_"+i}>
						<td>{game.Date}</td>
						<td>{game.Against}</td>
						<td>{game.Batting_Runs}</td>
						<td>{game.Batting_Average}</td>
						<td>{game.Batting_BallsFaced}</td>
						<td>{game.Batting_BallsFaced_Total}</td>
						<td>{game.Bowling_Figures}</td>
						<td>{game.Bowling_RunsConceded}</td>
						<td>{game.Bowling_Total_Runs}</td>
						<td>{game.Bowling_OversBowled}</td>
						<td>{game.Bowling_Overs_Complete}</td>
						<td>{game.Bowling_Wickets}</td>
						<td>{game.Bowling_WicketsTaken}</td>
						<td>{game.Bowling_Average}</td>
						<td>{game.Bowling_OverAverage}</td>
					</tr>
			)
			
			})
		
	
	 }
  
  render() {
    
	return (
			<section id="basicInfo">
				<div class="row">
					<div class="col-md-12">
						<div class="panel panel-inverse" data-sortable-id="table-basic-4">
                        <div class="panel-heading">
                            <h4 class="panel-title">Complete Data Echo</h4>
                        </div>
                        <div class="panel-body">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        {
											TH.map((value,i)=>{
												return(<td key={i}>{value}</td>)
												})
											}
                                    </tr>
                                </thead>
                                <tbody>
									{TRs}
                                </tbody>
                            </table>
                        </div>
                    </div>
					</div>
				</div>
				
				
				<div class="row">
					<div class="col-md-12">
						<div class="panel panel-inverse" data-sortable-id="table-basic-4">
                        <div class="panel-heading">
                            <h4 class="panel-title">Form Guide Data</h4>
                        </div>
                        <div class="panel-body">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        {
											THFG.map((value,i)=>{
												return(<td key={i}>{value}</td>)
												})
											}
                                    </tr>
                                </thead>
                                <tbody>
									{TRFG}
                                </tbody>
                            </table>
                        </div>
                    </div>
					</div>
				</div>
					
			</section>
    );
  }
}