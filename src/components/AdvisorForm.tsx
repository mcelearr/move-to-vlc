import { useEffect, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import countryList from "react-select-country-list";
import { AdvisorFormValues } from "@/types";
import { fetchPostJSON } from "@/utils/api-helpers";
import { SERVICES } from "@/constants";

const advisorFormInitialValues: AdvisorFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  services: [],
  nationality: "",
  location: "",
  residence: "",
  job: "",
  comments: "",
};

const AdvisorForm = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    setCountries([
      { value: "", label: "Select a Country" },
      ...countryList().getData(),
    ]);
  }, []);
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
            const { error } = await fetchPostJSON("/api/advisor", values);

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
              <div className="mb-6 px-4 w-full md:mb-0 md:w-1/3">
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
                  as="select"
                >
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="mb-6 px-4 w-full md:mb-0 md:w-1/3">
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
                  as="select"
                >
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="px-4 w-full md:w-1/3">
                <label
                  className="block dark:text-gray-800 font-semibold mb-2"
                  htmlFor="residence"
                >
                  Residence
                </label>
                <p className="font-light text-gray-400">
                  Where are you legally registered in as a resident?
                </p>
                <Field
                  className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                  id="residence"
                  name="residence"
                  required
                  as="select"
                >
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </Field>
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
            <div className="-mx-3 flex flex-wrap mb-8">
              <div role="group" aria-labelledby="checkbox-group">
                <div className="px-4 w-full">
                  <h3 className="block dark:text-gray-800 font-semibold mb-2">
                    Which services are you interested in?
                  </h3>
                  <p className="font-light mb-6 text-gray-400 sm:mb-4">
                    Select all of the services you are interested in:
                  </p>
                  <div className="auto-rows-auto gap-x-4 gap-y-3 grid grid-cols-3 sm:gap-x-20">
                    {SERVICES.map((service) => (
                      <label
                        key={service}
                        className="cursor-pointer font-light text-gray-500 text-sm sm:text-gray-600"
                      >
                        <Field
                          className="block border border-gray-200 rounded-sm sm:inline-block sm:mr-2"
                          type="checkbox"
                          name="services"
                          value={service}
                        />
                        {service}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap mb-6">
              <div className="px-4 w-full">
                <label
                  className="block dark:text-gray-800 font-semibold mb-2"
                  htmlFor="comments"
                >
                  Comments
                </label>
                <p className="font-light text-gray-400">
                  Anything else you would like us to know?
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
            {emailError && (
              <p className="font-light text-red-600 text-sm">
                Error requesting advisor. Sorry! My DMs are open on{" "}
                <a href="https://twitter.com/RMcElearney" className="underline">
                  Twitter
                </a>
              </p>
            )}
            {emailSuccess && (
              <p className="font-light text-gray-600 text-sm">
                ✅ Check your inbox, you should have a confirmation email.
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
