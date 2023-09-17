import './App.css';
import React, { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SinglePost from './components/SinglePost';
import TopPost from './components/TopPost';
import History from './components/History';


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
          marginBottom: "3%",
          color: "#ffffff", border: "2px solid #04d9ff",
          '& .MuiToggleButton-root':
          {
            color: "#ffffff",
            height: "35px"
          },
          '.MuiToggleButton-root.Mui-selected,  .MuiToggleButton-root.Mui-selected:hover': {
            backgroundColor: "#04d9ff",
            color: '#00000',

          }
        }}
      >
        <ToggleButton defaultChecked={true} value="singlePost">Single Post</ToggleButton>
        <ToggleButton value="topPost">Top Post</ToggleButton>
        <ToggleButton value="history">History</ToggleButton>
      </ToggleButtonGroup>
      {
        mode == 'singlePost' && <SinglePost />
      }
      {
        mode == 'topPost' && <TopPost />

      }
      {
        mode == 'history' && <History />
      }

    </div>
  );
}

export default App;
