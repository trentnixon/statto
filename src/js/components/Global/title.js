import React from "react";


export default class Title extends React.Component {
  render() {
    return (
		<div class="sectionheader col-md-12">
	      <h1>{this.props.title}</h1>
    	</div>
	);
  }
}