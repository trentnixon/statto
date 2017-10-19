const InitialState ={
	Set:false,
	Levels:[
			{ id:0,name:"First Timer",class:"ach ach_0" },
			{ id:1,name:"The Park Cricketer",class:"ach_1 ach" },
			{ id:2,name:"The Club Cricketer",class:"ach_2 ach" },
			{ id:3,name:"The Grade Cricketer",class:"ach_3 ach" },
			{ id:4,name:"The Local Hero",class:"ach_4 ach" },
			{ id:5,name:"The Country Legend",class:"ach_5 ach" },
			{ id:6,name:"World Champ",class:"ach_6 ach" },
			{ id:7,name:"Franchise Owner",class:"ach_7 ach" }
		],
	Breakdown:{
			Career:{
				NumberofGames:{label:'Games',values:[0,10,20,50,100,200,500,1000]},
				OppositionTeams:{label:'opponents',values:[0,5,10,12,15,20,25,30]},
				TeamsPlayedFor:{label:'Teams',values:[0,3,5,7,8,9,10,20]}
				},
			Batting:{
				NumberofRuns:{label:'Runs',values:[0, 100,250,500,800,1000,2000,5000]},
				BallsFaced:{label:'Balls Faced',values:[0, 100,150,300,500,700,1000,1250]},
				StrikeRate200:{label:'200+ SR',values:[0, 1,5,10,15,20,25,50]},
				LT20:{label:'Scores < 20',values:[0,3,5,10,15,20,25,30]},
				Twenties:{label:'Scores in the 20s',values:[0, 1,5,10,15,20,25,30]},
				Thirties:{label:'Scores in the 30s',values:[0, 1,5,10,15,20,25,30]},
				LMS50:{label:'Scores over 50',values:[0, 1,5,10,15,20,25,30]},
				LMS100:{label:'Hundreds',values:[0, 1,2,3,4,5,7,10]},
				Ducks:{label:'Ducks',values:[0, 1,2,3,4,5,7,15]},
				Notouts:{label:'Notouts',values:[0, 1,5,10,15,20,50,80]},
				BattingPosition:{label:'Battng Positions',values:[0,1,2,3,4,5,6,7,]},
				BattingAverage:{label:'Average',values:[0,5,10,20,30,40,50,60]},
				BattingHighestScore:{label:'High Score',values:[0,20,30,40,50,80,100]},
				BattingStrikeRate:{label:'Strike Rate',values:[0, 10,50,80,100,150,200,250]}
				},
			Bowling:{
				Bowling_Wickets:{label:'Wickets', values:[0,10,20,50,100,140,200,250]},
				Bowling_Average:{label:'Average', values:[40,30,28,25,23,20,18,15]},
				Bowling_Economy:{label:'Economy', values:[15,12,9,8,7,6.5,6,5]},
				Bowling_StrikeRate:{label:'Strike Rate', values:[30,25,20,18,15,12,10,8]},
				Bowling_Overs:{label:'Overs', values:[0,50,100,250,300,500,700,1000]},
				Bowling_under20:{label:'< 20 Run Conceded', values:[0,10,20,50,80,120,150,200]},
				Bowling_Over30:{label:'> 30 Run Conceded', values:[0,10,20,50,80,120,150,200]},
				Bowling_BowledOut:{label:'Bowled Out', values:[0,20,50,80,100,120,150,200]},
				Bowling_2fa:{label:'2 Fa', values:[0,5,10,15,25,30,40,50]},
				Bowling_3fa:{label:'3 Fa', values:[0,3,5,8,12,15,18,20]},
				Bowling_4fa:{label:'4 Fa', values:[0,1,2,3,4,4,5,5]},
				Bowling_5fa:{label:'5 Fa', values:[0,1,2,2,4,4,5,5]},
				
				}
		}
	}




const Achievements_reducer = (state=InitialState, action) =>{
		switch(action.type){
			case "ACHIEVEMENTS_OBJECT_FETCHED":{
					return {...state, Achievements:action.payload}
					break
				}
			case "SET_ACHIEVEMENTS_FETCHED":{
					return {...state, Set:action.payload}
					break
				}
			case "DISPLAY_ACHIEVEMENTS_FETCHED":{
				return {...state, Display_Achievements:action.payload}
					break
				}
			}
		return state;
	}	
export default Achievements_reducer;	