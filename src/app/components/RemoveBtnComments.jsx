"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { handleDeleteComments } from "./utils";
export default function RemoveBtnComments({ comment_id }) {
  return (
    <button
      className="text-red-400"
      onClick={() => handleDeleteComments(comment_id)}
    >
      <HiOutlineTrash size={24} />
    </button>
  );
}
