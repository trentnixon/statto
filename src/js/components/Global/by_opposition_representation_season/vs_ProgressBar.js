import React from "react";


let Color,Percentage,Title,Total,Career,PercentageText
export default class By_ProgressBar extends React.Component {

	createBar(data)
		{
				Color = data.Color;
				Percentage= data.Percentage;
				Title = data.Title;
				Total = data.Total;
				Career = data.Career;
				PercentageText = data.PercentageText;
	}	
		
	componentWillMount(){  this.createBar(this.props) }
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillUpdate(nextProps, nextState){  this.createBar(nextProps)}	
	
  render() {
    return (
		
		<div class="progress progress-striped ">
			<div class={Color+" progress-bar"} style={{width: Percentage+'%'}}>
				{Title} {Total} of {Career} ({PercentageText+'%'})
			</div> 
		</div>
	);
  }
}