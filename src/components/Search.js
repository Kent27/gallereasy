import React, { Component } from "react";
import Image from "./Image";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      limit: 8,
      keyword: ""
    };

    this.searchImage();
    this.onChange = this.onChange.bind(this);
    this.fetchMore = this.fetchMore.bind(this);

    if (!localStorage.getItem("favourites")) {
      localStorage.setItem("favourites", "{}");
    }
  }

  searchImage(keyword = null) {
    let query = "";
    if (keyword === null) {
      // I directly use my API key, but in prod version this will be in .env file
      query =
        "/trending?api_key=AsJCInqkhLOuFx7pLLAb61lyKRnwU9dx&limit=" +
        this.state.limit +
        "&rating=G";
    } else {
      query =
        "/search?api_key=AsJCInqkhLOuFx7pLLAb61lyKRnwU9dx&q=" +
        keyword +
        "&limit=" +
        this.state.limit +
        "&offset=0&rating=G&lang=en";
    }
    axios
      .get(query, keyword)
      .then(res => {
        let data = res.data.data;

        var grouped = data.reduce((acc, post, ind) => {
          var index = parseInt(ind / 4);
          acc[index] = acc[index] || [];
          acc[index].push(
            <Image
              imageData={post}
              key={post.id}
              dataId={post.id}
              url={post.images.fixed_width.url}
            />
          );
          return acc;
        }, {});

        let allDataShown = data.length < this.state.limit ? true : false;

        this.setState({
          images: grouped,
          allDataShown: allDataShown,
          keyword: keyword
        });
      })
      .catch(err => console.log(err));
  }

  fetchMore() {
    this.setState(
      state => ({
        limit: state.limit + 8
      }),
      () => {
        this.searchImage(this.state.keyword);
      }
    );
  }

  onChange(e) {
    this.setState({ limit: 8, keyword: e.target.value });
    this.searchImage(e.target.value);
  }

  render() {
    const { images, allDataShown } = this.state;
    return (
      <div className="container">
        <input
          type="text"
          className="search-input mb-4"
          placeholder="Start searching for images!"
          name="search-input"
          style={{
            fontSize: 24,
            width: "100%"
          }}
          onChange={this.onChange}
        />

        <React.Fragment>
          {Object.keys(images).map(row => {
            return (
              <div className="row mb-4" key={row}>
                {images[row]}
              </div>
            );
          })}
        </React.Fragment>
        <div
          className="row mt-5"
          style={{ display: allDataShown ? "none" : "block" }}
        >
          <div className="col text-center">
            <button
              type="button"
              className="btn btn-default"
              onClick={this.fetchMore}
            >
              Fetch more..
            </button>
          </div>
        </div>
      </div>
    );
  }
}
