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
  job: "",
  comments: "",
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
                  There are two types of advisor: Immigration & Tax Advisor and
                  Gestor. If you are interested in a consultation about getting
                  a visa or taxes, select 'Immigration & Tax Advisor'. The price
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
                  <option value={SERVICE_TYPE.LAWYER}>
                    €100 Immigration & Tax Advisor
                  </option>
                  <option value={SERVICE_TYPE.GESTOR}>
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
                  Which country are you in right now?
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
                  What country are you legally registered in as a resident? If
                  it's not clear the put your last known residence.
                </p>
                <Field
                  className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                  id="residence"
                  name="residence"
                  required
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap mb-6">
              <div className="px-4 w-full">
                <label
                  className="block dark:text-gray-800 font-semibold mb-2"
                  htmlFor="job"
                >
                  How do you make money?
                </label>
                <p className="font-light text-gray-400">
                  What job title(s) do you have plus any other ways you make
                  money? e.g. Sales for pharmaceutical company, english teacher
                  in primary school, software developer + crypto trading, yoga
                  instructor
                </p>
                <Field
                  className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                  id="job"
                  name="job"
                  required
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap mb-6">
              <div className="px-4 w-full">
                <label
                  className="block dark:text-gray-800 font-semibold mb-2"
                  htmlFor="comments"
                >
                  What type of service are you interested in?
                </label>
                <p className="font-light text-gray-400">
                  Is there a particular visa or gestor service that you are
                  interested in? This is to help our advisors best prepare for
                  the call.
                </p>
                <Field
                  className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                  id="comments"
                  name="comments"
                  required
                />
              </div>
            </div>
            <p className="dark:text-gray-800 font-light">
              By submitting information on this website, you agree that this
              information will be shared with third-parties for the purpose of
              providing you with the product and/or service you requested.
            </p>
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
