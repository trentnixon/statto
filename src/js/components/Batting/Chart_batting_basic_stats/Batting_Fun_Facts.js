import React from "react";
import { connect } from "react-redux";

var fiftyAverage =0;
@connect((store) =>{
		return{
			FACTS:store.BATTING
		}
	})
export default class BasicStats extends React.Component {
	
	componentWillMount(){ 
		var FF = this.props.FACTS.Facts[0];
		
		// 50s
		fiftyAverage = FF.NumInnings / FF.fifty;
		fiftyAverage = fiftyAverage.toFixed(2);
	}
	render () {
			
			return (
				<div id="BasicStats">
				
				<div class="panel panel-inverse" data-sortable-id="table-basic-4">
                        <div class="panel-heading">
                            <h4 class="panel-title">{this.props.Title}</h4>
                        </div>
                        <div class="panel-body">
                            <table class="table table-striped">
                                <tbody>
									<tr>
										<td>
											Its been  0d.0h.0s since your last LMS run
										</td>
									</tr>
									<tr>
										<td>
											You currently Average a <strong> 50 </strong> 
											every <strong> {fiftyAverage} </strong> 
											 innings, with your last # games ago
										</td>
									</tr>
									<tr><td># games till 10000 LMS Runs which could be on this date #</td></tr>
									<tr><td>Your most common mode of dismissal is #. having been out # times this way</td></tr>
									<tr><td>Your Favorite batting position is # with # of your runs from this spot</td></tr>
									<tr><td>Your Favorite team to bat against is #. You have smashed a massive # runs against them</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
				</div>
			)
  }

}