import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Seo from "@/components/Seo";

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
      <Hero />
      <Layout>
        {/* <Seo templateTitle='Home' /> */}
        <Seo />

        <main className="bg-white p-4"></main>
      </Layout>
    </>
  );
}
