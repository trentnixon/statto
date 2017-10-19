import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900,orange500} from 'material-ui/styles/colors';


// Get Charts
import Display_Pie_Chart from "../../Charts/PieChart";


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  inkBar:{ backgroundColor:orange500},
  tabColor:{ backgroundColor:'#242a30'},
  Container:{ paddingTop:'20px'}
};

export default class TabsExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
	  
    return (
				<div class="Stage">
					<div class="row">
						<div class="col-md-10">
							<h1 class="page-header" >{this.props.Title}</h1>
						</div>
						<div class="col-md-2">
							<p class="pull-right">Total: {this.props.WidgetCount}</p>
						</div>
					</div>
		
					<MuiThemeProvider>
					  <Tabs
						value={this.state.value}
						onChange={this.handleChange}
						inkBarStyle={styles.inkBar}
						tabItemContainerStyle={styles.tabColor}
						contentContainerStyle={styles.Container}
						
					  >
						<Tab label="By The Numbers" value="a"  >
						  <div>
						  {
								this.props.Tab_Graph.map((graph,i)=>{
										return(
											<div key={i}>
												{graph.chart}
											</div>
										)
									})
							}
							
						  </div>
						</Tab>
						
						
						<Tab label="Opposition" value="b">
						  <div>
							{
								this.props.Tab_List.map((graph,i)=>{
										return(
											<div key={i}>
												{graph.chart}
											</div>
										)
									})
							}
						  </div>
						</Tab>
					  
					  
					  </Tabs>
				  </MuiThemeProvider>
				</div>
    );
  }
}