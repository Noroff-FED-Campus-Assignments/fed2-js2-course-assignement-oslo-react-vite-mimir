/** *Reusable Input and Button Components

 * @author PetterMartin*/
import { Link } from "@tanstack/react-router";  //Cnbergh: added link for "view a post"
import { useState, useEffect } from "react";
import UserIcon from "../../../assets/icons/user.svg";
import CommentSection from "../commenting";

function OtherPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedBody, setEditedBody] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [filter, setFilter] = useState('All'); // New state for filter - Cnbergh

  //Correct user id and token inserted - Cnbergh.
  const accessKey = localStorage.getItem("jwt");

  const fetchData = async () => {
    try {
      const url = new URL("https://api.noroff.dev/api/v1/social/posts?limit=10");
      const response = await fetch(url.href, {
        headers: {
          Authorization: `Bearer ${accessKey}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const updatedData = responseData.map((post) => {
          const existingPost = data.find((p) => p.id === post.id);
          if (existingPost) {
            post.likes = existingPost.likes;
          }
          return post;
        });
        setData(updatedData);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchData();

    const timer = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const handleEditClick = (index, body) => {
    setEditIndex(index);
    setEditedBody(body);
  };

  useEffect(() => {
    let filteredPosts = data;

    if (filter === 'Text') {
      filteredPosts = data.filter(post => post.body);
    } else if (filter === 'Media') {
      filteredPosts = data.filter(post => post.media);
    }

    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filteredPosts);
  }, [data, searchTerm, filter]);

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/social/posts/${data[editIndex].id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessKey}`,
          },
          body: JSON.stringify({
            title: data[editIndex].title,
            body: editedBody,
            tags: data[editIndex].tags,
            media: data[editIndex].media,
          }),
        }
      );

      if (response.ok) {
        console.log("Post updated successfully!");
      } else {
        throw new Error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setEditIndex(null);
      setEditedBody("");
      fetchData();
    }
  };

  const handleDeleteClick = async (postId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (isConfirmed) {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/social/posts/${postId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessKey}`
            },
          }
        );

        if (response.ok) {
          console.log("Post deleted successfully!");
          fetchData();
        } else {
          throw new Error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  useEffect(() => {
    const savedLikedPosts = localStorage.getItem("likedPosts");
    if (savedLikedPosts) {
      setLikedPosts(JSON.parse(savedLikedPosts));
    }

    fetchData();

    const timer = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(timer);
  }, []);


  const handleLikeClick = async (postId) => {
    try {
      if (!likedPosts.includes(postId)) {
        const emojiSymbol = "👍";
        const response = await fetch(
          `https://api.noroff.dev/api/v1/social/posts/${postId}/react/${encodeURIComponent(
            emojiSymbol
          )}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessKey}`,
            },
          }
        );

        if (response.ok) {
          const reactionData = await response.json();

          const updatedLikedPosts = [...likedPosts, postId];
          setLikedPosts(updatedLikedPosts);
          localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));

          setData((prevData) =>
            prevData.map((post) =>
              post.id === postId ? { ...post, likes: reactionData.count } : post
            )
          );
        } else {
          throw new Error("Failed to react to the post");
        }
      } else {
        console.log("You have already liked this post.");
      }
    } catch (error) {
      console.error("Error reacting to the post:", error);
    }
  };

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);


  const handleCommentSubmit = async (postId, comment) => {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/social/posts/${postId}/comment`,
        {
          method: "POST",
          body: JSON.stringify({
            body: comment,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessKey}`,
          },
        }
      );

      if (response.ok) {
        const newCommentData = await response.json();

        setComments((prevComments) => ({
          ...prevComments,
          [postId]: [...(prevComments[postId] || []), newCommentData.body],
        }));

        const storedComments = JSON.parse(localStorage.getItem("comments")) || {};

        const updatedComments = {
          ...storedComments,
          [postId]: [...(storedComments[postId] || []), newCommentData.body],
        };
        localStorage.setItem("comments", JSON.stringify(updatedComments));
      } else {
        throw new Error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };





  return (
    <div className="w-full p-6 bg-orange-200 border-2 border-orange-100 rounded-3xl dark:bg-gray-800 dark:border-gray-700">
      <h1 className="mb-4 text-2xl font-bold text-left text-gray-800 dark:text-white">
        Posts
      </h1>

      <div className="flex justify-between mb-4"> {/** Flexbox container - changed search to include filter -- @author Cnbergh*/}
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 text-base text-left text-gray-800 bg-gray-100 border border-gray-400 rounded-lg dark:text-white dark:bg-gray-700 dark:border-gray-600"
        />

        {/* Filter Dropdown */}
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="w-1/4 p-2 text-base text-left text-gray-800 bg-gray-100 border border-gray-400 rounded-lg dark:text-white dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="All">All</option>
          <option value="Text">Text</option>
          <option value="Media">Media</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        filteredData
          .filter((post) => post.title || post.body || post.media)
          .map((post, index) => (
            <div
              key={index}
              className="w-full p-4 mb-4 border-2 border-white bg-neutral-100 rounded-3xl dark:bg-gray-700 dark:border-gray-600"
            >
              {/* Title */}
              <h2 className="text-lg font-bold text-left text-gray-800 dark:text-white">
                {post.title}
              </h2>

              {/* Body */}
              {editIndex === index ? (
                <textarea
                  className="w-full p-2 text-base text-left text-gray-800 bg-gray-100 border border-gray-400 rounded-lg dark:text-white dark:bg-gray-700 dark:border-gray-600"
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                />
              ) : (
                <p className="mb-2 text-base text-left text-gray-800 dark:text-white">
                  {post.body}
                </p>
              )}

              {/* Media */}
              {post.media && (
                <img
                  src={post.media}
                  alt="Post Media"
                  className="w-full h-auto mb-2"
                />
              )}

              {/* User Icon, User ID, Like, Comment, and CommentSection */}
              <div className="flex flex-wrap items-center justify-between w-full mb-2">
                <div className="flex items-center">
                  <img
                    src={UserIcon}
                    alt="User Icon"
                    className="w-10 h-10 rounded-full dark:invert"
                  />
                  <p className="ml-2 text-sm text-gray-600 dark:text-white">
                    @{post.id}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {editIndex === index ? (
                    <button
                      className="text-sm text-gray-600 border border-gray-300 dark:text-white dark:border-darkGray dark:bg-gray-700 hover:text-emerald-600 hover:border-emerald-600"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-sm text-gray-600 border border-gray-300 dark:text-white dark:border-darkGray dark:bg-gray-700 hover:text-yellow-500 hover:border-yellow-400"
                      onClick={() => handleEditClick(index, post.body)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(post.id)}
                    className="text-sm text-gray-600 border border-gray-300 dark:text-white dark:border-darkGray dark:bg-gray-700 hover:text-red-500 hover:border-red-500"
                  >
                    Delete
                  </button>
                  <button
                    className="text-sm text-gray-600 border border-gray-300 dark:text-white dark:border-darkGray dark:bg-gray-700 hover:text-emerald-500 hover:border-emerald-500"
                    onClick={() => handleLikeClick(post.id)}
                  >
                    {String.fromCodePoint(0x1f44d)} Like {post.likes}
                  </button>
                  {/** Button to "post page" -- @author Cnbergh*/}
                  <Link to={`/posts/${post.id}`}>
                    <button className="text-sm text-gray-600 border border-gray-300 dark:text-white dark:border-darkGray dark:bg-gray-700 hover:text-emerald-500 hover:border-emerald-500">View Post</button>
                  </Link>
                </div>
              </div>

              {/* Comment Section */}
              <CommentSection
                postId={post.id}
                existingComments={comments[post.id] || []}
                onCommentSubmit={handleCommentSubmit}
              />
            </div>
          ))
      )}
    </div>
  );
}

export default OtherPosts;
