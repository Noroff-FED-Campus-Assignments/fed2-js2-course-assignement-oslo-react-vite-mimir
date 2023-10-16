import { useState, useEffect } from "react";

const SinglePost = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  // Define query parameters
  const queryParams = {
    _posts: true,
    _following: true,
    _followers: true,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Construct the URL with query parameters using the URLSearchParams object
        const url = new URL(
          "https://api.noroff.dev/api/v1/social/profiles/Mirmir"
        );
        Object.entries(queryParams).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });

        const response = await fetch(url, {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyMywibmFtZSI6Ik1pcm1pciIsImVtYWlsIjoiTWlybWlyMjAyM0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk4MDc5MjUzNDIyLTYzOGZhOWIyZDE2MD9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHpaV0Z5WTJoOE1UUjhmSEJwZEdKMWJHeDhaVzU4TUh4OE1IeDhmREElM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04MDAmcT02MCIsImJhbm5lciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjk2OTIxODgxOTAzLWU4N2U1NjYyZDliND9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeGxaR2wwYjNKcFlXd3RabVZsWkh3ME1ueDhmR1Z1ZkRCOGZIeDhmQSUzRCUzRCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTgwMCZxPTYwIiwiaWF0IjoxNjk3MDYzMzIzfQ.NrTN_OF0maTAH0H_4mhdw4pIkDcuxz_sY3ISUcH-2m4",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Recent Posts</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mt-4 text-xl font-semibold text-black">Posts</h2>
          {profile?.posts.map((post) => (
            <div key={post?.id} className="flex p-4 bg-white rounded-lg shadow">
              <div className="mr-4">
                <img
                  src={profile?.avatar}
                  alt={profile?.name}
                  className="object-cover w-12 h-12 rounded-full"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-black">{post?.title}</h2>
                <p className="text-gray-600 ">{post?.body}</p>
                <div className="mt-2">
                  {post?.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 mr-2 text-xs text-gray-700 bg-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full text-black">
                <img
                  src={post?.media}
                  alt={post?.title}
                  className="object-cover w-full h-48 mt-2 rounded-lg text-balck"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SinglePost;
