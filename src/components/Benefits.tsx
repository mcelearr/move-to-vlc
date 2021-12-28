import Benefit from "./Benefit";

const benefits = [
  {
    header: "Thriving Digital Nomad community",
    description:
      "Events every night of the week and groups for every taste. Tennis, board games, hiking, beach parties, no matter what you're into, you'll find your people here.",
  },
  {
    header: "Authentic Spanish culture",
    description:
      "Unlike some other nomad destinations, Valencia is a great place to learn Spanish and try to integrate into the local culture. It's definitely not an expat city.",
  },
  {
    header: "Affordable",
    description:
      "You can rent a whole apartment in Valencia for around €800/month and a room for under €400/month, much less than Madrid, Barcelona or Lisbon. Food and drink, taxis, metro, all very affordable.",
  },
  {
    header: "Incredible weather",
    description:
      "You can eat and drink outside basically all year round and even in the middle of winter it's sunny and you can exercise. People are very active here.",
  },
  {
    header: "Bike friendly",
    description:
      "The city has fantastic cycle lanes, and being relatively flat you can cycle anywhere - great for bike lovers or even people who want to give it a try!",
  },
  {
    header: "80% vaccination rate",
    description:
      "Spain is one of the countries in Europe with the best vaccination rates.",
  },
];

const Benefits = () => (
  <div className="mb-8">
    <h1 className="font-semibold mb-2 text-2xl">Why Valencia?</h1>
    {benefits.map((benefit) => (
      <Benefit
        key={benefit.header}
        header={benefit.header}
        description={benefit.description}
      />
    ))}
  </div>
);

export default Benefits;
