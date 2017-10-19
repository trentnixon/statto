import React from "react";
import { connect } from "react-redux";
// Globals

import TableRow from "./Components/TableRow";
import Disclaimer from "./Components/Disclaimer";

@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			BATTING:store.BATTING
		}
	})
export default class MyStatto extends React.Component {
	componentWillMount(){ }
	render () {
			return (
			<section id="basicInfo">
				<div class="row">	
					<div class="col-md-12">
							<h1 class="page-header">My Statto</h1>
					</div>	
				</div>
				<div class="row">
						<div class="panel panel-inverse" data-sortable-id="ui-widget-2">
                        	<div class="panel-heading">    
                            	<h4 class="panel-title">Missing Games?</h4>
                        	</div>
                        	<div class="panel-body">
								<p>Run the diagnositic on your LMS account to in sure we have all games included in your statistics</p>
								
								<table class="table table-striped">
                                <thead>
                                    <tr>
                                        <td>Discipline</td>
										<td>Games Registered</td>
										<td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
					
					<TableRow Title="Batting" path="bat" buttonText="Check Batting"  total={this.props.BATTING.Facts["0"].NumInnings}/>
					<TableRow Title="Bowling" path="ball" buttonText="Check Bowling"  total={this.props.BATTING.Facts["0"].Bowling_innings}/>
					<TableRow Title="Keeping" path="keep" buttonText="Check Keeping" total={this.props.BATTING.Facts["0"].Keeping_Games}/>
                    
					            </tbody>
                            </table>
								<Disclaimer />
                     		</div>
                    	</div>
					</div>
				</section>
		)
  }
}