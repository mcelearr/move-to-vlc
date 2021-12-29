const Hero = () => {
  return (
    <section>
      <div className="absolute bg-white border border-gray-200 left-0 ml-auto mr-auto mt-28 px-4 py-4 right-0 rounded-md text-center w-80 z-1 md:mt-40 md:w-96">
        <h1 className="dark:text-gray-800 font-semibold mb-3 text-6xl">
          Move to Valencia
        </h1>
        <h2 className="dark:text-gray-800 font-light text-2xl">
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
