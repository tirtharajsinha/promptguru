"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import PromptCardList from "./PromptCardList";
import Image from "next/image";
import "@styles/skeleton.css";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  const filterPostByQuery = (query) => {
    const filteredPosts = allPosts.filter(
      (p) =>
        p.creator.username.includes(query) ||
        p.prompt.includes(query) ||
        p.tag.includes(query)
    );
    return filteredPosts;
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const query = e.target.value;

    setPosts(filterPostByQuery(query));
  };

  const handleTagClick = (tagname) => {
    setSearchText(tagname);
    setPosts(filterPostByQuery(tagname));
  };

  const handleSearchReset = () => {
    setSearchText("");
    setPosts(allPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      await console.log(data);
      setAllPosts(data);
      setPosts(data);
      setLoading(data ? false : true);
    };

    fetchPosts();
  }, []);

  if (loading) {
    console.log("loading");
    return <div className="skeleton-ff63atkkp8m"></div>;
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="search"
          placeholder="Search for a tag or user"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
        {searchText !== "" ? (
          <Image
            src="/assets/icons/close.svg"
            alt=""
            width={15}
            height={15}
            onClick={handleSearchReset}
            className="ml-2 cursor-pointer"
          />
        ) : (
          <></>
        )}
      </form>
      <div className="skeleton-ff63atkkp8m"></div>

      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
