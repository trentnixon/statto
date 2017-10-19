import React from "react";

let extras =0;
export default  class Scorecard_Details extends React.Component {

	componentWillMount(){ }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){ }
	
	render () { 
		extras = this.props.Runs - this.props.AddedScore
			return (				
					<div class={this.props.DisplayClass}>
											<div class="panel-heading">
												<div class="panel-heading-btn">
													{this.props.Runs} / {this.props.Wickets} off {this.props.Overs} - {extras} Extras
												</div>
												<h4 class="panel-title">{this.props.Team}</h4>
											</div>
											<div class="panel-body nopadding">
												<div class="col-md-6 nopadding ScoreCard_Batting">
													
													<div class="scoreCardRow header">
														<div class="col-md-9 col-xs-6 nopadding">Batsman </div>
														<div class="col-md-1 col-xs-2">R</div>
														<div class="col-md-1 col-xs-2">BF</div>
														<div class="col-md-1 col-xs-2">SR </div>
													</div>
													
													{this.props.Batting}
													
													<div>
														<div class="col-md-9 col-xs-6 nopadding">Extras: </div>
														<div class="col-md-3 col-xs-6"> {extras} </div>
													</div>
												</div>
												<div class="col-md-5 col-md-offset-1  nopadding ScoreCard_Bowling">
													<div  class="scoreCardRow header">
														<div class="col-md-8 col-xs-6 nopadding">Bowler</div>
														<div class="col-md-1 col-xs-1">W</div>
														<div class="col-md-1 col-xs-1">R</div>
														<div class="col-md-1 col-xs-2">OB</div>
														<div class="col-md-1 col-xs-2">E</div>
													</div>													
													{this.props.Bowling}
												</div>
											</div>
										</div>
				)
	}
}		