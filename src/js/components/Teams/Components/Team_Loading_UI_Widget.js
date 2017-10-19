import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

let color='alert alert-info fade in m-b-15', value;
export default class Loading_Widget extends React.Component {

 shouldComponentUpdate(nextProps, nextState){ return true;}
  render() {
	if(this.props.value == 0)
		{
			color='alert alert-info fade in m-b-15';
			value = <MuiThemeProvider><CircularProgress size={10} color="#31708f" thickness={1} /></MuiThemeProvider>
			}
	else{
			color='alert alert-success fade in m-b-15';
			value = this.props.value
	}

	return (
		<div class="col-md-4">
			<div class="container-fluid nopadding">
				<div class={color}>
					<strong>{this.props.title}</strong> {value}
				</div>
			</div>
		</div>	
    );
  }
}