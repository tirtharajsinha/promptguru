import PromptCard from "./PromptCard";
import Link from "next/link";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>

      {data && data.length === 0 ? (
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-center text-2xl text-gray-700 mt-20 mb-5">
            You have not shared any Prompts
          </h1>
          <br />
          <Link href="/create-prompt" className="black_btn w-52 text-center">
            Create Post
          </Link>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Profile;
