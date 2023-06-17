import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from './LikeArticle';
import { Link } from "react-router-dom";

export default function Articles() {
  const [user] = useAuthState(auth);

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      // console.log(articles);
    });
  }, []);

  return (
    <div className="container border border-light m-1 p-2 rounded">
      <h4>Article List ({articles.length})</h4>
      {articles.length === 0 ? (
        <p>No articles found!</p>
      ) : (
        articles.map(
          ({
            id,
            title,
            description,
            imageUrl,
            createdAt,
            createdBy,
            userId,
            likes,
            comments,
          }) => (
            <div className="border mt-3 p-3 bg-light" key={id}>
              <div className="row">
                <div className="col-3">
                  <Link to={`/article/${id}`}>
                    <img
                      src={imageUrl}
                      alt="title"
                      className="img-fluid shadow-sm"
                    />
                  </Link>
                </div>
                <div className="col-9 ps-3">
                  <div className="row">
                    <div className="col-6">
                      {createdBy && (
                        <span className="badge bg-primary">{createdBy}</span>
                      )}
                    </div>
                    <div className="col-6 d-flex flex-row justify-content-end">
                      {/* <button className="btn btn-success btn-sm">Edit</button>
                      &nbsp; */}
                      {user && user.uid === userId && (
                        <DeleteArticle id={id} imageUrl={imageUrl} />
                      )}
                    </div>
                  </div>

                  <h4>{title}</h4>
                  <p className="small">
                    {createdAt.toDate().toDateString()}{" "}
                    {createdAt
                      .toDate()
                      .toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                  </p>
                  <p>{description}</p>

                  <div className="d-flex flex-row-reverse">
                    {user && <LikeArticle id={id} likes={likes} />}
                  </div>

                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}
