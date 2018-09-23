import axios from "axios";
import { api_key } from "./api_key";

export const startSearch = () => {
  return {
    type: "START_SEARCH",
    payload: []
  };
};

export const endSearch = _results => {
  return {
    type: "END_SEARCH",
    payload: _results
  };
};

export const movieSearch = keyword => {
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${keyword}`;
  return dispatch => {
    dispatch(startSearch());
    return axios.get(url).then(
      res => {
        let _results = res.data.results;
        console.log(_results);
        dispatch(endSearch(_results));
      },
      err => {
        console.log(err);
      }
    );
  };
};

export const seriesSearch = keyword => {
  let url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${keyword}`;
  return dispatch => {
    dispatch(startSearch());
    return axios.get(url).then(
      res => {
        let _results = res.data.results;
        console.log(_results);
        dispatch(endSearch(_results));
      },
      err => {
        console.log(err);
      }
    );
  };
};

export const collectionSearch = keyword => {
  let url = `https://api.themoviedb.org/3/search/collection?api_key=${api_key}&query=${keyword}`;

  return dispatch => {
    dispatch(startSearch());
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        let _results = data.results;
        console.log(_results);
        dispatch(endSearch(_results));
      })
      .catch(err => console.log(err));
  };
};

export const animeSearch = keyword => {
  const url = "https://graphql.anilist.co/";
  const query = `{
    AnimeSearch: Page {
      media(search: "${keyword}", type: ANIME) {
        id
        episodes
        title {
          userPreferred
          romaji
          english
        }
        coverImage {
          large
        }
        averageScore
        description
      }
    }
  }`;
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query: query
    })
  };
  return dispatch => {
    dispatch(startSearch());
    return fetch(url, options)
      .then(res => res.json())
      .then(data => {
        let _results = data.data.AnimeSearch.media;
        dispatch(endSearch(_results));
      })
      .catch(err => console.log(err));
  };
};
