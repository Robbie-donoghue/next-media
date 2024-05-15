"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { handleDelete, handleDeleteComments } from "./utils";
export default function RemoveBtn({ post_id }) {
  return (
    <button className="text-red-400" onClick={() => handleDelete(post_id)}>
      <HiOutlineTrash size={24} />
    </button>
  );
  //RemoveBtnCommen
}
