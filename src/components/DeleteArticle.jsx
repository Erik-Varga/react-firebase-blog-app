import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { db, storage } from '../firebaseConfig'
import { deleteObject, ref } from 'firebase/storage'
import { toast } from 'react-toastify'
import { BsTrash3 } from 'react-icons/bs'

export default function DeleteArticle({ id, imageUrl }) {
    const handleDelete = async () => {
      if (window.confirm('Are you sure you want to delete this article?')) {
        try {
            await deleteDoc(doc(db, 'Articles', id))
            toast.success('Article deleted successfully')
            const storageRef = ref(storage, imageUrl)
            await deleteObject(storageRef)
        } catch (error) {
            toast.error('Error deleting article')
            console.log(error)
        }
      }
    }
  return (
    <div>
      <button className='btn btn-sm btn-danger' onClick={handleDelete}>
        Delete &nbsp;
        <BsTrash3 />
        </button>
    </div>
  )
}
