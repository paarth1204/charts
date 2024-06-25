// pages/index.tsx
import React from "react";
import DraggableList from "./@components/DraggableList";

const Home: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Drag and Drop List</h1>
      <DraggableList />
      <p>This is a random paragraph</p>
    </div>
  );
};

export default Home;
