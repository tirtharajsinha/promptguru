"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

const signuppage = () => {
  const router = useRouter();
  const { data: session, sessionStatus } = useSession();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [passRepeatError, setPassRepeatError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fomrError, setFormError] = useState("");

  const handlePasswordRepeat = (e) => {
    setPasswordRepeat(e.target.value);
    if (password !== e.target.value) {
      setPassRepeatError("Password does not match.");
    } else {
      setPassRepeatError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setFormError("");
    setUsernameError("");
    setPassRepeatError("");
    setSubmitting(true);
    let haveerror = false;

    if (password === "") {
      setPassRepeatError("Password can't be empty.");
      haveerror = true;
    } else if (password !== passwordRepeat) {
      setPassRepeatError("Password does not match.");
      haveerror = true;
    } else {
      setPassRepeatError("");
    }

    if (haveerror) {
      setSubmitting(false);
      return;
    } else {
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            username: username,
            password: password,
          }),
        });

        if (response.ok) {
          router.push("/auth/signin");
          // console.log(response);
        } else if (response.status == 500) {
          const data = await response.json();
          if (data.errors && data.errors.username) {
            setUsernameError(data["errors"]["username"]["message"]);
          } else {
            setFormError(data["message"]);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className={
          (fomrError ? "border-red-400" : "border-gray-300") +
          " max-w-md mx-auto border-solid border rounded-lg p-10 bg-white"
        }
      >
        <Link
          className="font-semibold text-xl text-gray-600 mb-10 flex gap-3"
          href="/"
        >
          <Image src="/assets/images/logo.svg" alt="" width={30} height={30} />
          <span>PromptGuru - Sign Up</span>
        </Link>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your username
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            className={
              (usernameError
                ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500") +
              " shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
            }
            placeholder="johndoe"
            autoComplete="off"
            required
          />

          <p className="pl-2 text-sm text-red-600 dark:text-red-500">
            {usernameError}
          </p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className={
              (emailError
                ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500") +
              " shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
            }
            placeholder="email@example.com"
            autoComplete="off"
            required
          />
          <p className="pl-2 text-sm text-red-600 dark:text-red-500">
            {emailError}
          </p>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="false"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="">
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Repeat password
            </label>
            <input
              type="password"
              id="repeat-password"
              onChange={(e) => handlePasswordRepeat(e)}
              autoComplete="false"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
        </div>
        <p className="mt-2 mb-5 pl-2 text-sm text-red-600 dark:text-red-500">
          {passRepeatError}
        </p>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              required
            />
          </div>
          <label
            htmlFor="terms"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            I agree with the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              terms and conditions
            </a>
          </label>
        </div>
        <p className="mb-5">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
        <p className="pl-2 my-3 text-base text-red-600 dark:text-red-500">
          {fomrError ? (
            <>
              <i className="fa-light fa-triangle-exclamation mr-2"></i>{" "}
              {fomrError}`
            </>
          ) : (
            ""
          )}
        </p>
        <button
          type="submit"
          className="text-gray-800 font-semibold bg-green-500 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 disabled:opacity-50 rounded-lg text-sm px-5 py-2.5 text-center w-full"
          disabled={submitting}
        >
          {submitting ? "Registering..." : "Register new account"}
        </button>
      </form>
    </div>
  );
};

export default signuppage;
