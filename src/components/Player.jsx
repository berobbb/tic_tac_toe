import { useState } from "react";
import React from 'react'


export default function Player(props) {
    const [newName ,setnewName]= useState(props.name)
    const[isEditing,setIsEditing]=useState(false);
    function input(){
        setIsEditing((editing)=>!editing);
    }
    function handleChange(event){
      setnewName(event.target.value);
    }
    let playerName=<span className="player-name">{newName}</span>;
    let btnCaption="Edit";
    if(isEditing)
    {
        playerName=<input type="text" required placeholder="Type a Name" onChange={handleChange} />
        btnCaption="Save"

    }
  return (
    <li className={props.isActive?'active':undefined}>
          <span className="player">
          {playerName}
          <span className="player-name">{props.symbol}</span>
          </span>
          <button onClick={input}>{btnCaption}</button>
        </li>
  );
}
