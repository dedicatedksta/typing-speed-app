import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Card from "./Card";
import Cards from "./Cards";

const AppRoutes = () => {
  return <div className=" flex">
    <Routes>
      <Route path="/races" element={<Cards/>}/>
      <Route path="/races/:id" element={<Card/>}/>
      <Route path="*" element={<Navigate to="/races"/>}/>
    </Routes>
  </div>;
};

export default AppRoutes;
