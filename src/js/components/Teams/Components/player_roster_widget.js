import React from "react";

export default class TeamName extends React.Component {

  componentWillMount(){}
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){}
  
  render() {
	return (
		<div class="col-md-3 col-sm-3 col-xs-6">
					<div class="widget widget-stats">
						<div class="stats-icon"><i class='fa fa fa-certificate'></i></div>
						<div class="stats-info">
							<h4>{this.props.title}</h4>
							<p>{this.props.value}</p>	
						</div>
					</div>
				</div>	
    );
  }
}