import React from "react";


export default class Title extends React.Component {
  render() {
    return (
		<div class="col-md-12">
	      <h1 class="page-header">{this.props.copy}</h1>
    	</div>
	);
  }
}