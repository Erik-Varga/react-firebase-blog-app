import React from 'react';
import { AiFillGithub } from "react-icons/ai";
import { BsCodeSlash } from "react-icons/bs";

export default function Footer() {
  return (
      <div>
        <ul className='footer'>
        <li>
            <a href="https://github.com/Erik-Varga" target="_blank" rel="noreferrer">
                 &copy; {(new Date().getFullYear())} Erik Varga | Web Developer
                 &nbsp;<AiFillGithub className='ml-1' />
             </a>
         </li>
         <li>
             <a href="https://github.com/Erik-Varga/react-firebase-blog-app" target="_blank" rel="noreferrer">
             &nbsp;
             Source Code &nbsp;<BsCodeSlash />
             </a>
         </li>
        </ul>
      </div>
  )
}
