import Header from "../components/navbar/header";
import NavBar from "../components/navbar/home-nav";
import ProfilePage from "../components/profile-page";
import SingelPost from "../components/create-post";
import Sosials from "../components/Sosials-profile/index";

export default function Profile() {
  return (
    <>
      <div className="container w-full mx-2 mt-2">
        {/* Header*/}
        <Header />

        {/* Main Content */}
        <div className="flex">
          {/* Left Side */}
          <div className="min-w-80 sm:w-2/12 md:w-3/12">
            <NavBar />
          </div>

          {/* Middle */}
          <div className="w-10/12 mx-1 sm:w-10/12 md:w-7/12">
            <ProfilePage />
            <SingelPost />
          </div>

          {/* Right Side */}
          <div className="w-0 sm:w-0 md:w-2/12">

            <Sosials />
          </div>
        </div>
      </div>
    </>
  );
}
