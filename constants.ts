import { Metadata } from "next";

export const socials = [
  {
    id: 1,
    name: "Instagram",
    icon: "https://www.instagram.com/prayse.app",
    url: "https://www.instagram.com/prayse.app",
    handle: "prayse.app",
  },
  {
    id: 2,
    name: "IOS",
    icon: "https://www.instagram.com/prayse.app",
    url: "https://apps.apple.com/us/app/prayseapp/id6443480347",
    handle: "PrayseApp",
  },
  {
    id: 2,
    name: "Android",
    icon: "https://www.instagram.com/prayse.app",
    url: "https://play.google.com/store/apps/details?id=com.sahag98.prayerListApp&hl=en_US&gl=US",
    handle: "Prayse",
  },
];

const title = "Prayse Newsletter";
const description =
  "Join our newsletter to stay up-to-date on what's next for Prayse!";

export const metaData: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
    url: "https://newsletter.prayse.app/",
    siteName: "Prayse Newsletter",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
