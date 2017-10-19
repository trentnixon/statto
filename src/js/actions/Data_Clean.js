// JavaScript Document
import store from "../store/store";
import { Batting, Formguide, WorldRankings } from "./CalculateStats.js";

export function clean_Player(Player){
		var NewPlayer=[];	
		
		Player.map((game,i)=>{
			
				var from = game.meta.Date[0].split("/");
				var UnixDate = new Date('20'+from[2], from[1] - 1, from[0]);
				
				NewPlayer.push({
					Game_Venue:game.meta.Venue["0"],
					Game_Umpire:game.meta.Umpire["0"],
					Game_1st_Innings:game.meta.First_Innings["0"],
					Game_2nd_Innings:game.meta.Second_Innings["0"],
					Game_Against:game.meta.Against["0"],
					Game_Against_id:game.meta.Against_id["0"],
					Game_Playing_For:game.meta.Playing_For["0"],
					Game_Playing_For_ID:game.meta.Playing_For_ID["0"],
					Game_First_Score:game.meta.First_Score["0"],
					Game_First_Wickets:game.meta.First_Wickets["0"],
					Game_First_Overs:game.meta.First_Overs["0"],
					Game_Second_Score:game.meta.Second_Score["0"],
					Game_Second_Wickets:game.meta.Second_Wickets["0"],
					Game_Second_Overs:game.meta.Second_Overs["0"],
					Game_Winner_Name:game.meta.Winner_Name["0"],
					Game_Winner_ID:game.meta.Winner_ID["0"],
					Game_Winner_Summary:game.meta.Winner_Summary["0"],
					Game_MOM_ID:game.meta.MOM_ID["0"],
					Game_MOM:game.meta.MOM["0"],
					Batting_Position:game.meta.Batting_Position["0"],
					Batting_How_Out:game.meta.How_Out["0"],
					Game_Details_Fetched:game.meta.Game_Details_Fetched["0"],
					
					
					Batting_ADJPoints:game.meta.Batting_ADJPoints["0"],
					Batting_BallsFaced:game.meta.Batting_BallsFaced["0"],
					Batting_GamePoints:game.meta.Batting_GamePoints["0"],
					Batting_LeaugeWeight:game.meta.Batting_LeaugeWeight["0"],
					Batting_PitchWeight:game.meta.Batting_PitchWeight["0"],
					Batting_Rank:game.meta.Batting_Rank["0"],
					Batting_Runscored:game.meta.Batting_Runscored["0"],
					Batting_TimeWeighting:game.meta.Batting_TimeWeighting["0"],
					Batting_WeeklyAverage:game.meta.Batting_WeeklyAverage["0"],
					Bowling_ADJPoints:game.meta.Bowling_ADJPoints["0"],
					Bowling_Figures:game.meta.Bowling_Figures["0"],
					Bowling_GamePoints:game.meta.Bowling_GamePoints["0"],
					Bowling_LeaugeWeight:game.meta.Bowling_LeaugeWeight["0"],
					Bowling_OversBowled:game.meta.Bowling_OversBowled["0"],
					Bowling_PitchWeight:game.meta.Bowling_PitchWeight["0"],
					Bowling_Rank:game.meta.Bowling_Rank["0"],
					Bowling_TimeWeighting:game.meta.Bowling_TimeWeighting["0"],
					Bowling_WeeklyAverage:game.meta.Bowling_WeeklyAverage["0"],
					Date:game.meta.Date["0"],
					UnixDate:UnixDate,
					GameID:game.meta.GameID["0"],
					Team:game.meta.Team["0"],
					keeper_AdjPoints:game.meta.keeper_AdjPoints["0"],
					keeper_Caught:game.meta.keeper_Caught["0"],
					keeper_GamePoints:game.meta.keeper_GamePoints["0"],
					keeper_LeaugeWeight:game.meta.keeper_LeaugeWeight["0"],
					keeper_PitchWeight:game.meta.keeper_PitchWeight["0"],
					keeper_Rank:game.meta.keeper_Rank["0"],
					keeper_Stumping:game.meta.keeper_Stumping["0"],
					keeper_TimeWeighting:game.meta.keeper_TimeWeighting["0"],
					keeper_WeeklyAverage:game.meta.keeper_WeeklyAverage["0"],
					
					
					})
			})
			
			NewPlayer.sort(function(a, b) {
    			return new Date(b.UnixDate) - new Date(a.UnixDate);
			});
			
			//store.dispatch({ type:"PLAYER_STATS_REVERSED_FETCHED",payload:NewPlayer });
			
			NewPlayer.reverse();
			
			store.dispatch({ type:"PLAYER_STATS_FETCHED",payload:NewPlayer });
			store.dispatch({ type:"UI_PLAYER_TRUE_FETCHED",payload:true });
			
			
			
			
			
		// Form Guide
			Formguide(NewPlayer, 10);
		// Batting STATS
			Batting(NewPlayer);	
		// World Ranking
			WorldRankings(NewPlayer);
	}