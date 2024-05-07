const initialState = {
  jobs: [],
  favorites: [],
  loading: false,
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_JOBS_REQUEST":
      return {
        ...state,
        loading: true, // Imposta loading a true quando la richiesta inizia
        error: null, // Resetta l'errore a null quando la richiesta inizia
      };
    case "SET_JOBS_SUCCESS":
      return {
        ...state,
        jobs: action.payload,
        loading: false, // Imposta loading a false quando la richiesta è completata con successo
      };
    case "SET_JOBS_FAILURE":
      return {
        ...state,
        loading: false, // Imposta loading a false quando si verifica un errore
        error: action.payload,
      };
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter((job) => job._id !== action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;
