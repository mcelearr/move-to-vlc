import Visa from "./Visa";

const visas = [
  {
    description:
      "Keep your current job and work remotely from Spain. The Spanish Government has annouced this is coming but hasn't shared the details yet. Scroll down to the section 'Speak to an advisor' and sign up to the waiting list to get live updates about the visa and its requirements.",
    emoji: "💻",
    linkText: "Nomad Visa (coming summer 2022)",
    linkUrl: "",
  },
  {
    description:
      "Want to start an innovative business? There is a visa which allows you to stay for 2 years if you create a startup here.",
    emoji: "👔",
    linkText: "Entrepreneur Visa",
    linkUrl: "",
  },
  {
    description:
      "Get offered a well-paid job in an in-demand industry and the company might be able to sponsor you as a Highly Qualified Professional (HQP)",
    emoji: "👩‍💻",
    linkText: "Work Visa",
    linkUrl:
      "https://balcellsgroup.com/highly-skilled-professional-work-permit/",
  },
  {
    description:
      "Got money to invest in things like real estate? Invest over €500,000 and you can stay on a rolling 1-year visa.",
    emoji: "🏠",
    linkText: "Golden Visa",
    linkUrl: "https://www.immigrationspain.es/en/golden-visa-program/",
  },

  {
    description:
      "Got means to support yourself? The non-lucrative visa blocks you from working and the Government is cracking down on those who skirt the rules.",
    emoji: "🧓",
    linkText: "Non-lucrative Visa",
    linkUrl:
      "https://www.myspanishresidency.com/visas-spain/non-lucrative-visa/",
  },
];

const Immigrate = () => (
  <div className="mb-8">
    <h1 className="font-semibold mb-2 text-2xl">How to live here</h1>
    <div className="mb-2">
      <h2 className="font-semibold">🇪🇺 EU citizens</h2>
      <p className="font-light">
        You have the right to live and work anywhere in the EU
      </p>
    </div>
    <div className="mb-4">
      <h2 className="font-semibold">🌎 Non-EU citizens</h2>
      <p className="font-light">
        If you stay longer than 90 days you will need a visa. This can get
        pretty complicated but I have tried to summarize the most popular
        options here. Bear in mind this is a super simplified list and I am{" "}
        <span className="font-semibold">not</span> a lawyer. This isn't advice,
        only an immigration advisor can advise you. Scroll down to the section
        'Speak to an advisor' if you would like to speak to one.
      </p>
    </div>
    {visas.map((visa) => (
      <Visa
        key={visa.linkText}
        emoji={visa.emoji}
        description={visa.description}
        linkText={visa.linkText}
        linkUrl={visa.linkUrl}
      />
    ))}
  </div>
);

export default Immigrate;
