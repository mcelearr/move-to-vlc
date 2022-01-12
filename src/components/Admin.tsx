const Admin = () => (
  <div className="mb-8">
    <h1 className="font-semibold mb-2 text-2xl">Once you get here</h1>
    <p className="font-light mb-2">
      To get 'on the system' there are a few admin tasks that I recommend
      tackling in this order. I tried to do most of these on my own and got
      pretty burned by the bureaucracy but in the end I managed it, so it's all
      doable. In Spain it's typical to employ someone, known as a 'Gestor', who
      speaks the language and knows their way around the system to help you with
      these admin tasks. Scroll down to the section 'Speak to an advisor' if you
      would like to speak to a Gestor.
    </p>
    <div className="mb-2">
      <h2 className="font-semibold">📄 NIE (identity number)</h2>
      <p className="font-light">
        This is how you will be identified inside of Spain - you need it for
        pretty much everything. In theory you can get it from the police station
        by booking{" "}
        <a
          className="underline"
          target="_blank"
          href="https://sede.administracionespublicas.gob.es/icpplus/citar?p=46&locale=es"
        >
          here
        </a>{" "}
        but there never seem to be appointments.
      </p>
    </div>
    <div className="mb-2">
      <h2 className="font-semibold">📞 Phone</h2>
      <p className="font-light">
        You'll need a Spanish phone number to fill out most forms. To get a
        permanent contract you will need a bank account. I recommend Pepephone.
        You can also get a prepaid sim from Orange.
      </p>
    </div>
    <div className="mb-2">
      <h2 className="font-semibold">🏦 Bank account</h2>
      <p className="font-light">
        You'll need a bank account to get health insurance and pay taxes. I use
        Openbank. You will need a phone number in order for this to work.
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
