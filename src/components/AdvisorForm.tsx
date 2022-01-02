import { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import Stripe from "stripe";
import { AdvisorFormValues, SERVICE_TYPE } from "@/types";
import { fetchPostJSON } from "@/utils/api-helpers";
import getStripe from "@/utils/get-stripe";

const advisorFormInitialValues: AdvisorFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  advisorType: SERVICE_TYPE.LAWYER,
  dob: "",
  gender: "",
  nationality: "",
  location: "",
  residence: "",
};

const AdvisorForm = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  return (
    <div className="bg-white border border-gray-200 px-5 py-5 rounded-md w-full">
      <Formik
        initialValues={advisorFormInitialValues}
        onSubmit={async (
          values: AdvisorFormValues,
          { setSubmitting }: FormikHelpers<AdvisorFormValues>
        ) => {
          try {
            console.log("values>>>>>>>>", values);
            const checkoutSession: Stripe.Checkout.Session =
              await fetchPostJSON("/api/advisor", values);

            if ((checkoutSession as any).statusCode === 500) {
              console.error((checkoutSession as any).message);
              return;
            }

            const stripe = await getStripe();
            const { error } = await stripe!.redirectToCheckout({
              sessionId: checkoutSession.id,
            });

            if (error) throw error;
          } catch (error) {
            setEmailError(true);
            setEmailSuccess(false);
            console.error(error.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="-mx-3 flex flex-wrap mb-6">
              <div className="mb-6 px-4 w-full md:mb-0 md:w-1/2">
                <label
                  className="block dark:text-gray-800 font-semibold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <p className="font-light text-gray-400">
                  First name as it appears on your passport
                </p>
                <Field
                  className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                  id="firstName"
                  name="firstName"
                  required
                />
              </div>
              <div className="px-4 w-full md:w-1/2">
                <label
                  className="block dark:text-gray-800 font-semibold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <p className="font-light text-gray-400">
                  Last name as it appears on your passport
                </p>
                <Field
                  className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                  id="lastName"
                  name="lastName"
                  required
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap mb-6">
              <div className="px-4 w-full">
                <label
                  className="block dark:text-gray-800 font-semibold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <p className="font-light text-gray-400">
                  This for the advisor to contact you. This is NOT a mailing
                  list. We won't send you emails.
                </p>
                <Field
                  className="border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 leading-tight px-4 py-3 rounded-md w-full"
                  id="email"
                  name="email"
                  type="email"
                  required
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap mb-6">
              <div className="px-4 w-full">
                <label
                  className="block dark:text-gray-800 font-semibold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <p className="font-light text-gray-400">
                  Include country code e.g. +34612033295
                </p>
                <Field
                  className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                  id="phone"
                  name="phone"
                  type="phone"
                  required
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap mb-6">
              <div className="px-4 w-full">
                <label
                  className="block dark:text-gray-800 font-semibold mb-2"
                  htmlFor="advisorType"
                >
                  Advisor Type
                </label>
                <p className="font-light text-gray-400">
                  There are two types of advisor: Immigration & Tax lawyers and
                  Gestors. If you are interested in a consultation about getting
                  a visa or taxes, select 'Immigration & Tax lawyer'. The price
                  is €100 for a 1 hr call. If you are interested in a
                  consultation about getting a NIE, getting a bank account or
                  any other administrative task, select 'Gestor'.The price is
                  €50 for a 1 hr call.
                </p>
                <Field
                  as="select"
                  className="border border-gray-200 dark:text-gray-800 leading-tight px-4 py-3 rounded-md w-full"
                  id="advisorType"
                  name="advisorType"
                  required
                >
                  <option value="lawyer">€100 Immigration & Tax Advisor</option>
                  <option value="gestor">
                    €50 Gestor (NIE, Bank Account etc.)
                  </option>
                </Field>
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap mb-6">
              <div className="mb-6 px-4 w-full md:mb-0 md:w-1/2">
                <label
                  className="block dark:text-gray-800 font-semibold mb-2"
                  htmlFor="dob"
                >
                  Date of birth
                </label>
                <p className="font-light text-gray-400">
                  YYYY-MM-DD format (year-month-day)
                </p>
                <Field
                  className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                  id="dob"
                  name="dob"
                  required
                />
              </div>
              <div className="px-4 w-full md:w-1/2">
                <label
                  className="block dark:text-gray-800 font-semibold mb-2"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <p className="font-light text-gray-400">
                  Legal gender as it appears on your passport
                </p>
                <Field
                  className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                  id="gender"
                  name="gender"
                  required
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap mb-6">
              <div className="mb-6 px-4 w-full md:mb-0 md:w-1/2">
                <label
                  className="block dark:text-gray-800 font-semibold mb-2"
                  htmlFor="nationality"
                >
                  Nationality
                </label>
                <p className="font-light text-gray-400">
                  If you have multiple, use the primary
                </p>
                <Field
                  className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                  id="nationality"
                  name="nationality"
                  required
                />
              </div>
              <div className="px-4 w-full md:w-1/2">
                <label
                  className="block dark:text-gray-800 font-semibold mb-2"
                  htmlFor="location"
                >
                  Location
                </label>
                <p className="font-light text-gray-400">
                  In which country are you staying now?
                </p>
                <Field
                  className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                  id="location"
                  name="location"
                  required
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap mb-6">
              <div className="px-4 w-full">
                <label
                  className="block dark:text-gray-800 font-semibold mb-2"
                  htmlFor="residence"
                >
                  Residence
                </label>
                <p className="font-light text-gray-400">
                  What's your current legal country of residence? This is the
                  country you're legally registered as a resident at the city or
                  country government. If you don't have one now, use your last
                  known.
                </p>
                <Field
                  className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                  id="residence"
                  name="residence"
                  required
                />
              </div>
            </div>
            <p className="dark:text-gray-800 font-light">
              After clicking the button below, you will be redirected to
              complete payment for your first onboarding call. This is
              non-refundable. This is only for the onboarding call. By
              submitting information on this website, you agree that this
              information will be shared with third-parties for the purpose of
              providing you with the product and/or service you requested.
            </p>
            {emailError && (
              <p className="font-light text-red-600 text-sm">
                Error setting up a meeting. Sorry! My DMs are open on{" "}
                <a href="https://twitter.com/RMcElearney" className="underline">
                  Twitter
                </a>
              </p>
            )}
            {emailSuccess && (
              <p className="font-light text-gray-600 text-sm">
                Check your inbox, you should have a confirmation email from me.
              </p>
            )}
            <button
              className="bg-gray-800 focus:outline-none focus:ring-2 font-semibold mt-4 px-6 py-3 rounded-md text-lg text-white w-full"
              type="submit"
            >
              {isSubmitting ? "Submitting..." : "Speak to an advisor"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdvisorForm;
