import { Link, useParams } from "react-router-dom";
import { useGetPostQuery } from "../api";

function PostDetail() {
  let { id } = useParams();
  const { data: post } = useGetPostQuery(Number(id));

  return (
    <div>
      <h2>{post?.title}</h2>
      <p>{post?.body}</p>
      <Link to="/">Back</Link>
    </div>
  );
}

export default PostDetail;
