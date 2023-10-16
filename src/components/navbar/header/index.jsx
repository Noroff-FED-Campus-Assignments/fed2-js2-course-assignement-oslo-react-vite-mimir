import { useState, useEffect } from "react";
import logo from "../../../assets/Y_logo.png";
import user from "../../../assets/basic-user.svg";
import { Link } from "@tanstack/react-router";

function Header() {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Replace the URL with the actual endpoint for fetching user profile data
        const response = await fetch("https://api.noroff.dev/api/v1/social/profiles/Mirmir", {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyMywibmFtZSI6Ik1pcm1pciIsImVtYWlsIjoiTWlybWlyMjAyM0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk4MDc5MjUzNDIyLTYzOGZhOWIyZDE2MD9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHpaV0Z5WTJoOE1UUjhmSEJwZEdKMWJHeDhaVzU4TUh4OE1IeDhmREElM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04MDAmcT02MCIsImJhbm5lciI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjk2OTIxODgxOTAzLWU4N2U1NjYyZDliND9peGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeGxaR2wwYjNKcFlXd3RabVZsWkh3ME1ueDhmR1Z1ZkRCOGZIeDhmQSUzRCUzRCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTgwMCZxPTYwIiwiaWF0IjoxNjk3MDYzMzIzfQ.NrTN_OF0maTAH0H_4mhdw4pIkDcuxz_sY3ISUcH-2m4", // Replace with your actual token
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserProfile(userData);
          setLoading(false);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <header className="flex items-center justify-between p-4 mb-1 text-gray-900 border-2 border-white bg-neutral-100 rounded-3xl dark:bg-gray-800 dark:border-gray-700">
      {/* Left side - Logo */}
      <div>
        <img src={logo} alt="Logo" className="w-20 h-20 logo dark:invert" />
      </div>

      {/* Middle - Search Bar (hidden on mobile) */}
      <div className="items-center hidden h-20 mx-4 md:flex w-96">
        <input
          type="text"
          placeholder="Search anything.."
          className="w-full p-2 border-2 rounded-full bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
        />
      </div>

      {/* Right side - User Profile */}
      <div className="flex items-center space-x-2">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <Link
              to="/profile"
              style={{ color: "black" }}
              className="flex items-center "
            >
              <p className="text-center">{userProfile.name}</p>
              <div className="bg-orange-200 border-2 rounded-full w-14 h-14">
                <img
                  src={userProfile.avatar || user}
                  alt="User Avatar"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
