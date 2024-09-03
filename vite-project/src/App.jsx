import React, { useEffect, useState } from "react";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { PromptResult } from "./pages/PromptResult";

function App() {

  return (
    <Routes>
      <Route path= "/" element={<Home />}/>
      <Route path="/prompt" element={<PromptResult/>}/>
    </Routes>
  );
}

export default App;
