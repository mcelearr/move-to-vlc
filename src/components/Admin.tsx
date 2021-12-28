import React from "react";

const Admin = () => (
  <div>
    <h1 className="font-semibold mb-2 text-2xl">Once you get here</h1>
    <p className="font-light mb-2">
      To get 'on the system' there are a few admin tasks that I recommend
      tackling in this order. You can manage all of them yourself, or fill out
      the form below to talk to an advisor.
    </p>
    <div className="mb-2">
      <h2 className="font-semibold">📄 NIE (identity number)</h2>
      <p className="font-light">
        This is how you will be identified inside of Spain - you need it for
        pretty much everything
      </p>
    </div>
    <div className="mb-2">
      <h2 className="font-semibold">🏦 Bank account</h2>
      <p className="font-light">
        You'll need a bank account to get a phone number or health insurance
      </p>
    </div>
    <div className="mb-2">
      <h2 className="font-semibold">📞 Phone</h2>
      <p className="font-light">
        You'll need a Spanish phone number to fill out most forms
      </p>
    </div>
    <div className="mb-2">
      <h2 className="font-semibold">🏥 Health insurance</h2>
      <p className="font-light">
        You'll need health insurance once your travel insurance runs out and you
        haven't paid into social security
      </p>
    </div>
  </div>
);

export default Admin;
