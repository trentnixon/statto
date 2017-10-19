// JavaScript Document
import axios from 'axios';


export function VS_Select_Team(Team){ 
		
		return (dispatch) => {
				dispatch({type:"SET_SELECTED_TEAM_FETCHED",payload:Team});
			}
	}
export function VS_Select_Team_Array(TeamArray){ 
		
		return (dispatch) => {
				dispatch({type:"SET_SELECTED_TEAM_ARRAY_FETCHED",payload:TeamArray});
			}
	}

export function VS_Select_Year(Year){ 
		
		return (dispatch) => {
				dispatch({type:"SET_SELECTED_YEAR_FETCHED",payload:Year});
			}
	}
export function VS_Select_Year_Array(YearArray){ 
		
		return (dispatch) => {
				dispatch({type:"SET_SELECTED_YEAR_ARRAY_FETCHED",payload:YearArray});
			}
	}	

export function VS_Select_Club(Year){ 
		
		return (dispatch) => {
				dispatch({type:"SET_SELECTED_CLUB_FETCHED",payload:Year});
			}
	}
export function VS_Select_Club_Array(YearArray){ 
		
		return (dispatch) => {
				dispatch({type:"SET_SELECTED_CLUB_ARRAY_FETCHED",payload:YearArray});
			}
	}	


export function VS_Select_Ground(Year){ 
		
		return (dispatch) => {
				dispatch({type:"SET_SELECTED_GROUND_FETCHED",payload:Year});
			}
	}
export function VS_Select_Ground_Array(YearArray){ 
		
		return (dispatch) => {
				dispatch({type:"SET_SELECTED_GROUND_ARRAY_FETCHED",payload:YearArray});
			}
	}	

export function VS_Select_Umpire(Year){ 
		
		return (dispatch) => {
				dispatch({type:"SET_SELECTED_UMPIRE_FETCHED",payload:Year});
			}
	}
export function VS_Select_Umpire_Array(YearArray){ 
		
		return (dispatch) => {
				dispatch({type:"SET_SELECTED_UMPIRE_ARRAY_FETCHED",payload:YearArray});
			}
	}		