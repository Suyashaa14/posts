import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Post, useGetPostsQuery } from "../api/index";

function PostList() {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: newPosts, isLoading, isFetching } = useGetPostsQuery(page);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loader = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    if (!hasMore) {
      return;
    }

    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (newPosts) {
      setPosts((prevPosts) => {
        const filteredNewPosts = newPosts.filter(
          (newPost) => !prevPosts.some((prevPost) => prevPost.id === newPost.id)
        );
        return prevPosts.concat(filteredNewPosts);
      });
    }
  }, [newPosts, isLoading, isFetching]);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchData();
      }
    });

    if (loader.current) {
      observer.current.observe(loader.current);
    }

    return () => {
      if (loader.current && observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        posts?.map((post) => (
          <div key={post.id}>
            <h2>{post.id + "." + " " + post.title}</h2>
            <p>{post.body.substring(0, 100)}...</p>
            <button
              style={{
                border: "1px solid black",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/post/${post.id}`);
              }}
            >
              View
            </button>
            <hr />
          </div>
        ))
      )}
      <div ref={loader} style={{ height: "10px" }}></div>
      {!hasMore && <p>No more posts</p>}
    </div>
  );
}

export default PostList;
