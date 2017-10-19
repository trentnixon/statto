import React from "react";
import { connect } from "react-redux";
// Globals
import SectionHeader from "./Global/SectionHeader";


@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER
		}
	})
export default class Teams extends React.Component {
	
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
							<h1 class="page-header">My Team Stats</h1>
					</div>	
					<div>
						<h2>Coming Soon</h2>
						
					</div>
				</section>
			)
  }

}