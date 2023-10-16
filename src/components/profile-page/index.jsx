import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();

  //   const url = new URL("https://example.com?foo=1&bar=2");

  // const personname = new URLSearchParams(url.search);
  const personName = "Mirmir";

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyMywibmFtZSI6Ik1pcm1pciIsImVtYWlsIjoiTWlybWlyMjAyM0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk4MDc5MjUzNDIyLTYzOGZhOWIyZDE2MD9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHpaV0Z5WTJoOE1UUjhmSEJwZEdKMWJHeDhaVzU4TUh4OE1IeDhmREElM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04MDAmcT02MCIsImJhbm5lciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjk2OTIxODgxOTAzLWU4N2U1NjYyZDliND9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeGxaR2wwYjNKcFlXd3RabVZsWkh3ME1ueDhmR1Z1ZkRCOGZIeDhmQSUzRCUzRCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTgwMCZxPTYwIiwiaWF0IjoxNjk3MDQ5MDUxfQ.r5ztdR0-BzXv2yYLDfXcmZ-lve4mB4fNhZqC1ypd4i4",
    },
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/social/profiles/${personName}`,
          options
        );

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(loading);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full">
      {/* Profile Section */}
      <div className="overflow-hidden text-gray-900 border-2 border-white bg-neutral-100 dark:text-white dark:bg-gray-800 dark:border-gray-700 rounded-3xl">
        <div className="relative h-60 lg:h-80">
          <div
            className="absolute inset-0 opacity-50 bg-gradient-to-r from-indigo-600 to-indigo-400"
          ></div>
          <img
            src={profile?.banner}
            alt="Banner"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={profile?.avatar}
              alt="Avatar"
              className="object-cover w-32 h-32 border-4 border-white rounded-full lg:w-32 lg:h-48"
            />
          </div>
        </div>
        {/* Profile Details */}
        <div className="px-6 py-8">
          <h1 className="text-2xl font-semibold text-gray-800 md:text-3xl lg:text-3xl dark:text-white">
            {profile?.name}
          </h1>
          <p className="text-gray-600 dark:text-white ">
            "I DANCE FOR MONEY"
          </p>
        </div>
        if you're a cat looking for a dog who'll cherish your every whisker and meow
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800 md:text-xl dark:text-white">
            {profile?.email}
          </h2>
          <p className="text-sm text-gray-600 sm:text-base dark:text-white">
            {/* Add your bio content here */}
          </p>
        </div>
      </div>
    </div>

  );
}