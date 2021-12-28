import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Seo from "@/components/Seo";
import Benefits from "@/components/Benefits";
import Intro from "@/components/Intro";
import Footer from "@/components/Footer";
import Immigrate from "@/components/Immigrate";
import Advisor from "@/components/Advisor";
import Admin from "@/components/Admin";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Seo />
      <Hero />
      <Container>
        {/* <Seo templateTitle='Home' /> */}
        <main>
          <Intro />
          <Benefits />
          <Immigrate />
          <Admin />
          <Advisor />
        </main>
        <footer>
          <Footer />
        </footer>
      </Container>
    </>
  );
}
