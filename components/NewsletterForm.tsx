"use client";

import { getPlaneKeyframes } from "@/lib/getPlaneKeyframes";
import { getTrailsKeyframes } from "@/lib/getTrailsKeyframes";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { gsap } from "gsap";
import { FormEvent, useRef, useState } from "react";

function NewsletterForm() {
  const [input, setInput] = useState("");
  const [successMessage, setSuccessMessage] =
    useState<MembersSuccessResponse>();
  const [errorMessage, setErrorMessage] = useState("");
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { to, fromTo, set } = gsap;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    const email = input;
    const button = buttonRef.current;

    if (!email || !button) return;

    if (!active) {
      setActive(true);

      to(button, {
        keyframes: getPlaneKeyframes(set, fromTo, button, setActive, setInput),
      });

      to(button, { keyframes: getTrailsKeyframes(button) });
    }

    const res = await fetch("/api/addSubscription", {
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const data = await res.json();
    console.log("res: ", data.res);
    setSuccessMessage(data.res);

    if (data.error) {
      console.log("error: ", data.error);
    }
    if (data.error?.title == "Member Exists") {
      setErrorMessage(data.error.title);
      setSuccessMessage(undefined);
      return;
    } else if (data.error?.title == "Invalid Resource") {
      setErrorMessage(data.error.title);
      setSuccessMessage(undefined);
      return;
    }
    setInput("");

    setErrorMessage("");
  };

  const dismissMessages = () => {
    setSuccessMessage(undefined);
    setErrorMessage("");
  };

  console.log("error msg: ", errorMessage);

  console.log("success: ", successMessage);

  return (
    <div className="flex flex-col space-y-8 md:w-[400px]">
      <form
        onSubmit={handleSubmit}
        className="newsletter-form mt-5 animate-fade-in-3"
      >
        <div className="group flex items-center gap-x-4 py-1 pl-4 pr-1 rounded-[9px] bg-[#090D11] hover:bg-[#15141B] shadow-outline-gray hover:shadow-transparent focus-within:bg-[#15141B] focus-within:!shadow-outline-gray-focus transition-all duration-300">
          <EnvelopeIcon className="hidden sm:inline w-6 h-6 text-[#4B4C52] group-focus-within:text-white group-hover:text-white transition-colors duration-300" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Email address"
            required
            type="email"
            className="flex-1 text-white text-sm sm:text-base outline-none placeholder-[#4B4C52] group-focus-within:placeholder-white bg-transparent placeholder:transition-colors placeholder:duration-300"
          />
          <button
            ref={buttonRef}
            className={`${
              active && "active"
            } disabled:!bg-[#17141F] disabled:grayscale-[65%] disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base`}
            disabled={!input}
            type="submit"
          >
            <span className="default">Subscribe</span>
            {errorMessage ? (
              <span className="error">
                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <line x1="3" y1="3" x2="13" y2="13" />
                  <line x1="3" y1="13" x2="13" y2="3" />
                </svg>
                Error
              </span>
            ) : (
              <span className="success">
                <svg viewBox="0 0 16 16">
                  <polyline points="3.75 9 7 12 13 5"></polyline>
                </svg>
                Done
              </span>
            )}

            <svg className="trails" viewBox="0 0 33 64">
              <path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path>
              <path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path>
            </svg>
            <div className="plane">
              <div className="left"></div>
              <div className="right"></div>
            </div>
          </button>
        </div>
      </form>

      <div className="relative">
        {(successMessage || errorMessage) && (
          <div className="flex items-start space-x-2 bg-[#0A0E12] shadow-outline-gray text-white rounded-[9px] py-4 px-6 animate-fade-bottom absolute">
            <div
              className={
                errorMessage
                  ? "h-6 w-6 bg-[#431010] flex items-center justify-center rounded-full border border-[#431010] flex-shrink-0"
                  : "h-6 w-6 bg-[#1B2926] flex items-center justify-center rounded-full border border-[#273130] flex-shrink-0"
              }
            >
              <CheckIcon
                className={
                  errorMessage
                    ? "h-4 w-4 text-[#ac4c4f]"
                    : "h-4 w-4 text-[#81A89A]"
                }
              />
            </div>
            <div className="text-xs sm:text-sm text-[#686971]">
              {successMessage && !errorMessage && (
                <p>
                  We&apos;ve added{" "}
                  <span className="text-[#ADB0B1]">
                    {successMessage.email_address}
                  </span>{" "}
                  to our waitlist. Keep an eye on your inbox for the latest
                  Prayse news!
                </p>
              )}
              {errorMessage == "Member Exists" && !successMessage && (
                <p>You are already subscribed to our newsletter. Thank you!</p>
              )}{" "}
              {errorMessage == "Invalid Resource" && !successMessage && (
                <p>Something went wrong. Try again later...</p>
              )}
            </div>
            <XMarkIcon
              className="h-5 w-5 cursor-pointer hover:text-red-400 transition-colors flex-shrink-0 text-[#4A4B55] active:text-red-400"
              onClick={dismissMessages}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsletterForm;
