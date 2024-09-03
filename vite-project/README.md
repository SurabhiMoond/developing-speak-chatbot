# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<!-- import React, { useEffect, useState } from "react";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const fetchCompletion = async () => {
      try {
        const res = await fetch("/api/");
        const data = await res.json();
        setResponse(data || "No response");
      } catch (error) {
        console.error("Error fetching completion:", error);
      }
    };

    fetchCompletion();
  }, []);

  return (
    <div>
      <h1>Chatbot Response</h1>
      <p>{response}</p>
    </div>
  );
}

export default App; -->
<!-- import React, { useRef, useState } from "react";
import voice from "../../public/voice.png";
import voiceActive from "../../public/microscope.png";
import SearchResult from "./SearchResult";
import Search from "../../public/send (1).png";
import stly from '../css/promtresult.module.css'
export const PromptResult = () => {
  const [getInputData, setGetInputData] = useState("");
  const [inputData, setInputData] = useState([
    "India's Capital?",
    "What role does creativity play in both art and scientific discovery?",
  ]);
  const [isActive, setActive] = useState(false);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Handle form submission
  const handleSearchBtn = (e) => {
    setActive(false);
    e.preventDefault();
    if (getInputData.join()) {
      setInputData((prevData) => [...prevData, getInputData]);
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
      setActive(false);
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setGetInputData(finalTranscript + interimTranscript); // Update state with combined transcript
      getInputData("")
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognition.onend = () => {
    };
  };

  return (
    <div className={stly.mainPromptDiv}>
      <aside className={stly.searchHistory}>
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
          <SearchResult query={getInputData} />
        </div>
        <form onSubmit={handleSearchBtn}>
          <div style={{ display: "flex", alignItems: "center", gap:'10px' }}>
            <input
              ref={inputRef}
              type="text"
              value={getInputData}
              onChange={(e) => setGetInputData(e.target.value)}
              placeholder="Type or click the mic to speak"
              style={{ flex: 1, padding: "10px", fontSize: "16px", borderRadius:'8px' }}
              className="input-focus"
            />
            <button
              type="button"
              onClick={handleVoiceInput}
              style={{ marginLeft: "10px", padding: "10px" }}
            >
              {isActive ? (
                <img src={voiceActive} alt="Voice Active" width={"30px"} />
              ) : (
                <img src={voice} alt="Voice" width={"20px"} />
              )}
            </button>
            <button type="submit" style={{padding:'10px'}}>
              <img src={Search} alt="Search" width={"20px"} />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
``` -->




<!-- promptResult
import React, { useRef, useState, useCallback } from "react";
import voice from "../../public/voice.png";
import voiceActive from "../../public/microscope.png";
import SearchResult from "./SearchResult";
import Search from "../../public/send (1).png";
import stly from "../css/promtresult.module.css";

export const PromptResult = () => {
  const [getInputData, setGetInputData] = useState("");
  const [inputData, setInputData] = useState([
    "India's Capital?",
    "What role does creativity play in both art and scientific discovery?",
  ]);
  const [isActive, setActive] = useState(false);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [requestLimit, setRequestLimit] = useState(1); // Set the request limit

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
      setGetInputData(finalTranscript + interimTranscript); // Update state
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setActive(false); // Reset active state on error
    };

    recognition.onend = () => {
      setActive(false);
      const finalInput = inputRef.current.value.trim();
      if (finalInput) {
        setInputData((prevData) => [...prevData, finalInput]);
        debouncedApiRequest(finalInput); // Call API request on voice input end
        setGetInputData(""); // Clear input field after processing
        inputRef.current.value = ""; // Clear input field visually
      }
    };
  };

  // API request function
  const apiRequest = (query) => {
    const currentTime = Date.now();
    if (currentTime - lastRequestTime < 1000 / requestLimit) {
      // Limit exceeded, don't make the request
      return;
    }
    setLastRequestTime(currentTime);

    // Make the API request here
    console.log("Sending API request with query:", query);

    // Example API call (replace with your actual API call)
    fetch(
      `https://api.cohere.com/v1/chat/ask?query=${encodeURIComponent(
        query
      )}&max_length=80`
    )
      .then((response) => response.json())
      .then((data) => {
        // Assuming the response contains a 'response' field
        const trimmedResponse = trimResponse(data.response);
        console.log("API Response:", trimmedResponse);
        // Handle the response (e.g., update state)
      })
      .catch((error) => {
        console.error("API request error:", error);
      });
  };

  // Function to trim response to 80-100 words
  const trimResponse = (response) => {
    const words = response.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "..."; // Trim to 100 words
    }
    return response; // Return original if within limit
  };

  // Debounced API request
  const debouncedApiRequest = useCallback(debounce(apiRequest, 500), []);

  return (
    <div className={stly.mainPromptDiv}>
      <aside className={stly.searchHistory}>
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
          <SearchResult query={getInputData} />
        </div>
        <form onSubmit={handleSearchBtn}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              ref={inputRef}
              type="text"
              value={getInputData} // Controlled input
              onChange={(e) => setGetInputData(e.target.value)}
              placeholder="Type or click the mic to speak"
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
              style={{ marginLeft: "10px", padding: "10px" }}
            >
              {isActive ? (
                <img src={voiceActive} alt="Voice Active" width={"30px"} />
              ) : (
                <img src={voice} alt="Voice" width={"20px"} />
              )}
            </button>
            <button type="submit" style={{ padding: "10px" }}>
              <img src={Search} alt="Search" width={"20px"} />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
 -->

 <!-- Avatar component 
 import axios from "axios";
import React, { useEffect, useState } from "react";

export const Avatar = ({ data }) => {
  const [videoId, setVideoId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key": import.meta.env.VITE_HEYGEN_API,
    },
    body: JSON.stringify({
      test: true,
      caption: false,
      dimension: { width: 1920, height: 1080 },
      video_inputs: [
        {
          character: {
            type: "avatar",
            avatar_id: "1721172892", // avatar ID
            scale: 1.0,
            avatar_style: "normal",
            offset: { x: 0.0, y: 0.0 },
          },
          voice: {
            type: "text",
            voice_id: "001b5828d42b4f8b814ad7dbec3221e4", // voice ID
            input_text: data,
            speed: 1.0,
            pitch: 0,
            emotion: "Friendly",
          },
          background: {
            type: "color",
            value: "#f6f6fc",
          },
        },
      ],
    }),
  };

  try {
    const response = await axios.get(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`);
    const result = await response.json();

    if (response.ok) {
      console.log("Video ID:", result.video_id);
    } else {
      console.error("Error:", result.error);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};

    fetchVideo();
  }, [data]);
console.log(data);
  return (
    <div>
      {error && <p>{error}</p>}
      {videoId ? (
        <video controls>
          <source
            src={`https://api.heygen.com/v2/video/${videoId}`}
            type="video/webm"
          />
          Browser does not support the video tag.
        </video>
      ) : (
        !error && <p>Loading video...</p>
      )}
    </div>
  );
};
-->