import Header from "../components/navbar/header";
import NavBar from "../components/navbar/home-nav";
import PostSubmission from "../components/navbar/users-post";
import PostPage from "../components/navbar/posts";
import TrendingSection from "../components/navbar/trending";

export default function HomePage() {

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
            <PostSubmission />
            <PostPage />
          </div>

          {/* Right Side */}
          <div className="w-0 sm:w-0 md:w-2/12">
            <TrendingSection />
          </div>
        </div>
      </div>
    </>
  );
}

