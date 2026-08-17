import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage";
import UserInput from "./pages/userinput/user_input";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-input" element={<UserInput />} />
      </Routes>
    </BrowserRouter>
  );

};

export default App;