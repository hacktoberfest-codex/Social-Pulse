<<<<<<< HEAD
=======

>>>>>>> main
import './App.css';
import React, { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SinglePost from './components/SinglePost';
function App() {
  const [mode, setMode] = useState("singlePost");
  const handleChange = () => {

  }
  return (
    <div className="App">
<<<<<<< HEAD
      <h1 >Social Sentiment Analyzer</h1>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{
          color: "#ffffff", border: "2px solid #04d9ff",
        }}
      >
        <ToggleButton defaultChecked={true} value="singlePost">Single Post</ToggleButton>
        <ToggleButton value="topPost">Top Post</ToggleButton>
        <ToggleButton value="history">History</ToggleButton>
      </ToggleButtonGroup>
      <SinglePost />
=======
 
>>>>>>> main
    </div >
  );
}

export default App;
