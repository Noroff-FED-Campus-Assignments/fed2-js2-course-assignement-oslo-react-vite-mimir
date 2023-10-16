import { Link } from "@tanstack/react-router";
import HomeIcon from "../../../assets/icons/home.svg";
import UserIcon from "../../../assets/icons/user.svg";
import MailIcon from "../../../assets/icons/mail.svg";
import BookmarkIcon from "../../../assets/icons/bookmark.svg";
import CommunityIcon from "../../../assets/icons/community.svg";
import CogIcon from "../../../assets/icons/cog.svg";

function NavBar() {
  return (
    <nav className="flex flex-col w-full p-5 text-xl text-gray-800 border-2 border-white bg-neutral-100 dark:text-white rounded-3xl dark:bg-gray-800 dark:border-gray-700 h-100 min-w-80">
      <ul className="space-y-6 ">
        <li className="flex items-center w-10 p-2 mt-auto leading-tight text-gray-800 bg-orange-200 border-2 border-orange-200 dark:bg-blue-500 dark:text-white dark:border-blue-500 dark:hover:border-blue-400 md:w-full rounded-3xl hover:border-orange-100 shadow-custom tracking-tigh">
          <Link to="/" style={{ color: "black" }} className="flex items-center dark:invert">
            <img src={HomeIcon} alt="Home Icon" className="w-6 h-6 mr-2" />
            <span className="hidden md:inline-block ">Home</span>
          </Link>
        </li>
        <li className="flex items-center p-2">
          <Link
            to="/profile"
            style={{ color: "black" }}
            className="flex items-center dark:invert"
          >
            <img src={UserIcon} alt="User Icon" className="w-6 h-6 mr-2" />
            <span className="hidden md:inline-block ">Profile</span>
          </Link>
        </li>
        <li className="flex items-center p-2 dark:invert">
          <img src={MailIcon} alt="Mail Icon" className="w-6 h-6 mr-2" />
          <a
            href="#"
            style={{ color: "black" }}
            className="hidden md:inline-block"
          >
            Messages
          </a>
        </li>
        <li className="flex items-center p-2 dark:invert">
          <img
            src={BookmarkIcon}
            alt="Bookmark Icon"
            className="w-6 h-6 mr-2"
          />
          <a
            href="#"
            style={{ color: "black" }}
            className="hidden md:inline-block"
          >
            Bookmarks
          </a>
        </li>
        <li className="flex items-center p-2 dark:invert">
          <img
            src={CommunityIcon}
            alt="Community Icon"
            className="w-6 h-6 mr-2"
          />
          <a
            href="#"
            style={{ color: "black" }}
            className="hidden md:inline-block"
          >
            Communities
          </a>
        </li>
        <li className="flex items-center p-2 dark:invert">
          <img src={CogIcon} alt="Settings Icon" className="w-6 h-6 mr-2" />
          <a
            href="#"
            style={{ color: "black" }}
            className="hidden md:inline-block"
          >
            Settings
          </a>
        </li>
      </ul>

      <div className="pb-16"></div>
      <div className="pb-16"></div>
      <div className="pb-16"></div>

      <button className="hidden w-full p-2 mt-auto leading-tight tracking-tight text-gray-900 bg-orange-200 border-2 border-orange-200 md:inline-block dark:bg-blue-500 dark:text-white dark:border-blue-500 dark:hover:border-blue-400 rounded-3xl hover:border-orange-100 shadow-custom">
        <Link to="/Login">
          Login
        </Link>
      </button>
      <Link to="/Login" style={{ color: "gray-800" }}>
        <span className="flex justify-center text-base text-gray-800 md:hidden dark:text-white">Login</span>
      </Link>
    </nav>
  );
}

export default NavBar;
