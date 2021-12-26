import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Layout from "../components/Layout";
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
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className="bg-white">
          <div className="layout flex flex-col justify-center items-center min-h-screen text-center">
            <h1>Next.js + Tailwind CSS + TypeScript Starter</h1>
            <p className="mt-2 text-sm text-gray-800">
              A starter for Next.js, Tailwind CSS, and TypeScript with Absolute
              Import, Seo, Link component, pre-configured with Husky{" "}
            </p>

            <footer className="absolute bottom-2 text-gray-700">
              © {new Date().getFullYear()} By Rory
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
