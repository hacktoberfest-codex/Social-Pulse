import './App.css';
import React, { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SinglePost from './components/SinglePost';
import TopPost from './components/TopPost';


function App() {
  const [mode, setMode] = useState("singlePost");
  const handleChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };
  return (
    <div className="App">
      <h1 >Social Sentiment Analyzer</h1>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{
          color: "#ffffff",
          border: "2px solid #04d9ff",
          marginInline: "5%"
        }}
      >
        <ToggleButton defaultChecked={true} value="singlePost">Single Post</ToggleButton>
        <ToggleButton value="topPost">Top Post</ToggleButton>
        <ToggleButton value="history">History</ToggleButton>
      </ToggleButtonGroup>
      {mode == "singlePost" && <SinglePost />}
      {mode == "topPost" && < TopPost />}
      {/* {mode == "history" && <FetchUrl />} */}
      {/* <FetchUrl /> */}
    </div>
  );
}

export default App;
