/** *Reusable Input and Button Components

 * @author PetterMartin*/

let lastRequestTime = 0;

export default function CreatePostForm() {
  async function handleOnSubmit(event) {
    const currentTime = Date.now();

    if (currentTime - lastRequestTime < 10000) {
      console.log("Wait 10 seconds between requests.");
      return;
    }

    lastRequestTime = currentTime;

    event.preventDefault();

    const form = event.target;
    const { title, body, imageUrl } = form.elements;

    //Correct user id and token inserted - CNB.
    const accessKey = localStorage.getItem("jwt");

    const newPost = {
      title: title.value,
      body: body.value,
      media: imageUrl.value,
    };

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/social/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessKey}`,
          },
          body: JSON.stringify(newPost),
        }
      );

      if (response.ok) {
        console.log("Post successful!");
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.response) {
        console.error("Server responded with status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    }
  }

  return (
    <form
      className="w-full p-4 mb-1 text-xl text-gray-900 border-2 border-white bg-neutral-100 rounded-3xl dark:bg-gray-800 dark:border-gray-700"
      onSubmit={handleOnSubmit}
    >
      <h3>Create a new posts</h3>

      <section>
        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="title" className="block text-sm leading-6 text-black">
            Subject
          </label>

          <input
            id="title"
            name="title"
            required
            className="w-full h-auto p-2 overflow-hidden text-sm border border-gray-300 resize-none dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 rounded-3xl"
          />
        </div>
      </section>

      <div>
        <div className="flex flex-col gap-1 mt-2">
          <label
            htmlFor="userId"
            className="block text-sm leading-6 text-black"
          >
            What´s on your mind?
          </label>
          <input
            id="body"
            name="body"
            className="w-full h-20 p-2 overflow-hidden text-sm border border-gray-300 resize-none dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 rounded-3xl"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-2 mb-4">
        <label
          htmlFor="imageUrl"
          className="block text-sm leading-6 text-black"
        >
          Upload Image (Optional)
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          className="p-2 border border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 rounded-3xl"
        />
      </div>

      <div>
        <button
          type="submit"
          className="px-12 py-2 leading-tight tracking-tight text-gray-900 bg-orange-200 border-2 border-orange-200 dark:bg-blue-500 dark:text-white dark:border-blue-500 dark:hover:border-blue-400 rounded-3xl ms-1 hover:border-orange-100 shadow-custom"
        >
          Post
        </button>
      </div>
    </form>
  );
}
