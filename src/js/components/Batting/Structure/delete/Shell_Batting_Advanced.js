import React from "react";
import { connect } from "react-redux";
// Globals
import SectionHeader from "../../Global/SectionHeader";


@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER
		}
	})
export default class ShellBattingAdvanced extends React.Component {
	
	componentWillMount(){ }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){
		
		console.log(nextProps)
	
	}

	render () {
			console.log(this.props)
			return (
				<section id="basicInfo">
					<div class="col-md-12">
							<h1>Advanced Batting Stats</h1>
					</div>	
				</section>
			)
  }

}