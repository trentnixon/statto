// JavaScript Document
import store from "../store/store";


function SortByDate(SortObject)
	{
		var NewArray = SortObject.sort(function(a, b) {
    		return new Date(b.UnixDate) - new Date(a.UnixDate);
		});
		return NewArray;
		}


export function BattingAverage(Player){

	// Reset Vars
	var average=0, totalScore=0, batted=0, notout=0, StrikeRate=0, totalBallsFaced=0, CurrentAverage=0, NotOuts=0, Innings=0, HighestScore=0, Ducks=0,LessThantwenty=0, twenty=0, thirty=0, fifty=0, hundreds=0, RankPath=0, GameID=0;
	
	// Objects
	var AverageObject = [], StrikeRateObject=[],battingObject = [],ScoresObject =[],Facts=[],RankObject=[];
	// Map Stats
	
	Player.map((game,i)=>{
	
			var didibat = 1;
			var BallsFaced = game.meta.Batting_BallsFaced[0];
			var GameDate = game.meta.Date[0];
			var Score =  game.meta.Batting_Runscored[0];
			GameID = game.meta.GameID[0];
		
								
			/* **************************** */
			/* Batting Average
			/* ****************************** */
			// Get num Bats
				if(BallsFaced == ''){ didibat = 0; BallsFaced=0; } else{Innings = Innings+1}				
			// Not Outs
				if(Score.indexOf("*") != -1){ didibat = 0; NotOuts = NotOuts+1;}		
				batted = batted+didibat;
										
			// Get total Score
				Score = parseInt(Score);
				if(isNaN(Score)){Score = 0;}
				totalScore = totalScore+Score;
				console.log(totalScore);				
			/* Calc Average */									
				average = totalScore/batted;
				average = average.toFixed(2);
				average = parseInt(average)	
				if(isNaN(average)){average = 0;}
			/* Highest Score */
				if(Score > HighestScore){ HighestScore = Score; }
			// Ducks
				if(Score == 0){ if(BallsFaced > 0){Ducks = Ducks +1;}}	
			// less then 20
				if(Score < 20 && game.meta.Batting_BallsFaced[0] != '' ){ LessThantwenty = LessThantwenty +1; }
			// More then 20
				if(Score > 19 && Score < 30 ){ twenty = twenty +1;}
			// More then 30
				if(Score > 29 && Score < 40 ){ thirty = thirty +1; }
			// More then 50
				if(Score > 49 && Score < 100 ){ fifty = fifty +1; }
			// More then 100
				if(Score > 100){ hundreds = hundreds +1; }
			
			/* Batting Balls Faced */		
				BallsFaced = parseInt(BallsFaced);
				totalBallsFaced = totalBallsFaced+BallsFaced;
			// Strike Rate
				StrikeRate = totalScore/totalBallsFaced*100;
				StrikeRate = StrikeRate.toFixed(2);
				StrikeRate = parseInt(StrikeRate)
			// Batting Ranking
				RankPath = game.meta.Batting_Rank[0];
				RankPath = parseInt(RankPath);
				if(isNaN(RankPath)){RankPath = 0;}
				
			// create unix date
				var from = game.meta.Date[0].split("/");
				var UnixDate = new Date('20'+from[2], from[1] - 1, from[0]);
			/* ****************************** */
			// Create Objects
			/* ****************************** */
				if(average != 0){AverageObject.push({Date:GameDate,UnixDate:UnixDate,Team:game.meta.Team[0],Average:average})};
				StrikeRateObject.push({Date:GameDate,UnixDate:UnixDate,Team:game.meta.Team[0],StrikeRate:StrikeRate,Total:totalScore});
				if(game.meta.Batting_BallsFaced[0] != ''){ScoresObject.push({Date:GameDate,UnixDate:UnixDate,Team:game.meta.Team[0],Runs:Score,BallsFaced:game.meta.Batting_BallsFaced[0]})};
				
				if(RankPath !=0) {RankObject.push({Date:GameDate,UnixDate:UnixDate,Team:game.meta.Team[0],Rank:RankPath});}
				
				battingObject.push({
					Date:game.meta.Date[0],
					UnixDate:UnixDate,
					Against:game.meta.Team[0],
					Runs:game.meta.Batting_Runscored[0],
					BallsFaced:game.meta.Batting_BallsFaced[0],
					Rank:game.meta.Batting_Rank[0],
					PitchWeight:game.meta.Batting_PitchWeight[0],
					LeaugeWeight:game.meta.Batting_LeaugeWeight[0],
					GamePoints:game.meta.Batting_GamePoints[0],
					ADJPoints:game.meta.Batting_ADJPoints[0],
					TimeWeighting:game.meta.Batting_TimeWeighting[0],
					GameID:game.meta.GameID[0]
				})
		})
		
		Facts.push({
				Average:average,
				TotalScore:totalScore,
				StrikeRate:StrikeRate,
				BallsFaced:totalBallsFaced,
				NumInnings:Innings,
				NotOuts:NotOuts,
				HighestScore:HighestScore,
				Ducks:Ducks,
				LessThantwenty:LessThantwenty,
				twenty:twenty,
				thirty:thirty,
				fifty:fifty,
				hundreds:hundreds,
				Rank:RankPath
			})
	
	// Sort arrays by Date
	battingObject = SortByDate(battingObject)	
	AverageObject = SortByDate(AverageObject)
	StrikeRateObject = SortByDate(StrikeRateObject)
	ScoresObject = SortByDate(ScoresObject)
	RankObject = SortByDate(RankObject)
	
	// Dispatch Objects
	store.dispatch({ type:"SET_BATTING_OBJECT_FETCHED",payload:battingObject });	
	store.dispatch({ type:"SET_BATTING_AVERAGE_OBJECT_FETCHED",payload:AverageObject });
	store.dispatch({ type:"SET_BATTING_SCORES_OBJECT_FETCHED",payload:ScoresObject });
	store.dispatch({ type:"SET_BATTING_STRIKERATE_OBJECT_FETCHED",payload:StrikeRateObject });
	store.dispatch({ type:"SET_BATTING_RANK_OBJECT_FETCHED",payload:RankObject });
	store.dispatch({ type:"SET_BATTING_FACTS_OBJECT_FETCHED",payload:Facts });
}






