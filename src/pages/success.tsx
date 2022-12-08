import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import Container from "@/components/Container";
import Seo from "@/components/Seo";
import { fetchGetJSON } from "@/utils/api-helpers";

export default function Success() {
  const router = useRouter();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) return <div>failed to load</div>;
  return (
    <>
      <Seo templateTitle="Payment Successful" />
      <Container>
        <main>
          <div className="pt-8">
            <h1 className="mb-8 text-2xl">Payment Successful</h1>
            <p className="font-light mb-2">
              Thanks so much for trusting in us to help you get settled in
              Valencia! 🎉🎉🎉
            </p>
            <p className="font-light mb-2">
              One of our expert advisors will be in touch with you shortly to
              arrange a call.
            </p>
            <p className="font-light mb-8">
              Reach out to me on{" "}
              <a className="underline" href="https://twitter.com/RMcElearney">
                Twitter
              </a>{" "}
              if you have any problems. My DMs are open.
            </p>
            <Link href="/">
              <a className="text-xl">⬅️ Back to the site</a>
            </Link>
          </div>
        </main>
      </Container>
    </>
  );
}
