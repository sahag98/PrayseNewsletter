import { socials } from "@/constants";
import { SocialIcon } from "react-social-icons";
import { AiOutlineAndroid, AiOutlineApple } from "react-icons/ai";
import Link from "next/link";
function Socials() {
  return (
    <div className=" absolute bottom-5 flex items-center justify-center sm:gap-x-4 md:w-[400px]">
      {socials.map((social) => (
        <Link
          target="_blank"
          href={social.url}
          key={social.id}
          className="flex items-center justify-center animate-fade-in-3 gap-2 cursor-pointer group md:hover:shadow-outline-gray rounded-[9px] p-2 md:p-10 transition duration-200 ease-out"
        >
          {social.name === "IOS" && <AiOutlineApple size={38} color="white" />}
          {social.name === "Android" && (
            <AiOutlineAndroid color="white" size={38} />
          )}
          {social.name === "Instagram" && (
            <SocialIcon
              url={social.url}
              fgColor="#FFF"
              bgColor="transparent"
              className="!h-14 !w-14"
            />
          )}

          <div className="text-xs sm:text-sm space-y-1">
            <p className="text-[#ADB0B1] group-hover:text-white transition font-medium">
              {social.name}
            </p>
            <p className="text-[#4B4C52]">{social.handle}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Socials;
