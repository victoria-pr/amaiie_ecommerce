//TEST DE PRUEBA DE LA APP: para comprobar que renderiza bien

import { render, screen } from "@testing-library/react";
import App from "./App";
//Simula la renderización
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
