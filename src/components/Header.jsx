import React from 'react'
import { SiReact, SiFirebase, SiBootstrap } from "react-icons/si";

export default function Header() {
  return (
    <div className='header'>
      <span>React Firebase Blog App</span>
        <span>
          <span className='subtitle'>
            <SiReact />
            <SiFirebase />
            <SiBootstrap />
            &nbsp;
          </span>
        </span> 
    </div>
  )
}
