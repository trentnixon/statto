import React from "react";
import { connect } from "react-redux";

var Teams=[],Limit=0, rows=[]
@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
export default class InningsOppositionCount extends React.Component {
	
	foo(arr) {
		var a = [], b = [], prev;
		arr.sort();
		for ( var i = 0; i < arr.length; i++ ) {
			if ( arr[i] !== prev ) {
				a.push(arr[i]);
				b.push(1);
			} else {
				b[b.length-1]++;
			}
			prev = arr[i];
		}
		return [a, b];
	}

	
	componentWillMount(){ 
	
		this.props.BATTING.BattingObject.map((game,i)=>{
				Teams[i]=game.Against;
			})
		
		var NewArrays = this.foo(Teams)
		Limit = NewArrays[0].length;
		rows=[]
		for (var i=0; i < Limit; i++) {
				if(NewArrays[1][i] > 1)
					{
						rows.push(<tr key={i}><td>{NewArrays[0][i]}</td><td>{NewArrays[1][i]}</td></tr>);
				}
		}							
	}
	render () {
			return (
				<div id="table">
					<div class="panel panel-inverse" data-sortable-id="table-basic-4">
                        <div class="panel-heading">
                            <h4 class="panel-title">Innings count by opposition <span class="pull-right">Single Games Not Included</span></h4>
                        </div>
                        <div class="panel-body">
                            <table class="table table-striped">
                                <thead>
                                   <tr>
								   		<td>Team</td>
										<td>Games Against</td>
								   </tr>
                                </thead>
                                <tbody>
									{rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
				</div>
			)
	}
}