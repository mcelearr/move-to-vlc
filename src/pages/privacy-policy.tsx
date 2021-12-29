import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

export default function PrivacyPolicy() {
  return (
    <>
      <Seo templateTitle="Privacy Policy" />
      <Container>
        <main>
          <div>
            <h1 className="mb-8 mt-8">Privacy Policy</h1>
            <p className="font-light mb-2">
              GDPR purposes of data collection and storage:
            </p>
            <ol className="font-light mb-2">
              <li>1) We ask your email and phone to contact you;</li>
              <li>
                2) We ask legal name, date of birth, gender, nationaltiy,
                residence and location to apply to analyze and advice you on
                your legal and fiscal situation when moving to Valencia
              </li>
              <li>
                3) We store your data securely only for the purpose of providing
                you with the product/service of immigrating to Valencia
              </li>
            </ol>
            <p className="font-light mb-2">
              By using this website and/or using any third-parties we refer you
              to, you agree to these terms of service.
            </p>
            <p className="font-light mb-2">
              By submitting information on this website, you agree that this
              information will be shared with this website and third-parties for
              the purpose of providing you with the product and/or service you
              requested.
            </p>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </Container>
    </>
  );
}
