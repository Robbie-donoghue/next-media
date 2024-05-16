"use client";

//dormant for now
import { handleComments } from "./utils";
export default function CommentsForm(comments, post_id) {
  return (
    <div>
      <h4 className="text-xl font-bold mb-4">Comments</h4>
      <div className="mb-4">
        <form
          className="text-black flex"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleComments(formData).then(() => {
              e.target.reset();
            });
          }}
        >
          <input
            name="username"
            placeholder="Username"
            value={comments.username}
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            name="comment"
            placeholder="Comment..."
            value={comments.comment}
            className="flex-1 mr-2 px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
