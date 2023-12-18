"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css/sea-green";
import "@styles/login.css";

// or only core styles
import "@splidejs/react-splide/css/core";

const signinpage = () => {
  const router = useRouter();
  const { data: session, sessionStatus } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await signIn("login", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (res.error) {
        setError(res.error);
        return;
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const googleSignIn = () => {
    signIn("google", {
      redirect: false,
      callbackUrl: "/",
    });
  };

  useEffect(() => {
    if (session?.user) {
      console.log("session loaded");
      router.push("/");
    }
  }, [session?.user]);

  return (
    <div className="container">
      <Link className="branding" href="/">
        <img src="/assets/images/logo.svg" alt="" />
        <span>PromptGuru</span>
      </Link>
      <div className="sidebanner halfdiv">
        <div className="banner">
          <Splide
            aria-label="My Favorite Images"
            hasTrack={false}
            options={{
              rewind: true,
              gap: "1rem",
              perPage: 1,
              autoplay: true,
              interval: 5000,
            }}
          >
            <SplideTrack>
              <SplideSlide>
                <img src="/assets/images/illustration1.png" alt="" />
              </SplideSlide>
              <SplideSlide>
                <img src="/assets/images/illustration2.png" alt="" />
              </SplideSlide>
              <SplideSlide>
                <img src="/assets/images/illustration3.png" alt="" />
              </SplideSlide>
            </SplideTrack>
            <div className="splide__progress">
              <div className="splide__progress__bar" />
            </div>
          </Splide>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form halfdiv">
        <div className="formbox">
          <h3>Sign in to PromptGuru</h3>
          <div className="inpbox">
            <i className="fal fa-at"></i>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              autoComplete="off"
              required
            />
          </div>
          <div className="inpbox">
            <i className="fal fa-lock"></i>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="off"
              required
            />
          </div>

          <div className="input-group w-full">
            {error ? (
              <div className="bg-red-400 rounded-2xl p-3 text-white border-red-700 w-full ml-0 mt-5">
                <i className="fa-light fa-triangle-exclamation mr-2"></i>
                {error}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="inpbox1 btnbox">
            <input className="button" type="submit" value="SIGN IN" />
          </div>

          <div className="input-group mb-5">
            <span className="mr-2">Need a account?</span>
            <Link href="/auth/signup" className="text-blue-900">
              {" "}
              Register now
            </Link>
          </div>

          <br />

          <div
            className="inpbox not-centered cursor-pointer"
            onClick={googleSignIn}
          >
            <div className="gbutton">
              <img src="/assets/images/google.png" alt="" /> Sign In with Google
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default signinpage;
