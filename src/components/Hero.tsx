// src/components/Hero.js
import { TiTick } from "react-icons/ti";

const outcomes = [
  "How to build this landing page with Next.js",
  "How to create API endpoint and integrate with ConvertKit API",
  "How to use React Hook Form and TailwindCSS",
];

const ComingSoonBadge = () => (
  <span className="bg-blue-500 inline-block mb-4 px-2 py-1 rounded-md text-white text-xs">
    Coming Soon!
  </span>
);

const Hero = () => {
  return (
    <section>
      <div className="absolute bg-white border border-gray-200 left-0 ml-auto mr-auto mt-40 px-4 py-4 right-0 rounded-md text-center text-gray-900 w-96 z-1">
        <h1 className="font-semibold mb-3 text-6xl">Move to Valencia</h1>
        <h2 className="font-light text-2xl">
          Everything you need to know about immigrating to Valencia in one
          place!
        </h2>
      </div>
      <video autoPlay muted loop className="-z-1 h-60 object-cover w-full">
        <source src="videos/Valencia.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default Hero;
