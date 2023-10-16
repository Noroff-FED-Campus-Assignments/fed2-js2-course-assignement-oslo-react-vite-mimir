import { useEffect, useState } from "react";

const Sosials = () => {
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [pagination, setPagination] = useState({ limit: 10, offset: 0 });
  const [sorting, setSorting] = useState({ sort: "name", sortOrder: "asc" });

  const options = {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyMywibmFtZSI6Ik1pcm1pciIsImVtYWlsIjoiTWlybWlyMjAyM0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk4MDc5MjUzNDIyLTYzOGZhOWIyZDE2MD9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHpaV0Z5WTJoOE1UUjhmSEJwZEdKMWJHeDhaVzU4TUh4OE1IeDhmREElM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04MDAmcT02MCIsImJhbm5lciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjk2OTIxODgxOTAzLWU4N2U1NjYyZDliND9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeGxaR2wwYjNKcFlXd3RabVZsWkh3ME1ueDhmR1Z1ZkRCOGZIeDhmQSUzRCUzRCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTgwMCZxPTYwIiwiaWF0IjoxNjk3MDYzMzIzfQ.NrTN_OF0maTAH0H_4mhdw4pIkDcuxz_sY3ISUcH-2m4",
    },
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const params = new URLSearchParams({
          limit: pagination.limit,
          offset: pagination.offset,
          sort: sorting.sort,
          sortOrder: sorting.sortOrder,
        });

        const response = await fetch(
          `https://api.noroff.dev/api/v1/social/profiles/?${params.toString()}`,
          {
            method: "GET",
            headers: options.headers,
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            // Assuming the response is an array, so we select the first profile
            setProfile(data[0]);

            // Check if the current user is following this profile
            if (data[0].followed) {
              setIsFollowing(true);
            } else {
              setIsFollowing(false);
            }
          } else {
            console.error("No profiles found");
          }
        } else {
          console.error("Failed to fetch profile data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [pagination, sorting]);

  const handleFollow = async () => {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/social/profiles/follow`,
        {
          method: "PUT",
          headers: options.headers,
        }
      );

      if (response.ok) {
        setIsFollowing(true);
      } else {
        console.error("Failed to follow profile:", response.status);
      }
    } catch (error) {
      console.error("Error following profile:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/social/profiles/unfollow`,
        {
          method: "PUT",
          headers: options.headers,
        }
      );

      if (response.ok) {
        setIsFollowing(false);
      } else {
        console.error("Failed to unfollow profile:", response.status);
      }
    } catch (error) {
      console.error("Error unfollowing profile:", error);
    }
  };

  const handleNextProfile = () => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      offset: prevPagination.offset + prevPagination.limit,
    }));
  };

  const handlePrevProfile = () => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      offset: prevPagination.offset - prevPagination.limit,
    }));
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    const [sort, sortOrder] = value.split("|");

    setSorting({ sort, sortOrder });
  };

  return (
    <div className="hidden w-full h-full p-4 text-gray-800 bg-white border border-gray-300 rounded-lg md:block dark:text-white dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-2xl font-semibold text-black dark:text-white">Follow</h1>
      <div className="mt-6 space-y-2">
        <p className="text-sm text-gray-600 dark:text-white">Profile Suggestions</p>
        {profile?.avatar && (
          <img
            src={profile?.avatar}
            alt={profile?.name}
            className="self-center w-12 h-12 rounded-full"
          />
        )}
        <h2 className="text-lg font-semibold text-black dark:text-white">
          {profile?.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-white">{profile?.email}</p>
        {isFollowing ? (
          <button onClick={handleUnfollow} className="hidden w-full p-2 mt-auto leading-tight tracking-tight text-gray-900 bg-orange-200 border-2 border-orange-200 md:inline-block dark:bg-blue-500 dark:text-white dark:border-blue-500 dark:hover:border-blue-400 rounded-3xl hover:border-orange-100 shadow-custom">
            Unfollow
          </button>
        ) : (
          <button onClick={handleFollow} className="hidden w-full p-2 mt-auto leading-tight tracking-tight text-gray-900 bg-orange-200 border-2 border-orange-200 md:inline-block dark:bg-blue-500 dark:text-white dark:border-blue-500 dark:hover:border-blue-400 rounded-3xl hover:border-orange-100 shadow-custom">
            Follow
          </button>
        )}

        <div className="">
          <button
            onClick={handlePrevProfile}
            className="hidden w-full p-2 mt-auto leading-tight tracking-tight text-gray-900 bg-orange-200 border-2 border-orange-200 md:inline-block dark:bg-blue-500 dark:text-white dark:border-blue-500 dark:hover:border-blue-400 rounded-3xl hover:border-orange-100 shadow-custom"
            disabled={pagination.offset === 0}
          >
            Previous
          </button>
          <button onClick={handleNextProfile} className="hidden w-full p-2 mt-auto leading-tight tracking-tight text-gray-900 bg-orange-200 border-2 border-orange-200 md:inline-block dark:bg-blue-500 dark:text-white dark:border-blue-500 dark:hover:border-blue-400 rounded-3xl hover:border-orange-100 shadow-custom">
            Next
          </button>
        </div>

        <div className="mt-4">
          <select
            id="sortSelect"
            onChange={handleSortChange}
            value={`${sorting.sort}|${sorting.sortOrder}`}
            className="p-1 bg-white border rounded-md dark:bg-gray-700"
          >
            <option value="name|asc">Name (A-Z)</option>
            <option value="name|desc">Name (Z-A)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sosials;