/* *************************************** */
/* Form Guide */
/* *************************************** */


export function Formguide(Player, Limit)
	{
		
		console.log(Player)
		// batting
		var Innings=0,NotOut=0, DNB=0,TotalRuns=0,RunsObject=0,Average=0,BallsFacedAccum=0,HighestScore=0,Ducks=0,LessThantwenty=0,twenty=0,fifty=0,hundreds=0,thirty=0,BattingRank=0;
		var FormGuideFacts =[];
		var BattingAverageObject =[],BattingTotalsObject =[],BattingBallsFacedObject =[];
		// bowling
		var RunsConceded=0,WicketsTaken=0,BowlingAverage=0, GameFigures, OversBowled=0, Bowling_Rank=0, OverAverage=0, CompleteOvers=0;
		var BowlingAverageObject=[], BowlingPerWeekObject=[]
		
		
		Player = Player.slice(Math.max(Player.length - Limit, 1))
		Player.map((game,i)=>{
			
		/* *************************************************** */
		/* Batting Form Guide */
		/* *************************************************** */		
			// Vars
				var didibat = 1;
				var GameDate = game.Date;
				var Score =  game.meta.Batting_Runscored[0];
				var BallsFaced = game.meta.Batting_BallsFaced[0];
				var TeamName = game.meta.Team[0];
			
			// DNB
				if(BallsFaced == ''){ DNB++; BallsFaced=0}	
			// Not Outs	
				if(Score.indexOf("*") != -1){NotOut++;}
			// # of innings
				if(BallsFaced != ''){ Innings++ }		
			// Clean Score
				Score = parseInt(Score);
				if(isNaN(Score)){Score = 0;}
			// BallsFacedAccum
				BallsFaced = parseInt(BallsFaced)
				if(isNaN(BallsFaced)){BallsFaced = 0;}
				BallsFacedAccum = BallsFacedAccum+BallsFaced
			// Create Total Runs Scored in Guide
				TotalRuns = TotalRuns + Score;
			/* Highest Score */
				if(Score > HighestScore){ HighestScore = Score; }
			// Ducks
				if(Score == 0){ if(BallsFaced > 0){Ducks = Ducks +1;}}	
			// less then 20
				if(Score < 20 && game.meta.Batting_BallsFaced[0] != '' ){LessThantwenty = LessThantwenty +1; }
			// More then 20
				if(Score > 19 && Score < 30 ){ twenty = twenty +1;  }
			// More then 30
				if(Score > 29 && Score < 50 ){ thirty = thirty +1; }
			// More then 50
				if(Score > 49 && Score < 100 ){ fifty = fifty +1; }
			// More then 100
				if(Score > 100){ hundreds = hundreds +1; }	
			//
				Average = TotalRuns/Innings;
				Average = Average.toFixed(2);
				if(isNaN(Average)){Average = 0;}
						
			// Object Push
			BattingAverageObject.push({Date:GameDate,TeamName:TeamName,Average:Average})
			if(game.meta.Batting_BallsFaced[0] != ''){BattingTotalsObject.push({Date:GameDate,TeamName:TeamName,Runs:Score})}	
			BattingBallsFacedObject.push({Date:GameDate,TeamName:TeamName,BallsFaced:BallsFaced,BallsFacedAccum:BallsFacedAccum})	
		
		
		/* *************************************************** */
		/* Bowling Form Guide */
		/* *************************************************** */	
			
			
			    var BowlingFigures = game.meta.Bowling_Figures[0];	
				if(BowlingFigures != '')
						{
							// Find Num Wickets		
							OversBowled = game.meta.Bowling_OversBowled[0]; 	
							Bowling_Rank= game.meta.Bowling_Rank[0];
							GameFigures = BowlingFigures.split('/')
							
							RunsConceded = RunsConceded + parseInt(GameFigures[1]);
							WicketsTaken = WicketsTaken + parseInt(GameFigures[0]);
							
							BowlingAverage = RunsConceded/WicketsTaken;
							BowlingAverage = BowlingAverage.toFixed(2)	
					
							// Weekly Runs Average
							OverAverage = parseInt(GameFigures[1])/OversBowled;
							
							// Full num of overs bowled
							CompleteOvers = CompleteOvers +parseInt(OversBowled);
							BowlingAverageObject.push({Date:GameDate,TeamName:TeamName,BowlingAverage:BowlingAverage})
							BowlingPerWeekObject.push({Date:GameDate,TeamName:TeamName,OversBowled:OversBowled,RunsConceded:RunsConceded,WicketsTaken:WicketsTaken,OverAverage:OverAverage})
					}			
		}) // Close Map
		FormGuideFacts.push({
			Innings:Innings,
			TotalRuns:TotalRuns,
			Innings:Innings,
			NotOut:NotOut,
			DNB:DNB,
			Average:Average,
			HighestScore:HighestScore,
			Ducks:Ducks,
			LessThantwenty:LessThantwenty,
			twenty:twenty,
			thirty:thirty,
			fifty:fifty,
			hundreds:hundreds,
			BowlingAverage:BowlingAverage,
			RunsConceded:RunsConceded,
			WicketsTaken:WicketsTaken,
			BowlingRank:Bowling_Rank,
			CompleteOvers:CompleteOvers
		})
		
		store.dispatch({ type:"PLAYER_FORM_GUIDE_FETCHED",payload:true });
		store.dispatch({ type:"PLAYER_FORM_GUIDE_FACTS_FETCHED",payload:FormGuideFacts });	
		store.dispatch({ type:"PLAYER_FORM_AVERAGE_FETCHED",payload:BattingAverageObject });
		store.dispatch({ type:"PLAYER_FORM_RUNS_FETCHED",payload:BattingTotalsObject });
		store.dispatch({ type:"PLAYER_BALLSFACED_FETCHED",payload:BattingBallsFacedObject });
		store.dispatch({ type:"PLAYER_BOWLING_AVERAGE_FETCHED",payload:BowlingAverageObject });
		store.dispatch({ type:"PLAYER_BOWLING_PER_WEEK_FETCHED",payload:BowlingPerWeekObject });	
	}