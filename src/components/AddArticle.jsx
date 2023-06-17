import React, { useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

export default function AddArticle() {
  const [user] = useAuthState(auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = (e) => {
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill out all fields");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );
    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            likes: [],
            comments: [],
          })
            .then(() => {
              toast.success("Article was added successfully");
              setProgress(0);
            })
            .catch((err) => {
              toast.error("Error adding article");
            });
        });
      }
    );
    // window.location.reload(true);
  };

  return (
    <div className="container border border-light m-1 p-2 rounded">
      {!user ? (
          <div>
            <h4>Welcome</h4>
            <div className="d-flex flex-column bg-primary-subtle rounded">
            <div className="m-2">
                <Link to="/login">Login</Link> to create new article
            </div>
            <div className="m-2">
                Don't have any an account? <Link to="/register">Register</Link>
            </div>
            </div>
        </div>
      ) : (
        <>
          <h4>Add Article</h4>

          {/* Title */}
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={(e) => handleChange(e)}
          />

          {/* Body */}
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={(e) => handleChange(e)}
          />

          {/* Image */}
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="form-control"
            onChange={(e) => handleImageChange(e)}
          />

          {/* Progress */}
          <br></br>
          <div className="progress-container mb-3">
            {progress === 0 ? null : (
              <div className="progress mb-4" style={{ height: "25px" }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${progress}%` }}
                >
                  {`uploading image: ${progress}%`}
                </div>
              </div>
            )}
          </div>

          <button
            className="btn btn-primary form-control"
            onClick={handlePublish}
          >
            Publish
          </button>
        </>
      )}
    </div>
  );
}
