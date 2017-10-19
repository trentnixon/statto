import React from "react";
	
var  TableHeaders,Player,Limit=0,TableRows,RecentTable;

TableHeaders=[
				{title:'Date', Abv:'D',		class:"col-md-1 hidden-xs"},
				{title:'Against', Abv:'VS',	class:"col-md-3 hidden-xs"},
				{title:'Runs' , Abv:'R',	class:"col-md-2 col-xs-3"},
				{title:'Balls', Abv:'B',	class:"col-md-2 col-xs-3"},
				{title:'Pitch Weight', Abv:'PW',class:"col-md-1 hidden-xs"},
				{title:'Leauge', Abv:'L',		class:"col-md-1 hidden-xs"},
				{title:'Game Points', Abv:'GP',	class:"col-md-1 col-xs-3"},
				{title:'Rank', Abv:'R',		class:"col-md-1 col-xs-"}
			 ];
			 
export default class HomePageWorldRankingsWidget extends React.Component {
	
	CreateTable(Player){
		
		//Player =this.props.Player.games;
		RecentTable = Array.prototype.slice.call(Player);
		RecentTable = RecentTable.reverse();
		//console.log(RecentTable);
		TableRows = RecentTable.map((tr,i)=>{
			if(tr.Batting_BallsFaced != '' && i <= this.props.Limit)
				{
					return(
							
							<div key={i} class="row Table_Row">
								<div class="col-md-1 hidden-xs">{tr.Date}</div>
								<div class="col-md-3 col-xs-12">{tr.Team}</div>
								<div class="col-md-2 col-xs-3">{tr.Batting_Runscored}</div>
								<div class="col-md-2 col-xs-3">{tr.Batting_BallsFaced}</div>
								<div class="col-md-1 hidden-xs">{tr.Batting_PitchWeight}</div>
								<div class="col-md-1 hidden-xs">{tr.Batting_LeaugeWeight}</div>
								<div class="col-md-1 col-xs-3">{tr.Batting_GamePoints}</div>
								<div class="col-md-1 col-xs-3">{tr.Batting_Rank}</div>
							</div>
					)
			}
		})
	}
	
	componentWillMount(){ this.CreateTable(this.props.Player.games) }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){  this.CreateTable(nextProps.Player.games); }
	
	render () { 
			return (
				<div class="ShowChart">
					<div class="panel panel-inverse" data-sortable-id="table-basic-4">
                        <div class="panel-heading">
                            <h4 class="panel-title">{this.props.Title} <a class="pull-right" href="#"> Full List <i class="fa fa-list" aria-hidden="true"></i></a></h4>
                        </div>
                        <div class="panel-body Dashboard_Table">
                            
							<div class="row TableHeader hidden-xs">
								{ TableHeaders.map((TH,i)=>{
													return( <div key={i} class={TH.class}>{TH.title}</div>)
								})}
							</div>
							<div class="row TableHeader visible-xs">
								{ TableHeaders.map((TH,i)=>{
													return( <div key={i} class={TH.class}>{TH.Abv}</div>)
								})}
							</div>
							{TableRows}
                        </div>
                    </div>
				</div>
			)
  	}
}