import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../css/check.module.css";
import video from '../../public/wlcom.mp4'
export const Welcome = () => {

  return (
    <div className={style.welcomeMain}>
      <video autoPlay controls className={style.video}>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};
