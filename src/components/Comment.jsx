import React, { useEffect, useState } from "react";
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { BsTrash3 } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";

export default function Comment({ id }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [currentlyLoggedinUser] = useAuthState(auth);
  const commentRef = doc(db, 'Articles', id);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, [id]);

  const handleDeleteComment = (comment) => {
    updateDoc(commentRef, {
        comments: arrayRemove(comment),
    }).then((e) => {
        toast.success('Comment deleted')
    }).catch((error) => {
        toast.error('Error occured', error)
        console.log(error);
    })
  };

  const handleChangeComment = (e) => {
    if (e.key === 'Enter') {
        updateDoc(commentRef, {
            comments: arrayUnion({
                user: currentlyLoggedinUser.uid,
                userName: currentlyLoggedinUser.displayName,
                comment: comment,
                createdAt: new Date(),
                commentId: uuidv4()
            })
        }).then(
            () => {
                setComment('');
            }
        )
    }
  }

  return (
    <div>
      Comments({comments?.length})
      <div className="container">
        {comments !== null &&
          comments.map(({ commentId, user, comment, userName, createdAt }) => (
            <div key={commentId}>
              <div className="border p-2 mt-2 row">
                <div className="col-11">
                    <span className={`badge ${user === currentlyLoggedinUser.uid ? 'bg-success' : 'bg-primary'}`}>
                    {userName}
                    </span>
                    <span className='px-1'>
                        {comment}
                    </span>
                </div>
                <div
                  className="col-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteComment({ commentId, user, comment, userName, createdAt })}
                >
                  {user === currentlyLoggedinUser.uid && <BsTrash3 />}
                </div>
              </div>
            </div>
          ))}

        {currentlyLoggedinUser && (
          <input
            type="text"
            className="form-control mt-4 mb-5"
            value={comment}
            onChange={(e) => {
                setComment(e.target.value);
            }}
            placeholder='Add a comment'
            onKeyUp={(e) => {handleChangeComment(e, id)}}
          ></input>
        )}
      </div>
    </div>
  );
}
