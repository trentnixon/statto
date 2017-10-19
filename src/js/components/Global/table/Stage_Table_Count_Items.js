import React from "react";
import { connect } from "react-redux";

import Stage_Striped_Table from "../../Charts/Stage_StripedTable";

var Name=[],Rows=[],SplitArray=[],Limit=0, CountItem=0;


@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
	
export default class BasicStats extends React.Component {
	
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

	
	CountItem(Player,Name)
		{
			CountItem=0
			Player.map((game,i)=>{
				if(game.name == Name) { CountItem = CountItem+game.value; }
			})
			return CountItem;		
	}
	
	CalculateTable(Player)
		{
			Name=[],Rows=[],SplitArray=[];
			
			Player.map((game,i)=>{ Name[i]=game.name; })
		
			SplitArray = this.foo(Name)
			
			Limit = SplitArray[0].length;
			
			SplitArray[0].map((name,i)=>{
					Rows.push({name:name,value:this.CountItem(Player,name)});
				})	
	}
	
	
	componentWillMount(){  this.CalculateTable(this.props.TableRow) }
	render () {
			return (
				<div id="Stage">
					<Stage_Striped_Table Title={this.props.Title} TableHeader={this.props.TableHeader} TableData={Rows} />
				</div>
			)
	}
}