import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetPostQuery } from "../api";

function PostDetail() {
  let { id } = useParams();
  const { data: post } = useGetPostQuery(Number(id));
  const navigate = useNavigate();

  return (
    <div>
      <h2>{post?.title}</h2>
      <p>{post?.body}</p>
      <button
        style={{
          border: "1px solid black",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/`);
        }}
      >
        Back
      </button>
    </div>
  );
}

export default PostDetail;
