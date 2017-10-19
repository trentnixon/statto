import React from "react";


export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Contact US",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}
