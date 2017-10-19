// JavaScript Document
import store from "../store/store";

function SortByDate(SortObject)
	{
		var NewArray = SortObject.sort(function(a, b) {
    		return new Date(b.UnixDate) - new Date(a.UnixDate);
		});
			return NewArray;
		}

function fixInt2(value)
	{
		value = value.toFixed(2)
		value = parseFloat(value);
		return value;
		}

function foo(arr) {
		var a = [], b = [], prev;
		arr.sort();
		for ( var i = 0; i < arr.length; i++ ) {
			if ( arr[i] !== prev ) {
				a.push(arr[i]);
				b.push(1);
			} else {
				b[b.length-1]++;
			}
			prev = arr[i];
		}
		return [a, b];
	}


export function Batting(Player){


	// Game Details
	var GameCount=0;
	
	// Batting Details
	var average=0,totalScore=0, batted=0, notout=0, StrikeRate=0, totalBallsFaced=0, CurrentAverage=0, NotOuts=0, Innings=0, HighestScore=0, Ducks=0,LessThantwenty=0, twenty=0, thirty=0, fifty=0, hundreds=0, Batting_World_Rank=0, GameID=0, NotoutThisGame=false, ST200=0, AverageBallsFaced=0,Batting_How_Out,Batting_Position;
	
	// Bowling
	var Bowling_World_Rank = 0, BowlingGameCount=0,   OversBowled=0, OversBowledParsed=0, BowlingFigures=0,
		GameFigures=0,		 RunsConceded=0,	 TotalRunsConceded=0,	WicketsTaken=0, 
		TotalWicketsTaken=0, BowlingAverage=0,	EconomyRate=0,			CompleteOvers=0,
		CareerEconomyRate=0, Bowling_Average=0, Bowling_Average_Career=0, BowlingstrikeRate=0,
		BowlingCareerStrikeRate=0, BallsBowled=0, CareerBallsBolwed=0,	BestBowlingWickets=0,
		BestBowlingRuns=100000,	BestBowlingFigures=0,	BowledOut=0,	Bowling_Over30=0,
		Bowling_under20=0, fa1=0, fa2=0, fa3=0, fa4=0, fa5=0, fa6=0;	
	
	//Keeping
	var keeping_ranking=0,keeping_games=0, Keeping_catches_career=0, Keeping_catches=0,
		Keeping_stumpings_career=0, Keeping_stumpings=0, Keeping_DidiKeep=false, keeping_GamePoints=0;
	
	
	// Objects
	var battingObject = [], Facts=[];
	
	// Map Stats
	Player.map((game,i)=>{

			
			NotoutThisGame = false;
			
			var GameID, Game_Details_Fetched,Game_Venue,Game_Umpire,Game_1st_Innings,Game_2nd_Innings,Game_Against,Game_Against_id,Game_Playing_For,Game_Playing_For_ID,Game_First_Score,Game_First_Wickets,Game_First_Overs,Game_Second_Score,Game_Second_Wickets,Game_Second_Overs,Game_Winner_Name,Game_Winner_ID,Game_Winner_Summary,Game_MOM_ID,Game_MY_MOM;		
			
			/* **************************** */			
			/* Game Details 
			/* **************************** */
				GameID = game.GameID;		
				Game_Details_Fetched = game.Game_Details_Fetched;
				Game_Umpire = game.Game_Umpire;		
				Game_Venue = game.Game_Venue;
				Game_1st_Innings = game.Game_1st_Innings;	
				Game_2nd_Innings	= game.Game_2nd_Innings;	
				Game_Against	= game.Game_Against;	
				Game_Against_id	= game.Game_Against_id;	
				Game_Playing_For= game.Game_Playing_For;	
				Game_Playing_For_ID= game.Game_Playing_For_ID;	
				Game_First_Score= game.Game_First_Score;	
				Game_First_Wickets= game.Game_First_Wickets;	
				Game_First_Overs= game.Game_First_Overs;	
				Game_Second_Score= game.Game_Second_Score;	
				Game_Second_Wickets= game.Game_Second_Wickets;	
				Game_Second_Overs= game.Game_Second_Overs;	
				Game_Winner_Name= game.Game_Winner_Name;	
				Game_Winner_ID= game.Game_Winner_ID;	
				Game_Winner_Summary= game.Game_Winner_Summary;	
				Game_MOM_ID= game.Game_MOM_ID;	
				Game_MY_MOM= game.Game_MY_MOM;	
					
			/* ************END GAME **************** */	
			
				
			var BallsFaced = game.Batting_BallsFaced;
			var GameDate = game.Date;
			var Score =  game.Batting_Runscored;
			var didibat = 1;
								
			/* **************************** */
			/* Batting 
			/* ****************************** */
			// Position and dismissal
				Batting_How_Out = game.Batting_How_Out;
				Batting_Position = game.Batting_Position;
			// Get num Bats
				if(BallsFaced == ''){ didibat = 0; BallsFaced=0; } else if(BallsFaced > 0){Innings = Innings+1}				
			// Not Outs
				if(Score.indexOf("*") != -1){ didibat = 0; NotOuts = NotOuts+1;NotoutThisGame=true }		
				batted = batted+didibat;
										
			// Get total Score
				Score = parseInt(Score);
				if(isNaN(Score)){Score = 0;}
				totalScore = totalScore+Score;
				//console.log(totalScore);				
			/* Calc Average */									
				average = totalScore/batted;
				average = average.toFixed(2);
				average = parseInt(average)	
				if(isNaN(average)){average = 0;}
			/* Highest Score */
				if(Score > HighestScore){ HighestScore = Score; }
			// Ducks
				if(Score == 0){ if(BallsFaced > 0 && game.Batting_Runscored.indexOf("*") == -1){Ducks = Ducks +1;}}	
			// less then 20
				if(Score < 20 && game.Batting_BallsFaced != '' ){ LessThantwenty = LessThantwenty +1; }
			// More then 20
				if(Score > 19 && Score < 30 ){ twenty = twenty +1;}
			// More then 30
				if(Score > 29 && Score < 40 ){ thirty = thirty +1; }
			// More then 50
				if(Score > 49 && Score < 100 ){ fifty = fifty +1; }
			// More then 100
				if(Score >= 100){ hundreds = hundreds +1; }
			
			/* Batting Balls Faced */		
				BallsFaced = parseInt(BallsFaced);
				totalBallsFaced = totalBallsFaced+BallsFaced;
			// Strike Rate
				StrikeRate = totalScore/totalBallsFaced*100;
				StrikeRate = StrikeRate.toFixed(2);
				if(Score/BallsFaced*100 > 200){ ST200++; }
				StrikeRate = parseInt(StrikeRate)
			// Batting Ranking
				if(!isNaN(parseInt(game.Batting_Rank))){Batting_World_Rank = game.Batting_Rank;}	
				Batting_World_Rank = parseInt(Batting_World_Rank);
			/* **************************** */
			/* Bowling 
		
				Bowling_Figures
				Bowling_GamePoints
				Bowling_OversBowled
				Bowling_Rank

			/* ****************************** */
			
				
			// Figures		
			BowlingFigures = game.Bowling_Figures;
			GameFigures = BowlingFigures.split('/')
			
			// Runs per game and Overall			
			RunsConceded = parseInt(GameFigures[1]);
			if(isNaN(RunsConceded)){RunsConceded = 0;}
			
			TotalRunsConceded = TotalRunsConceded + RunsConceded;
			if(isNaN(TotalRunsConceded)){TotalRunsConceded = 0;}
			
			// Find Num Wickets
			WicketsTaken = parseInt(GameFigures[0]);
			if(isNaN(WicketsTaken)){WicketsTaken = 0;}
			
			if(WicketsTaken == 1){ fa1 = fa1+1}
			if(WicketsTaken == 2){ fa2 = fa2+1}
			if(WicketsTaken == 3){ fa3 = fa3+1}
			if(WicketsTaken == 4){ fa4 = fa4+1}
			if(WicketsTaken == 5){ fa5 = fa5+1}
			if(WicketsTaken == 6){ fa6 = fa6+1}
			
			
			
			TotalWicketsTaken = TotalWicketsTaken + WicketsTaken;
			if(isNaN(TotalWicketsTaken)){TotalWicketsTaken = 0;}	
				
			// Bowling Rank
			/*Bowling_World_Rank = parseInt(game.Bowling_Rank);
			if(isNaN(Bowling_World_Rank)){Bowling_World_Rank = 0;}	
			*/
			if(!isNaN(parseInt(game.Bowling_Rank))){Bowling_World_Rank = parseInt(game.Bowling_Rank);}
			
			// Overs Bowled
			OversBowled = game.Bowling_OversBowled;
			OversBowledParsed = parseInt(game.Bowling_OversBowled);
			if(isNaN(OversBowledParsed)){OversBowledParsed = 0;}	
			if(OversBowledParsed == 4){BowledOut = BowledOut +1;}
			CompleteOvers = CompleteOvers + OversBowledParsed;
				
			// Over Under
			if( RunsConceded > 29){ Bowling_Over30 = Bowling_Over30 +1;}
			if( RunsConceded < 21 && OversBowledParsed > 0){ Bowling_under20 = Bowling_under20 +1;}	
				
			// Balls Bowled
			BallsBowled= OversBowledParsed*5;
			if(isNaN(BallsBowled)){BallsBowled = 0;}
			
			if(BallsBowled > 0){BowlingGameCount++}
			
			
			CareerBallsBolwed= CompleteOvers*5;
			if(isNaN(CareerBallsBolwed)){CareerBallsBolwed = 0;}
				
			// Weekly Runs Average
			EconomyRate = RunsConceded/OversBowledParsed;
			if(isNaN(EconomyRate)){EconomyRate = 0;}
			EconomyRate = fixInt2(EconomyRate)
			
			CareerEconomyRate = TotalRunsConceded/CompleteOvers;
			if(isNaN(CareerEconomyRate)){CareerEconomyRate = 0;}
			CareerEconomyRate = fixInt2(CareerEconomyRate)			
			
			// StrikeRate
			BowlingstrikeRate = (OversBowledParsed * 5) /WicketsTaken;
			if(isNaN(BowlingstrikeRate)){BowlingstrikeRate = 0;}
			BowlingstrikeRate = fixInt2(BowlingstrikeRate)
			
			BowlingCareerStrikeRate = (CompleteOvers * 5)/TotalWicketsTaken;
			if(isNaN(BowlingCareerStrikeRate)){BowlingCareerStrikeRate = 0;}
			BowlingCareerStrikeRate = fixInt2(BowlingCareerStrikeRate)
			
			
			// Runs between wickets
			Bowling_Average= RunsConceded/WicketsTaken;
			if(isNaN(Bowling_Average)){Bowling_Average = 0;}
			Bowling_Average = fixInt2(Bowling_Average)
			
			Bowling_Average_Career= TotalRunsConceded/TotalWicketsTaken;
			if(isNaN(Bowling_Average_Career)){Bowling_Average_Career = 0;}
			Bowling_Average_Career = fixInt2(Bowling_Average_Career)
			
		
			// Best Bowling
			if(WicketsTaken > BestBowlingWickets){ 
				
				BestBowlingWickets = WicketsTaken;
				BestBowlingRuns =RunsConceded;
				BestBowlingFigures =BowlingFigures;	
					if(RunsConceded < BestBowlingRuns )
						{
							BestBowlingRuns =RunsConceded; 
							BestBowlingFigures =BowlingFigures;
							}
			}
			/* **************************** */
			/* Keeping
			/* ****************************** */
			
			
			//game.keeper_GamePoints
			
			if(!isNaN(parseInt(game.keeper_Caught)))
				{
					//console.log(game.keeper_Caught,game.keeper_Stumping, game.keeper_Rank, game.keeper_GamePoints)
					//console.log(parseInt(game.keeper_GamePoints));
					keeping_games = keeping_games+1;
					Keeping_DidiKeep = true;
			
				}
	
					// Catches
					Keeping_catches = parseInt(game.keeper_Caught) ;
					if(isNaN(Keeping_catches)){Keeping_catches = 0;}					
					Keeping_catches_career = Keeping_catches_career + Keeping_catches
					
					// Stumpings
					Keeping_stumpings = parseInt(game.keeper_Stumping);
					if(isNaN(Keeping_stumpings)){Keeping_stumpings = 0;}					
					Keeping_stumpings_career = Keeping_stumpings_career + Keeping_stumpings
					
					//console.log(Keeping_stumpings, Keeping_stumpings_career)
					
					// Ranking
					if(!isNaN(parseInt(game.keeper_Rank))){keeping_ranking = parseInt(game.keeper_Rank);}	
					// Game points			
					if(!isNaN(parseInt(game.keeper_GamePoints))){keeping_GamePoints = game.keeper_GamePoints;}
			
			/* ****************************** */
			// Create Objects
			/* ****************************** */			
			battingObject.push({
					
					GameID:game.GameID,
					GameCount:i,
					Game_Details_Fetched:Game_Details_Fetched,
					Date:game.Date,
					UnixDate:game.UnixDate,
					Game_Venue:Game_Venue,
					Against:game.Team,
						
					Game_Details_Fetched:Game_Details_Fetched,
					Game_Umpire:Game_Umpire,
					Game_1st_Innings:Game_1st_Innings,
					Game_2nd_Innings:Game_2nd_Innings,	
					Game_Against:Game_Against,
					Game_Against_id:Game_Against_id,
					Game_Playing_For:Game_Playing_For,	
					Game_Playing_For_ID:Game_Playing_For_ID,	
					Game_First_Score:Game_First_Score,
					Game_First_Wickets:Game_First_Wickets,	
					Game_First_Overs:Game_First_Overs,
					Game_Second_Score:Game_Second_Score,
					Game_Second_Wickets:Game_Second_Wickets,	
					Game_Second_Overs:Game_Second_Overs,
					Game_Winner_Name:Game_Winner_Name,
					Game_Winner_ID:Game_Winner_ID,
					Game_Winner_Summary:Game_Winner_Summary,	
					Game_MOM_ID:Game_MOM_ID,
					Game_MY_MOM:Game_MY_MOM,
					
					Runs:game.Batting_Runscored,
					Runs_parsed:Score,
					Runs_Total:totalScore,
					NotoutThisGame:NotoutThisGame,
					BallsFaced:BallsFaced, 
					BallsFaced_Total:totalBallsFaced,
					Average:average,
					StrikeRate:StrikeRate,
					Batting_World_Rank:Batting_World_Rank,
					GamePoints:game.Batting_GamePoints,
					Batting_Position:Batting_Position,
					Batting_How_Out:Batting_How_Out,
					
					Bowling_Figures:BowlingFigures,
					Bowling_RunsConceded:RunsConceded,
					Bowling_TotalRunsConceded:TotalRunsConceded,
					
					Bowling_WicketsTaken:WicketsTaken,
					Bowling_TotalWicketsTaken:TotalWicketsTaken,
					
					Bowling_OversBowled:OversBowled,
					Bowling_OversBowled_parsed:OversBowledParsed,
					Bowling_Total_Overs_Bowled:CompleteOvers,
					
					Bowling_Weekly_Economy_Rate:EconomyRate,
					Bowling_Career_Economy_Rate:CareerEconomyRate,
					
					Bowling_strikeRate:BowlingstrikeRate,
					Bowling_Career_StrikeRate:BowlingCareerStrikeRate,
					
					Bowling_Average:Bowling_Average,
					Bowling_Average_Career:Bowling_Average_Career,
					
					Bowling_BallsBowled:BallsBowled,
					Bowling_CareerBallsBolwed:CareerBallsBolwed,
					Bowling_Rank:Bowling_World_Rank,
					Bowling_GamePoints:parseInt(game.Bowling_GamePoints),
					
					Keeping_catches:Keeping_catches,
					Keeping_catches_career:Keeping_catches_career,
					Keeping_stumpings:Keeping_stumpings,
					Keeping_stumpings_career:Keeping_stumpings_career,
					Keeping_ranking:keeping_ranking,
					Keeping_GamePoints:keeping_GamePoints,
					Keeping_DidiKeep:Keeping_DidiKeep
					
				})
		
			GameCount++;
		})
			
			AverageBallsFaced = totalBallsFaced/Innings;
			AverageBallsFaced = fixInt2(AverageBallsFaced)
			
			Facts.push({
				GameCount:GameCount,
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
				Batting_World_Rank:Batting_World_Rank,
				AverageBallsFaced:AverageBallsFaced,
				Bowling_ranking:Bowling_World_Rank,
				Bowling_CareerWickets:TotalWicketsTaken,
				Bowling_Best:BestBowlingFigures,
				Bowling_Average_Career:Bowling_Average_Career,
				Bowling_Total_Runs_Conceded:TotalRunsConceded,
				Bowling_Career_Economy_Rate:CareerEconomyRate,
				
				Bowling_Career_StrikeRate:BowlingCareerStrikeRate,
				Bowling_CareerBallsBolwed:CareerBallsBolwed,
				
				Bowling_innings:BowlingGameCount,
				
				Bowling_CompleteOvers:CompleteOvers,
				Bowling_BowledOut:BowledOut,
				
				Bowling_Over30:Bowling_Over30,
				Bowling_under20:Bowling_under20,
				
				Bowling_1fa:fa1,
				Bowling_2fa:fa2,
				Bowling_3fa:fa3,
				Bowling_4fa:fa4,
				Bowling_5fa:fa5,
				Bowling_6fa:fa6,
				ST200:ST200,
				
				Keeping_Games:keeping_games,
				Keeping_catches_career:Keeping_catches_career,
				Keeping_stumpings_career:Keeping_stumpings_career,
				Keeping_ranking:keeping_ranking
			})
	
	// Dispatch Objects
	//	console.log(battingObject);
	
	store.dispatch({ type:"SET_BATTING_OBJECT_FETCHED",payload:battingObject });	
	store.dispatch({ type:"SET_BATTING_FACTS_OBJECT_FETCHED",payload:Facts });
	
	store.dispatch({ type:"UI_BATTING_TRUE_FETCHED",payload:true });
	store.dispatch({ type:"UI_FACTS_TRUE_FETCHED",payload:true });
	// Reset UI to check profile again.
	store.dispatch({type:"SET_UI_UPDATEPROFILE",payload:true});
	store.dispatch({type:"SET_UI_UPDATEPROFILE_PROGRESS",payload:false});
	store.dispatch({type:"SET_SEARCH_BAR",payload:false});
	store.dispatch({type:"SET_STATTO_UPDATE",payload:false});
	store.dispatch({type:"SET_ACHIEVEMENTS_FETCHED",payload:false});
	
	
	
	
	
	// Collect Team Data for reducer
	
	// move to the top
	function FindTeam(id, data)
		{
			let StoredName;
			data.map((game,i)=>{		
				if(game.Game_Playing_For_ID == id)
					{
						StoredName =game.Game_Playing_For;
				}
			})
			return StoredName;
	}
	
	let Teams=[],TeamID=[], TeamsTab,TeamsIDTab, MyTeams=[],FindTeamName;
	battingObject.map((game,i)=>{
				Teams[i]= game.Game_Playing_For;
				TeamID[i]=game.Game_Playing_For_ID
			})
	
	TeamsTab = foo(Teams)
	TeamsIDTab = foo(TeamID)

	TeamsIDTab[1].map((team, i)=>{
		if(team > 2)
			{
				FindTeamName =  FindTeam(TeamsIDTab[0][i], battingObject);
				MyTeams.push({'team':FindTeamName,teamid:TeamsIDTab[0][i], teamCount:team})
		}
	})
	// Save Teams to the store
	store.dispatch({type:"SET_TEAMS",payload:MyTeams});
	//console.log(MyTeams)
}


