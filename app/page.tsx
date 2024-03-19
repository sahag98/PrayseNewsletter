import NewsletterForm from "@/components/NewsletterForm";
import Socials from "@/components/Socials";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-950 via-[#03040B] to-[#03040B] flex flex-col items-center justify-center p-10 min-h-[100dvh]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3 space-y-1">
          <Image
            priority
            src={"/prayse-logo.png"}
            width={550}
            height={550}
            className="lg:w-24 w-20 rounded-full  animate-title"
            alt="Prayse Logo"
          />
          <div>
            <h2 className="z-10 text-3xl font-bold text-center text-transparent duration-500 bg-white cursor-default text-stroke animate-title sm:text-5xl md:text-6xl whitespace-nowrap bg-clip-text">
              Join our
            </h2>

            <h1
              className="z-10 text-4xl font-bold text-center text-transparent duration-500 bg-white cursor-default sm:text-6xl md:text-7xl 
        whitespace-nowrap bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 animate-fade-in-3"
            >
              Newsletter
            </h1>
            <p className="z-10 text-sm text-center text-transparent duration-800 animate-fade-in-3 bg-white/60 cursor-default  whitespace-nowrap bg-clip-text">
              And stay up-to-date <br /> with our most recent updates & news!
            </p>
          </div>
        </div>
        <NewsletterForm />
      </div>
      <Socials />
    </main>
  );
}
