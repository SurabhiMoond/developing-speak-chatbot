import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../css/check.module.css";
export const Avatar = ({ data }) => {
  const [resData, setData] = useState(null);
  const [responseId, setResponseId] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // POST Request
        const postResponse = await axios.post(
          `https://api.d-id.com/talks`,
          {
            script: {
              type: "text",
              input: data,
            },
            source_url:
              "https://img.freepik.com/premium-photo/ai-round-avatar-created-with-generative-ai_916303-436.jpg",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${import.meta.env.VITE_DID_API_KEY}`,
            },
          }
        );

        const newResponseId = postResponse.data.id;
        setResponseId(newResponseId);

        // Polling to check the status
        const checkStatus = async () => {
          try {
            const getResponse = await axios.get(
              `https://api.d-id.com/talks/${newResponseId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Basic ${import.meta.env.VITE_DID_API_KEY}`,
                },
              }
            );

            if (getResponse.data.status === "done") {
              setData(getResponse.data);
              setLoading(false);
            } else {
              // If the video is still processing, call the function again after a delay
              setTimeout(checkStatus, 3000); // Poll every 3 seconds
            }
          } catch (error) {
            setErr(true);
            console.error("Error during polling:", error);
          }
        };

        checkStatus(); // Start polling
      } catch (error) {
        setErr(true);
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div>
      {err ? (
        <div className={style.video}>
          <img
            width={"100px"}
            style={{ borderRadius: "50%", marginTop: "5px" }}
            src="https://img.freepik.com/premium-photo/ai-round-avatar-created-with-generative-ai_916303-436.jpg"
            alt="Welcome-Img"
          />
        </div>
      ) : resData && resData.result_url ? (
        <div className={style.welcomeMain}>
          <video controls autoPlay className={style.video}>
            <source src={resData.result_url} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className={style.video}>
          <img
            width={"100px"}
            style={{ borderRadius: "50%", marginTop: "5px" }}
            src="https://img.freepik.com/premium-photo/ai-round-avatar-created-with-generative-ai_916303-436.jpg"
            alt="Welcome-Img"
          />
        </div>
      )}
    </div>
  );
};
