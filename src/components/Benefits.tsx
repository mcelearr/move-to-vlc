import Benefit from "./Benefit";

const benefits = [
  {
    header: "Thriving Digital Nomad community",
    description: "Events every night of the week and groups for every taste",
  },
  {
    header: "Thriving Digital Nomad community",
    description: "Events every night of the week and groups for every taste",
  },
  {
    header: "Thriving Digital Nomad community",
    description: "Events every night of the week and groups for every taste",
  },
  {
    header: "Thriving Digital Nomad community",
    description: "Events every night of the week and groups for every taste",
  },
];

const Benefits = () => (
  <div>
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
