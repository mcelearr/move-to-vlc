import React, { useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import AdvisorForm from "./AdvisorForm";
import WaitingListForm from "./WaitingListForm";

const Advisor = () => {
  const size = useWindowSize();
  const [openTab, setOpenTab] = useState(1);
  return (
    <div>
      <h1 className="font-semibold mb-2 text-2xl">Speak to an advisor</h1>
      <p className="font-light mb-2">
        Do you want help applying for a visa or getting things set up?
        Navigating Spanish bureaucracy can be a time-consuming headache. We've
        partnered with some great local operators who provide professional
        services to guide you through the process, starting with an 1 hr
        consultation call paid for through this website. The cost for a 1 hr
        call is €100 for an Immigration & Tax advisor and €50 for a Gestor.
      </p>
      <p className="font-light mb-2">
        Are you interested in the Nomad Visa which comes out in summer 2022?
        Join our waiting list and we will keep you up to date with the
        requirements so you can have all your documents ready to go as soon as
        that option becomes available.
      </p>
      <div
        // Had to hack some things together here...
        style={{
          marginBottom: "-1px",
          width: "99%",
          marginLeft: "auto",
          marginRight: "auto",
          zIndex: "10",
        }}
        className="tabs"
      >
        <button
          className={`tab ${size.width < 600 ? "" : "tab-lg"} tab-lifted ${
            openTab === 1 ? "tab-active" : ""
          } ${size.width < 600 ? "" : "text-lg"}`}
          onClick={(e) => {
            e.preventDefault();
            setOpenTab(1);
          }}
        >
          {size.width < 450
            ? "Speak to Advisor"
            : "Speak to an Advisor now ✅ "}
        </button>
        <button
          className={`tab ${size.width < 600 ? "" : "tab-lg"} tab-lifted ${
            openTab === 2 ? "tab-active" : ""
          } ${size.width < 600 ? "" : "text-lg"}`}
          onClick={(e) => {
            e.preventDefault();
            setOpenTab(2);
          }}
        >
          {size.width < 450
            ? "Nomad Visa Waiting List"
            : "Join waiting list for Nomad Visa 📋"}
        </button>
      </div>

      {openTab === 1 && <AdvisorForm />}
      {openTab === 2 && <WaitingListForm />}
    </div>
  );
};

export default Advisor;
