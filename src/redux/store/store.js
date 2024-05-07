import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reductors/reduces"; // Assicurati di importare correttamente il tuo reducer

const store = configureStore({
  reducer: rootReducer, // Passa il tuo reducer a configureStore
});

export default store;
