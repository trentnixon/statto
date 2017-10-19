import React from "react";
	
var  TableHeaders,Player,Limit=0,TableRows,RecentTable;

export default class HomePageWorldRankingsWidget extends React.Component {
	
	componentWillMount(){
		//TableHeaders=[' ','Team','Figures','Overs','Average','Strike Rate','Game Points','Rank'];
		
		TableHeaders=[
				{title:'Date', Abv:'D',class:"col-md-1 hidden-xs"},
				{title:'Against', Abv:'VS',class:"col-md-3 hidden-xs"},
				{title:'Figures' , Abv:'F',class:"col-md-2 col-xs-2"},
				{title:'Overs', Abv:'O',class:"col-md-2 col-xs-2"},
				{title:'Average', Abv:'A',class:"col-md-1 col-xs-2"},
				{title:'Strike Rate', Abv:'SR',class:"col-md-1 col-xs-2"},
				{title:'Game Points', Abv:'GP',class:"col-md-1 col-xs-2"},
				{title:'Rank', Abv:'R',class:"col-md-1 col-xs-2"}
			 ];
		
		
		//Player =this.props.Player.games;
		RecentTable = Array.prototype.slice.call(this.props.Player.games);
		RecentTable = RecentTable.reverse();
		TableRows = RecentTable.map((tr,i)=>{
			if(tr.Bowling_OversBowled_parsed != 0 && i <= this.props.Limit)
				{
					return(
							<div key={i} class="row Table_Row">
								<div class="col-md-1 hidden-xs">{tr.Date}</div>
								<div class="col-md-3 col-xs-12">{tr.Team}</div>
								<div class="col-md-2 col-xs-2">{tr.Bowling_Figures}</div>
								<div class="col-md-2 col-xs-2">{tr.Bowling_OversBowled}</div>
								<div class="col-md-1 col-xs-2">{tr.Bowling_Weekly_Average}</div>
								<div class="col-md-1 col-xs-2">{tr.Bowling_strikeRate}</div>
								<div class="col-md-1 col-xs-2">{tr.Bowling_GamePoints}</div>
								<div class="col-md-1 col-xs-2">{tr.Bowling_Rank}</div>
							</div>
					)
			}
		})
	}
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