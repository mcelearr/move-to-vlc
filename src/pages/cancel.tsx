import Container from "@/components/Container";
import Seo from "@/components/Seo";
import Link from "next/link";

export default function Cancel() {
  return (
    <>
      <Seo templateTitle="Payment Cancelled" />
      <Container>
        <main>
          <div className="pt-8">
            <h1 className="mb-8 text-2xl">Payment Cancelled</h1>
            <p className="font-light mb-2">
              Your payment has been cancelled. You were not charged.
            </p>
            <p className="font-light mb-2">
              Was there something that made you not want to buy in the end? Do
              you have more questions about the advisors? 🤔🤔🤔
            </p>
            <p className="font-light mb-8">
              Reach out to me on{" "}
              <a className="underline" href="https://twitter.com/RMcElearney">
                Twitter
              </a>{" "}
              and I'd be happy to chat. My DMs are open.
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
