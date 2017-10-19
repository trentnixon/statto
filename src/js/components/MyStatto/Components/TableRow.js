import React from "react";

// Globals
import Button from "./FetchData";

export default class TableRow extends React.Component {
	
		render(){
			return(
				<tr>
					<td>{this.props.Title}</td>
					<td>{this.props.total}</td>
					<td>
						<Button PrimaryText={this.props.buttonText} path={this.props.path}/>
					</td>
				</tr>
			)
		
		}
}