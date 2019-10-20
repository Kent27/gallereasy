import React, { Component } from "react";
import Image from "./Image";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    if (localStorage.getItem("favourites")) {
      let dataFromStorage = JSON.parse(localStorage.getItem("favourites"));
      var grouped = Object.values(dataFromStorage).reduce((acc, post, ind) => {
        var index = parseInt(ind / 4);
        acc[index] = acc[index] || [];
        acc[index].push(
          <Image imageData={null} key={post} url={post} dataId={ind} />
        );
        return acc;
      }, {});
      this.setState({ images: grouped });
    }
  }

  render() {
    const { images } = this.state;

    return (
      <div className="container">
        <React.Fragment>
          {Object.keys(images).map(row => {
            return (
              <div className="row mb-4" key={row}>
                {images[row]}
              </div>
            );
          })}
        </React.Fragment>
      </div>
    );
  }
}
