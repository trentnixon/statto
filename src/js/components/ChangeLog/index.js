import React from "react";
import { connect } from "react-redux";
// Globals


export default class ChangePlayer extends React.Component {
	componentWillMount(){}

	render () {
			return (
			<section id="basicInfo">
				<div class="row">	
					<div class="col-md-12">
							<h1 class="page-header"></h1>
					</div>	
				</div>
				<div class="row">
						<div class="panel panel-inverse" data-sortable-id="ui-widget-2">
                        	<div class="panel-heading">    
                            	<h4 class="panel-title">Change Log</h4>
                        	</div>
                        	<div class="panel-body">
								<ul>
									
									<li>Version 21
										<ul>
										
											<li>Features
												<ul>
													<li>Desktop: Select New Player from top bar</li>
													<li>Mobile: Select New Player from Navigation </li>
													<li>Career Pods are now links (thanks ash)</li>
													<li>Mobile Navigation panel closes on touch or link select</li>
												</ul>
											</li>
											<li>Bug fixes
												<ul>
													<li>UI Reloads on new data fetch</li>
													<li>Bowling Achievement panels</li>
													<li>Scorecard select on history</li>
													<li>New Player select redirect to home page</li>
												</ul>
											</li>
										</ul>
									</li>
									
								</ul>
                     		</div>
                    	</div>
					</div>
				</section>
		)
  }
}