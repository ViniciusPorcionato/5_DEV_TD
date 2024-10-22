import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import { Painel } from "../Components/Painel";
import { useState } from "react";

import context from "../Context/userContext";

export const RoutesPage = () => {
  const [user, setUser] = useState({});

  const ProtecdedRoute = (props) => {
    return user.login ? props.children : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <context.Provider value={{ setUser }}>
              <App />
            </context.Provider>
          }
          path="/"
        />

        <Route
          element={
            <context.Provider value={{ user }}>
              <ProtecdedRoute>
                <Painel />
              </ProtecdedRoute>
            </context.Provider>
          }
          path="/painel-ativos"
        />

        {/* Rots não especificadas, encaminharam para a tela de login */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
