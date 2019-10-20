import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="bg-custom-grey mt-5 py-2 container text-dark footer">
        <span>Gallereasy POC web app</span>
        <span style={{ float: "right" }}>2359 Media</span>
      </footer>
    );
  }
}
