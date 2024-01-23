import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Post, useGetPostsQuery } from "../api/index";

function PostList() {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: newPosts, isLoading, isFetching } = useGetPostsQuery(page);
  const navigate = useNavigate();

  const fetchData = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (newPosts) {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    }
  }, [newPosts, isFetching]);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (isAtBottom && !isFetching) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        posts?.map((post, index) => (
          <div key={index}>
            <h2>{index + 1 + "." + " " + post.title}</h2>
            <p>{post.body.substring(0, 100)}...</p>
            <button
              style={{
                border: "1px solid black",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/post/${index + 1}`);
              }}
            >
              View
            </button>
            <hr />
          </div>
        ))
      )}
      {isFetching && <p>Loading more...</p>}
    </div>
  );
}

export default PostList;
