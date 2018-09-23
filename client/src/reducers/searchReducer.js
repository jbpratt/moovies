const initialState = {
  results: [],
  isFetching: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "START_SEARCH":
      return {
        isFetching: true,
        results: []
      };

    case "END_SEARCH":
      return {
        isFetching: false,
        results: action.payload
      };
    default:
      return state;
  }
}