/* ********************************************************************************************************************************* */
/* ********************************************************************************************************************************* */
/* ********************************************************************************************************************************* */
/* Form Guide */
/* ********************************************************************************************************************************* */
/* ********************************************************************************************************************************* */
/* ********************************************************************************************************************************* */

export function Formguide(Player, Limit)
	{
	
		var FormGuideArray;
		// batting
		
		var Innings=0,NotOut=0, DNB=0,TotalRuns=0,RunsObject=0,Average=0,BallsFaced_Total=0,HighestScore=0,Ducks=0,LessThantwenty=0,twenty=0,fifty=0,hundreds=0,thirty=0,BattingRank=0;
		var FormGuideFacts =[];
		var BattingAverageObject =[],BattingTotalsObject =[],BattingBallsFacedObject =[], FormObject=[];
		// bowling
		var RunsConceded=0,TotalRunsConceded=0,CompleteWicketsTaken=0,FormWickets=0,BowlingAverage=0,completeBowlingAverage=0, GameFigures, OversBowled=0, Bowling_Rank=0, OverAverage=0, CompleteOvers=0;
		
		var BowlingAverageObject=[], BowlingPerWeekObject=[]
		// keeping
		
		//console.log(Player);
		FormGuideArray = Player.reverse();
		FormGuideArray = FormGuideArray.slice(0,10)
		//console.log(FormGuideArray);
		
		FormGuideArray.reverse().map((game,i)=>{
			
		/* *************************************************** */
		/* Batting Form Guide */
		/* *************************************************** */		
			// Vars
				var didibat = 1;
				var GameDate = game.Date;
				var Score =  game.Batting_Runscored;
				var BallsFaced = game.Batting_BallsFaced;
				var TeamName = game.Team;
			
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
				BallsFaced_Total = BallsFaced_Total+BallsFaced
			// Create Total Runs Scored in Guide
				TotalRuns = TotalRuns + Score;
			/* Highest Score */
				if(Score > HighestScore){ HighestScore = Score; }
			// Ducks
				if(Score == 0){ if(BallsFaced > 0){Ducks = Ducks +1;}}	
			// less then 20
				if(Score < 20 && game.Batting_BallsFaced != '' ){LessThantwenty = LessThantwenty +1; }
			// More then 20
				if(Score > 19 && Score < 30 ){ twenty = twenty +1;  }
			// More then 30
				if(Score > 29 && Score < 50 ){ thirty = thirty +1; }
			// More then 50
				if(Score > 49 && Score < 100 ){ fifty = fifty +1; }
			// More then 100
				if(Score > 100){ hundreds = hundreds +1; }	
			//
				Average = TotalRuns/(Innings-NotOut);
				Average = Average.toFixed(2);
				if(isNaN(Average)){Average = 0;}
		
		/* *************************************************** */
		/* Bowling Form Guide */
		/* *************************************************** */	
			
			// Bowling Figures
			var BowlingFigures = game.Bowling_Figures;	
			
			// Find Num Wickets		
			GameFigures = BowlingFigures.split('/')
			FormWickets = parseInt(GameFigures[0]);
			if(isNaN(FormWickets)){FormWickets = 0;}
			CompleteWicketsTaken = CompleteWicketsTaken + FormWickets;
			
			// Runs off the over
				RunsConceded = parseInt(GameFigures[1]);
				if(isNaN(RunsConceded)){RunsConceded = 0;}
				TotalRunsConceded = TotalRunsConceded + RunsConceded;
			
			// Bowling Overs
				OversBowled = parseInt(game.Bowling_OversBowled); 	
				if(isNaN(OversBowled)){OversBowled = 0;}
				CompleteOvers = CompleteOvers + OversBowled;
			
			// Rankings
				Bowling_Rank= game.Bowling_Rank;
			
	
			// Runs vs Wickets				
				BowlingAverage = RunsConceded/FormWickets;
				if(isNaN(BowlingAverage)){BowlingAverage = 0;}
				BowlingAverage = parseInt(BowlingAverage.toFixed(2))
					
			// Weekly Runs Average
				OverAverage = RunsConceded/OversBowled;
				if(isNaN(OverAverage)){OverAverage = 0;}
				OverAverage = parseInt(OverAverage.toFixed(2))
				completeBowlingAverage = TotalRunsConceded/CompleteOvers;
				completeBowlingAverage = completeBowlingAverage.toFixed(2);
			// Create a Complete Object
			FormObject.push({
					
					Date:GameDate,
					Against:TeamName,
					
					Batting_Average:Average,
					Batting_Runs:Score,
					Batting_BallsFaced:BallsFaced,
					Batting_BallsFaced_Total:BallsFaced_Total,
					
					Bowling_Figures:BowlingFigures,
					Bowling_RunsConceded:RunsConceded,
					Bowling_Total_Runs:TotalRunsConceded,
					
					Bowling_Wickets:FormWickets,
					Bowling_WicketsTaken:CompleteWicketsTaken,
					
					Bowling_OversBowled:OversBowled,
					Bowling_Overs_Complete:CompleteOvers,
					
					Bowling_Average:BowlingAverage,
					Bowling_OverAverage:OverAverage
				
				})	
								
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
			BowlingAverage:completeBowlingAverage,
			RunsConceded:RunsConceded,
			WicketsTaken:CompleteWicketsTaken,
			Bowling_World_Rank:Bowling_Rank,
			CompleteOvers:CompleteOvers
		})
		
		store.dispatch({ type:"PLAYER_FORM_GUIDE_FETCHED",payload:true });
		store.dispatch({ type:"PLAYER_FORM_GUIDE_FACTS_FETCHED",payload:FormGuideFacts });
		store.dispatch({ type:"PLAYER_FORM_OBJECT_FETCHED",payload:FormObject });
		store.dispatch({ type:"UI_FORMGUIDE_TRUE_FETCHED",payload:true });	
		
		Player.reverse();
	}
	


