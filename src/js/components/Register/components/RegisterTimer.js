import React from "react";
import { Line, Circle } from 'rc-progress';

let TimeLeft='Calculating', Percentage=0;
export default class RegisterTimer extends React.Component {

	/*Estimiated time left*/
	secondsToHms(d) {
			d = Number(d);
		
			var h = Math.floor(d / 3600);
			var m = Math.floor(d % 3600 / 60);
			var s = Math.floor(d % 3600 % 60);
		
			return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
		}


	componentWillMount(){}	
	shouldComponentUpdate(NewProps, NewState){ return true;}
	componentWillUpdate(NewProps, NewState){
		
				console.log( NewProps.Found, NewProps.Added)
				let SecondsLeft = NewProps.Found - NewProps.Added;
				SecondsLeft = SecondsLeft*4;
				TimeLeft = this.secondsToHms(SecondsLeft)
				
				Percentage = NewProps.Added/NewProps.Found*100,
				Percentage = Percentage.toFixed(0);
				if(isNaN(Percentage)){Percentage = 0;}
	}

render(){
	
	return(
			<div class="row"> 
				<Line percent={Percentage} strokeWidth="4" strokeColor="#D3D3D3" />
				<p  class="pull-left">est time remaining : {TimeLeft}</p>
				<p class="pull-right">{Percentage}% Complete.</p>
			</div>
		)
	}			
}