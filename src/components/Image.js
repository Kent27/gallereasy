import React, { Component } from "react";
import fullHeart from "../icons/full-heart.png";
import ClipLoader from "react-spinners/ClipLoader";

export default class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: false,
      hovered: false,
      loading: true
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    let favouriteList = JSON.parse(localStorage.getItem("favourites"));
    let fav = this.props.dataId in favouriteList ? true : false;

    setTimeout(
      function() {
        //Start the timer
        this.setState({ loading: false, fav: fav }); //After 1.5 second, set loading to false
      }.bind(this),
      1500
    );
  }

  onClick = (dataId, url, imageData) => {
    if (imageData) {
      this.setState(
        state => ({
          fav: !state.fav
        }),
        () => {
          // Save favourites to local storage
          let favouriteList = JSON.parse(localStorage.getItem("favourites"));
          if (this.state.fav) {
            if (!(dataId in favouriteList)) {
              favouriteList[dataId] = url;
            }
          } else {
            if (dataId in favouriteList) {
              delete favouriteList[dataId];
            }
          }

          localStorage.setItem("favourites", JSON.stringify(favouriteList));
          // End - Save favourites to local storage
        }
      );
    }
  };

  onMouseEnter = () => {
    this.setState({
      hovered: true
    });
  };
  onMouseLeave = () => {
    this.setState({
      hovered: false
    });
  };

  render() {
    const { url, dataId, imageData } = this.props;
    const { fav, hovered, loading } = this.state;

    // styling for normal heart
    let heartSize = {
      position: "absolute",
      top: 141,
      left: 155,
      width: 50,
      height: 50,
      display: imageData ? "block" : "none"
    };

    // styling for hovered heart, add opacity
    let heartSizeHover = Object.assign({}, heartSize);
    heartSizeHover["opacity"] = 0.6;

    return (
      <div className="col-md-3">
        <ClipLoader
          sizeUnit={"px"}
          size={150}
          color={"#123abc"}
          loading={loading}
        />

        <div style={{ display: loading ? "none" : "block" }}>
          <img
            onClick={() => this.onClick(dataId, url, imageData)}
            src={url}
            alt={url}
            className="img"
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          />
          {fav ? ( // If favourite show heart
            <img src={fullHeart} style={heartSize} alt={url} />
          ) : hovered ? ( // If hovered show heart with opacity
            <img src={fullHeart} style={heartSizeHover} alt={url} />
          ) : (
            ""
          )}{" "}
        </div>
      </div>
    );
  }
}
