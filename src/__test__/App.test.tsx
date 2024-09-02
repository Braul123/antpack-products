import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "../App"; 

// Configuración inicial del mock store
const mockStore = configureStore([]);
const initialState = {
  // Estado inicial del store
  user: {
    userName: "",
    email: "",
    password: "",
  },
};

describe("App Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });


  test("Render provider app", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
