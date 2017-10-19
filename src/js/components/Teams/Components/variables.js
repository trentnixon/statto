import React from "react";


import Variable_Year from "./variable_year";
import Variable_Grade from "./variable_grade";

export default class Variables extends React.Component {

  render() {
	return (
			<div class="alert alert-success fade in m-b-15">
				<div class="row">
					<div class="col-md-6 col-xs-12 col-sm-6"><Variable_Year {...this.props}/></div>
					<div class="col-md-6 col-xs-12 col-sm-6"><Variable_Grade {...this.props} /></div>
				</div>
			</div>
    );
  }
}