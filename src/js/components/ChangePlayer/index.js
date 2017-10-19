import React from "react";
import { connect } from "react-redux";
// Globals

import PlayerSearch from "../Structure/Components/Nav-Bar-Search-Form";


@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			BATTING:store.BATTING
		}
	})
export default class ChangePlayer extends React.Component {
	componentWillMount(){ }
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){
		if(this.props.BATTING.Facts["0"].Batting_World_Rank != nextProps.BATTING.Facts["0"].Batting_World_Rank){
				nextProps.history.push('/'+nextProps.UI.PLAYER.LMSID+'/') 
		 }
	}
	render () {
			return (
			<section id="basicInfo">
				<div class="row">	
					<div class="col-md-12">
							<h1 class="page-header">Change Player</h1>
					</div>	
				</div>
				<div class="row">
						<div class="panel panel-inverse" data-sortable-id="ui-widget-2">
                        	<div class="panel-heading">    
                            	<h4 class="panel-title"></h4>
                        	</div>
                        	<div class="panel-body">
								<PlayerSearch {...this.props}/>	
                     		</div>
                    	</div>
					</div>
				</section>
		)
  }
}