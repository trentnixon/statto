import React from "react";

let DisplayTeamName='';
export default class VariableFilterResults extends React.Component {

  componentWillMount(){}
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){}
  
  render() {
	return (
		<div class="container-fluid nopadding">
			<div class="alert alert-info fade in m-b-15">
				<strong>Filter:</strong> Year-{this.props.MYTEAMS.year} Grade-{this.props.MYTEAMS.grade}
			</div>
		</div>
    );
  }
}