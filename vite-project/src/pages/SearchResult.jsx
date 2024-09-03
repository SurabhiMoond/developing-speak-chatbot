import React, { useEffect, useRef } from "react";
import image from "../../public/chatbot (1).png";
import styl from "../css/promtresult.module.css";
import { Avatar } from "./Avatar";

const SearchResult = ({ response }) => {
  const containerRef = useRef(null);
   
  useEffect(() => {
    const container = containerRef.current;
    if (container && response.length > 0) {
      // Calculate the position to scroll based on the previous scroll height plus the new response height
      const lastResponseHeight = container.children[response.length - 1]?.offsetHeight || 0;
      container.scrollTop = container.scrollHeight - lastResponseHeight;
    }
  }, [response]);
  const twoLines = (text) =>{
    const line = text.split('\n').slice(0,1);
    return line.join('\n');
  }
  if (!response || response.length === 0) {
    return (
      <div style={{ width: "300px", textAlign: "center", margin: "20% 10% 10% 30%" }}>
        <img className={styl.imageBot} src={image} alt="Chatbot" />
        <p>Hii..... ! How can I help you?</p>
      </div>
    );
  }

  return (
    <div ref={containerRef}  style={{ position: "relative",  width: "90%", margin: "20px 30px",  maxHeight: "450px", overflowY: "auto"}}>
    {response.map((ele, id) => (
        <div key={id}  className="resultData" style={{ marginBottom: "20px", padding: "20px", borderRadius: "8px", background: "linear-gradient(to top, #3d2d5c, #26a69a)",  color: "#fff", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", cursor: "pointer", }}>
        <Avatar data={twoLines(ele)} />
          <p>{ele}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
