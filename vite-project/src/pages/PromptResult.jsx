import React, { useRef, useState, useCallback, useEffect } from "react";
import voice from "../../public/voice.png";
import voiceActive from "../../public/microscope.png";
import SearchResult from "./SearchResult";
import Search from "../../public/send (1).png";
import stly from "../css/promtresult.module.css";
import { useNavigate } from "react-router-dom";
import bimg from '../../public/left-arrow.png'
export const PromptResult = () => {
  const [getInputData, setGetInputData] = useState("");
  const [inputData, setInputData] = useState([
    "India's Capital?",
    "What role does creativity play in both art and scientific discovery?",
  ]);
  const [isActive, setActive] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [requestLimit, setRequestLimit] = useState(1); // Set the request limit
  const navigate = useNavigate();
  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  // Handle form submission
  const handleSearchBtn = (e) => {
    e.preventDefault();
    if (getInputData.trim()) {
      setInputData((prevData) => [...prevData, getInputData.trim()]);
      debouncedApiRequest(getInputData.trim()); // Call API request on submit
      setGetInputData(""); // Clear input field
    }
  };

  // Function to start speech recognition
const handleVoiceInput = () => {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.continuous = true; // Continue recognizing speech
  recognition.interimResults = true; // Show interim results
  recognition.lang = "en-US";

  recognitionRef.current = recognition; // Store recognition instance for cleanup
  setActive(true);
  let finalTranscript = ""; // Store final transcript here

  recognition.start();

  recognition.onresult = (event) => {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    // Update input field directly with interim results
    inputRef.current.value = finalTranscript + interimTranscript;
    setGetInputData(finalTranscript + interimTranscript); 
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    setActive(false); 
  };

  recognition.onend = () => {
    const finalInput = inputRef.current.value.trim();
    if (finalInput) {
      setInputData((prevData) => [...prevData, finalInput]);
      debouncedApiRequest(finalInput);
      setGetInputData(""); 
      inputRef.current.value = ""; // Clear input field 
    }
    setActive(false);
  };
};

useEffect(() => {
  if (!isActive && recognitionRef.current) {
    recognitionRef.current.stop();
  }
}, [isActive]);
  const apiRequest = (query) => {
    const currentTime = Date.now();
    if (currentTime - lastRequestTime < 1000 / requestLimit) {
      // Limit exceeded, don't make the request
      return;
    }
    setLastRequestTime(currentTime);
    console.log("Sending API request with query:", query);

    fetch("https://api.cohere.com/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_COHERE_API}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: query,
        stream: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const trimmedResponse = data.generations[0].text;
        console.log("API Response:", trimmedResponse);
        setResponseData((prev)=>[...prev,trimmedResponse]);
      })
      .catch((error) => {
        console.error("API request error:", error);
      });
  };

  // // Function to trim response
  // const trimResponse = (response) => {
  //   const words = response.split(" ");
  //   if (words.length > 100) {
  //     return words.slice(0, 100).join(" ") + "..."; // Trim to 10 words
  //   }
  //   return response; // Return original if within limit
  // };

  // Debounced API request
  const debouncedApiRequest = useCallback(debounce(apiRequest, 500), []);

  return (
    <div className={stly.mainPromptDiv}>
      <aside className={stly.searchHistory}>
        <button onClick={()=>navigate("/")} style={{cursor:'pointer', padding:'1px 6px 0px 6px', marginTop:"10px"}}><img width={'30px'} src={bimg} alt="Back"/></button>
        <h2>Search History</h2>
        {inputData.length > 0 && (
          <ul>
            {inputData.map((ele, id) => (
              <li key={id}>{ele}</li>
            ))}
          </ul>
        )}
      </aside>
      <section className={stly.searchPrompt}>
        <div className={stly.promptResult}>
          <SearchResult response={responseData} /> 
        </div>
        <form onSubmit={handleSearchBtn}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input  ref={inputRef} type="text" value={getInputData} onChange={(e) => setGetInputData(e.target.value)} placeholder="Type or click the mic to speak"
              style={{
                flex: 1,
                padding: "10px",
                fontSize: "16px",
                borderRadius: "8px",
              }}
              className="input-focus"
            />
            <button
              type="button"
              onClick={handleVoiceInput}
              style={{ marginLeft: "10px", padding: isActive? "7px" : "10px", cursor:'pointer' }}
            >
              {isActive ? (
                <img src={voiceActive} alt="Voice Active" width={"30px"} />
              ) : (
                <img src={voice} alt="Voice" width={"20px"} />
              )}
            </button>
            <button type="submit" style={{ padding: "10px", cursor:'pointer' }}>
              <img src={Search} alt="Search" width={"20px"} />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
