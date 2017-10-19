import React from "react";

export default class NavBarLogo extends React.Component {
	
  componentWillMount(){} 
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){}
  
  render() {
    
	return (
			<div>
				<div class="image">
					<i class="fa fa-user" aria-hidden="true"></i>
				</div>
				<div class="info">
					{this.props.Name}
				</div>
			</div>
    );
  }
}