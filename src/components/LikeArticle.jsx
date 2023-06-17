import React from 'react'
import { BiLike } from 'react-icons/bi'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function LikeArticle({ id, likes }) {
    const [user] = useAuthState(auth);

    const likesRef = doc(db, 'Articles', id);

    const handleLike = () => {
        if (likes?.includes(user.uid)) {
            updateDoc(likesRef, {
                likes: arrayRemove(user.uid),
            }).then(() => {
                toast.warning('Article unliked')
                console.log('unliked');
            }).catch((e) => {
                console.log(e);
                
            })
        } else {
            updateDoc(likesRef, {
                likes: arrayUnion(user.uid)
            }).then(() => {
                toast.success('Article liked')
                likes++;
                console.log('liked');
            }).catch((e) => {
                console.log(e);
            })
        }
    }
    
  return (
    <div
      className=""
      style={{
        cursor: "pointer",
        color: likes?.includes(user.uid) ? "red" : null,
      }}
      onClick={handleLike}
    >
        <div className='flex justify-content-center align-items-center'>
        {likes.length}&nbsp;
        <BiLike className='fs-3' />

        </div>
      {/* {!likes?.includes(user.uid) ? <BiLike /> : ""} */}
    </div>
  );
}
