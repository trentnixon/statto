import React from "react";

import Logo from "../../login/components/Logo";

export default class LoginHeader extends React.Component {

render(){
	
	return(
			<div class="login-header">
					<div class="brand">
						<Logo /> 
						{this.props.Header}
						<small>{this.props.SubHeader}</small>
					</div>
					<div class="icon">
						<i class="fa fa-sign-in"></i>
					</div>
				</div>
		)
	}			
}