/* ********************************************************************************************************************************* */
/* ********************************************************************************************************************************* */
/* ********************************************************************************************************************************* */
/* World Rankings  */
/* ********************************************************************************************************************************* */
/* ********************************************************************************************************************************* */
/* ********************************************************************************************************************************* */

	
 export function WorldRankings(Player){
			var BattingCurrent=9999, BowlingCurrent=9999, KeepingCurrent=9999, BattingNew,bowlingNew, keepingNew;
			var WorldRankings =[];
			Player.map((game,i)=>{
					
				
					BattingNew=parseInt(game.Batting_Rank)
					bowlingNew=parseInt(game.Bowling_Rank)
					keepingNew=parseInt(game.keeper_Rank)
					
					
					if(isNaN(BattingNew)){ BattingNew = BattingCurrent }else{ BattingCurrent = BattingNew}
					if(isNaN(bowlingNew)){ bowlingNew = BowlingCurrent }else{ BowlingCurrent = bowlingNew}
					if(isNaN(keepingNew)){ keepingNew = KeepingCurrent }else{ KeepingCurrent = keepingNew}
					
					WorldRankings.push({Date:game.Date, WR_Batting:parseFloat(BattingCurrent),WR_Bowling:parseFloat(BowlingCurrent),WR_Keeping:parseFloat(KeepingCurrent)})
					
				})
				store.dispatch({ type:"WORLD_RANKINGS_OBJECT_FETCHED",payload:WorldRankings });
		}

/* ********************************************************************************************************************************* */
/* ********************************************************************************************************************************* */
/* ********************************************************************************************************************************* */
/* Achievments  */
/* ********************************************************************************************************************************* */
/* ********************************************************************************************************************************* */
/* ********************************************************************************************************************************* */

	export function Achievements(Player)
		{
			Achievements=[];
			console.log(store)
			Player.map((game,i)=>{
				
				
				})
			
	
		store.dispatch({ type:"ACHIEVEMENTS_OBJECT_FETCHED",payload:Achievements });	
			
	}