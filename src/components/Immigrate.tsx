import React from "react";
import Visa from "./Visa";

const visas = [
  {
    description: "Want to start an innovative business in Spain?",
    emoji: "👔",
    linkText: "Entrepreneur Visa",
    linkUrl: "",
  },
  {
    description: "Want to start an innovative business in Spain?",
    emoji: "👔",
    linkText: "Entrepreneur Visa",
    linkUrl: "",
  },
];

const Immigrate = () => (
  <div>
    <h1 className="font-semibold mb-2 text-2xl">How to live here</h1>
    <div className="mb-2">
      <h2 className="font-semibold">🇪🇺 EU citizens</h2>
      <p className="font-light">
        You have the right to live and work anywhere in the EU
      </p>
    </div>
    <div className="mb-2">
      <h2 className="font-semibold">🌎 Non-EU citizens</h2>
      <p className="font-light">
        If you stay longer than 90 days you will need a visa. This can get
        pretty complicated but I have tried to summarize the most popular
        options here:
      </p>
    </div>
    {visas.map((visa) => (
      <Visa
        emoji={visa.emoji}
        description={visa.description}
        linkText={visa.linkText}
        linkUrl={visa.linkUrl}
      />
    ))}
  </div>
);

export default Immigrate;
