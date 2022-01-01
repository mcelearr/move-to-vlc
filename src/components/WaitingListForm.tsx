import { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { EMAIL_TYPE, WaitingListFormValues } from "@/types";
import * as ga from "@/lib/ga";

const waitingListFormInitialValues: WaitingListFormValues = {
  firstName: "",
  lastName: "",
  email: "",
};

const WaitingListForm = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  return (
    <div className="bg-white border border-gray-200 px-5 py-5 rounded-md w-full">
      <Formik
        initialValues={waitingListFormInitialValues}
        validate={(values) => {
          ga.event({
            action: "advisor_form",
            params: values,
          });
          return;
        }}
        onSubmit={async (
          values: WaitingListFormValues,
          { setSubmitting }: FormikHelpers<WaitingListFormValues>
        ) => {
          setSubmitting(true);
          try {
            const res = await fetch("/api/sendgrid", {
              body: JSON.stringify({
                values,
                type: EMAIL_TYPE.NOMAD_WAITING_LIST,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            });

            const { error } = await res.json();
            if (error) throw error;
            setEmailError(false);
            setEmailSuccess(true);
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
                  required
                  className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                  id="firstName"
                  name="firstName"
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
                  required
                  className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                  id="lastName"
                  name="lastName"
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
                  This is NOT a mailing list. I will only send you emails
                  specifically about the Nomad Visa. News about the rollout
                  date, documents you need to get ready etc.
                </p>
                <Field
                  required
                  className="border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 leading-tight px-4 py-3 rounded-md w-full"
                  id="email"
                  name="email"
                  type="email"
                />
              </div>
            </div>
            <p className="dark:text-gray-800 font-light">
              The Spanish Government has not released all the details about the
              Nomad Visa yet - it is due to arrive in summer 2022. There is
              likely to be high demand and long wait times once the scheme goes
              live. By signing up to the waiting list you will be at the top of
              the queue and will also have advanced warning about what documents
              you need to provide.
            </p>
            {emailError && (
              <p className="font-light text-red-600 text-sm">
                Error signing up to waiting list. Sorry! My DMs are open on{" "}
                <a href="https://twitter.com/RMcElearney" className="underline">
                  Twitter
                </a>
              </p>
            )}
            {emailSuccess && (
              <p className="font-light text-gray-600 text-sm">
                Check your inbox, you should have a confirmation email from me.
                I'll let you know when there's any news!
              </p>
            )}
            <button
              className="bg-gray-800 focus:outline-none focus:ring-2 font-semibold mt-4 px-6 py-3 rounded-md text-lg text-white w-full"
              type="submit"
            >
              {isSubmitting
                ? "Submitting..."
                : "Join the Nomad Visa waiting list"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WaitingListForm;
