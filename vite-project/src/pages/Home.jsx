import React, { useState } from 'react'
import '../css/home.css'
import { Welcome } from './Welcome';
import { PromptResult } from './PromptResult';
import { useNavigate } from 'react-router-dom';
// import { Check } from './Check';
export const Home = () => {
  const [startedBtn, setStartedBtn] = useState(false);
  const nav = useNavigate();
  const handleGetStartedBtn = () => {
    nav(`/prompt`);
  }
  return (
    <div className="mainPage">
      <div className="effect-wrap">
        <div className="effect effect-1"></div>
        <div className="effect effect-2">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="effect effect-3"></div>
        <div className="effect effect-4">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="effect effect-2">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="effect effect-5">
          <div className="petal petal-1">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="petal petal-2">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="petal petal-3">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="petal petal-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="petal petal-5">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="petal petal-6">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="petal petal-7">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="petal petal-8">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      {/* <Welcome/> */}
      <div style={{ width: "100%", marginTop:"10%" }}>
        {/* <Check /> */}
        <Welcome/>
        <div style={{marginLeft:'40%'}}>
          <h1>Welcome to GPT world </h1>
          <button onClick={handleGetStartedBtn}>Get Started</button>
        </div>
      </div>
    </div>
  );
}
