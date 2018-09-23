import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/searchActions";
import TextFieldGroup from "../common/TextFieldGroup";
import MovieResults from "./MovieResults";
import SeriesReults from "./SeriesResults";
import CollectionResults from "./CollectionResults";
import AnimeResults from "./AnimeResults";
import "./SearchForm.css";
class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      movieKeyword: "",
      seriesKeyword: "",
      collectionKeyword: "",
      animeKeyword: "",
      _type: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmitMovie = this.onSubmitMovie.bind(this);
    this.onSubmitSeries = this.onSubmitSeries.bind(this);
    this.onSubmitAnime = this.onSubmitAnime.bind(this);
    this.onSubmitCollection = this.onSubmitCollection.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitMovie(e) {
    e.preventDefault();
    this.setState({
      _type: "movie"
    });
    this.props.movieSearch(this.state.movieKeyword);
  }

  onSubmitSeries(e) {
    e.preventDefault();
    this.setState({
      _type: "series"
    });
    this.props.seriesSearch(this.state.seriesKeyword);
  }

  onSubmitAnime(e) {
    e.preventDefault();
    this.setState({
      _type: "anime"
    });
    console.log(this.state.animeKeyword);
    this.props.animeSearch(this.state.animeKeyword);
  }

  onSubmitCollection(e) {
    e.preventDefault();
    this.setState({
      _type: "collection"
    });
    this.props.collectionSearch(this.state.collectionKeyword);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div style={{ textAlign: "center" }} className="m-3"><small>If results will not display, please adjust extensions such as Privacy Badger accordingly</small></div>
        <div className="forms-container">
          <div className="form-group search-form">
            <form onSubmit={this.onSubmitMovie}>
              <TextFieldGroup
                placeholder="Movie Search"
                name="movieKeyword"
                value={this.state.movieKeyword}
                onChange={this.onChange}
                error={errors.movieKeyword}
              />
              <button type="submit" className="btn btn-dark btn-sm">
                Search
              </button>
            </form>
          </div>{" "}
          <div className="form-group search-form">
            <form onSubmit={this.onSubmitSeries}>
              <TextFieldGroup
                placeholder="Series Search"
                name="seriesKeyword"
                value={this.state.seriesKeyword}
                onChange={this.onChange}
                error={errors.seriesKeyword}
              />
              <button type="submit" className="btn btn-dark btn-sm">
                Search
              </button>
            </form>
          </div>{" "}
          <div className="form-group search-form">
            <form onSubmit={this.onSubmitCollection}>
              <TextFieldGroup
                placeholder="Collection Search"
                name="collectionKeyword"
                value={this.state.collectionKeyword}
                onChange={this.onChange}
                error={errors.collectionKeyword}
              />
              <button type="submit" className="btn btn-dark btn-sm">
                Search
              </button>
            </form>
          </div>{" "}
          <div className="form-group search-form">
            <form onSubmit={this.onSubmitAnime}>
              <TextFieldGroup
                placeholder="Anime Search"
                name="animeKeyword"
                value={this.state.animeKeyword}
                onChange={this.onChange}
                error={errors.animeKeyword}
              />
              <button type="submit" className="btn btn-dark btn-sm">
                Search
              </button>
            </form>
          </div>{" "}
        </div>
        <div>
          {this.state._type === "movie" ? (
            <MovieResults results={this.props.results} />
          ) : (
              ""
            )}
          {this.state._type === "series" ? (
            <SeriesReults results={this.props.results} />
          ) : (
              ""
            )}
          {this.state._type === "collection" ? (
            <CollectionResults results={this.props.results} />
          ) : (
              ""
            )}
          {this.state._type === "anime" ? (
            <AnimeResults results={this.props.results} />
          ) : (
              ""
            )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.search.results,
    isFetching: state.isFetching
  };
}
export default connect(
  mapStateToProps,
  actions
)(SearchForm);
