import { useGetPostsQuery } from "../api";
import { Link } from "react-router-dom";

function PostList() {
  const { data: posts } = useGetPostsQuery();

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body.substring(0, 100)}...</p>
          <Link to={`/post/${post.id}`}>View</Link>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostList;
