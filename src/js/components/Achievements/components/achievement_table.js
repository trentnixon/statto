import React from "react";

var Achievements;

export default class Achievement_Table extends React.Component {
	
	createTables(data){
			Achievements = data
		}
	componentWillMount(){  this.createTables(this.props.Achievements);}	 
	shouldComponentUpdate(NewProps, NewState){ return true;}
 	componentWillUpdate(NewProps, NewState){ this.createTables(NewProps.Achievements);}
	
  	render() {
    	return (
			<div class={this.props.size }>	
						<div class="panel panel-inverse" data-sortable-id="table-basic-4">
							<div class="panel-heading">
							<div class="panel-heading-btn">
                                <a href="javascript:;" 
									class="btn btn-xs btn-icon btn-circle ach ach_0"  data-original-title="" title="" data-init="true">
									<i class="fa fa-trophy"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle ach ach_1" data-original-title="" title="" data-init="true"><i class="fa fa-trophy"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle ach ach_2"  data-original-title="" title="" data-init="true"><i class="fa fa-trophy"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle ach ach_3" ><i class="fa fa-trophy"></i></a>
								<a href="javascript:;" 
									class="btn btn-xs btn-icon btn-circle ach ach_4"  data-original-title="" title="" data-init="true">
									<i class="fa fa-trophy"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle ach ach_5" data-original-title="" title="" data-init="true"><i class="fa fa-trophy"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle ach ach_6"  data-original-title="" title="" data-init="true"><i class="fa fa-trophy"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle ach ach_7" ><i class="fa fa-trophy"></i></a>
                            </div>
								<h4 class="panel-title">{this.props.Title}</h4>
							</div>
							<div class="panel-body Dashboard_Table">
								{
									Achievements.map((item,i)=>{
										return( <div key={i} class="Table_Row container-fluid ">{Achievements[i].Data}</div> )
									})
								}
							</div>
						</div>
				</div>	
	);
  }
}