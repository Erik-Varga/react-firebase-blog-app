import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../firebaseConfig';
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from './LikeArticle';
import Comment from './Comment';

export default function Article() {
    const {id} = useParams();
    const [user] = useAuthState(auth);

    const [article, setArticle] = useState(null);

    useEffect(() => {
      const docRef = doc(db, "Articles", id);
      onSnapshot(docRef, (snapshot) => {
        setArticle({ ...snapshot.data(), id:snapshot.id });
      });
    }, [id]);

  return (
    <div className='container border bg-light'>
      {
        article && (
            <div className='row p-1 pt-2'>
                <div className='col-3'>
                    <img src={article.imageUrl} alt={article.title} className='shadow' style={{ width: '100%', padding: 0}}/>
                </div>

                <div className="col-9 ps-3">
                  <div className="row">
                    <div className="col-6">
                      {article.createdBy && (
                        <span className="badge bg-primary">{article.createdBy}</span>
                      )}
                    </div>
                    <div className="col-6 d-flex flex-row-reverse">
                      {user && (
                        <DeleteArticle id={id} imageUrl={article.imageUrl} />
                      )}
                    </div>
                  </div>

                  <h4>{article.title}</h4>
                  <p className="small">
                    Posted On:&nbsp;
                    {article.createdAt.toDate().toDateString()}{" "}
                    {article.createdAt
                      .toDate()
                      .toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                  </p>
                  <hr />

                  <p>{article.description}</p>

                  <div className="d-flex flex-row-reverse align-items-center">
                    {user && <LikeArticle id={id} likes={article.likes} />}
                  </div>

                {/* comment */}
                <Comment id={article.id} />
                </div>
                
            </div>
        )
      }
    </div>
  )
}
