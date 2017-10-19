import store from "../store/store";

export function Calculate_Achievements(Player,Achievements)
	{
		var Display_Achievements=[];

	//console.log(Player,Achievements);
		// Career
		// Num Games
		Achievements.Career.NumberofGames.values.map((num,i)=>{ 
				if(num < Player.GameCount){Display_Achievements['Career_Game']=i}			
		})
		
		Achievements.Career.OppositionTeams.values.map((num,i)=>{ 
				if(num < Player.NumInnings){Display_Achievements['Career_Opposition']=i}			
		})
		
		Achievements.Career.TeamsPlayedFor.values.map((num,i)=>{ 
				if(num < Player.NumInnings){Display_Achievements['Career_TeamsPlayedFor']=i}			
		})
		
		
		// Batting
		// Num Runs
		
		Achievements.Batting.NumberofRuns.values.map((num,i)=>{ 
				if(num <= Player.TotalScore){ Display_Achievements['Batting_Runs']=i}			
		})	
		Achievements.Batting.BattingAverage.values.map((num,i)=>{ 
				if(num <= Player.Average){ Display_Achievements['Batting_Average']=i}			
		})	
		Achievements.Batting.BattingHighestScore.values.map((num,i)=>{ 
				if(num <= Player.HighestScore){ Display_Achievements['Batting_HighestScore']=i}			
		})
		Achievements.Batting.BattingStrikeRate.values.map((num,i)=>{ 
				if(num <= Player.StrikeRate){ Display_Achievements['Batting_StrikeRate']=i}			
		})			
		Achievements.Batting.BallsFaced.values.map((num,i)=>{ 
				if(num <= Player.BallsFaced){ Display_Achievements['Balls_Faced']=i}			
		})	
		Achievements.Batting.Notouts.values.map((num,i)=>{ 
				if(num <= Player.NotOuts){ Display_Achievements['Batting_NotOut']=i}			
		})
		Achievements.Batting.LMS50.values.map((num,i)=>{ 
				if(num <= Player.fifty){ Display_Achievements['Batting_50s']=i}			
		})
		Achievements.Batting.LMS100.values.map((num,i)=>{ 
				if(num <= Player.hundreds){ Display_Achievements['Batting_100s']=i}			
		})
		Achievements.Batting.Ducks.values.map((num,i)=>{ 
				if(num <= Player.Ducks){ Display_Achievements['Batting_Ducks']=i}			
		})
		Achievements.Batting.LT20.values.map((num,i)=>{ 
				if(num <= Player.LessThantwenty){ Display_Achievements['Batting_LT20']=i}			
		})
		Achievements.Batting.Twenties.values.map((num,i)=>{ 
				if(num <= Player.twenty){ Display_Achievements['Batting_Twenties']=i}			
		})
		Achievements.Batting.Thirties.values.map((num,i)=>{ 
				if(num <= Player.thirty){ Display_Achievements['Batting_Thirties']=i}			
		})
			
		Achievements.Batting.StrikeRate200.values.map((num,i)=>{ 
				if(num <= Player.ST200){ Display_Achievements['Batting_ST200']=i}			
		})
		
	
		// Bowling
		// Wickets
		Achievements.Bowling.Bowling_Wickets.values.map((num,i)=>{ 
				if(num <= Player.Bowling_CareerWickets){ Display_Achievements['Bowling_Wickets']=i}			
		})
		// Average runs per wicket
		//console.log(Player, Player.Bowling_Career_Economy_Rate);
		Achievements.Bowling.Bowling_Average.values.map((num,i)=>{ 
				if(num >= Player.Bowling_Average_Career){ Display_Achievements['Bowling_Average']=i}			
		})
		// Economy
		Achievements.Bowling.Bowling_Economy.values.map((num,i)=>{ 
				if(num >= Player.Bowling_Career_Economy_Rate){ Display_Achievements['Bowling_Economy']=i}			
		})
		//Bowling_StrikeRate
		Achievements.Bowling.Bowling_StrikeRate.values.map((num,i)=>{ 
				if(num >= Player.Bowling_Career_StrikeRate){ Display_Achievements['Bowling_Strike_Rate']=i}			
		})
		// Num Overs
		Achievements.Bowling.Bowling_Overs.values.map((num,i)=>{ 
				if(num <= Player.Bowling_CompleteOvers){ Display_Achievements['Bowling_Overs']=i}			
		})
		// BOwled Out
		Achievements.Bowling.Bowling_BowledOut.values.map((num,i)=>{ 
				if(num <= Player.Bowling_BowledOut){ Display_Achievements['Bowling_BowledOut']=i}			
		})		
		// < 20 
		Achievements.Bowling.Bowling_under20.values.map((num,i)=>{ 
				if(num <= Player.Bowling_under20){ Display_Achievements['Bowling_under20']=i}			
		})	
		// > 30
		Achievements.Bowling.Bowling_Over30.values.map((num,i)=>{ 
				if(num <= Player.Bowling_Over30){ Display_Achievements['Bowling_Over30']=i}			
		})	
		
		// FA's
		Achievements.Bowling.Bowling_2fa.values.map((num,i)=>{ 
				if(num <= Player.Bowling_2fa){ Display_Achievements['Bowling_2fa']=i}			
		})
		Achievements.Bowling.Bowling_3fa.values.map((num,i)=>{ 
				if(num <= Player.Bowling_3fa){ Display_Achievements['Bowling_3fa']=i}			
		})
		Achievements.Bowling.Bowling_4fa.values.map((num,i)=>{ 
				if(num <= Player.Bowling_4fa){ Display_Achievements['Bowling_4fa']=i}			
		})
		Achievements.Bowling.Bowling_5fa.values.map((num,i)=>{ 
				if(num <= Player.Bowling_5fa){ Display_Achievements['Bowling_5fa']=i}			
		})

		return (dispatch) => {
				dispatch({type:"DISPLAY_ACHIEVEMENTS_FETCHED",payload:Display_Achievements});
				dispatch({type:"SET_ACHIEVEMENTS_FETCHED",payload:true});
				dispatch({type:"UI_ACHIEVEMENTS_TRUE_FETCHED",payload:true});
			}
		}