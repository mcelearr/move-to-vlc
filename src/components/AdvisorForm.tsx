import React from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { supabase } from "@/utils/supabaseClient";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const AdvisorForm = () => {
  return (
    <div className="bg-white border border-gray-200 px-5 py-5 rounded-md w-full">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        onSubmit={async (
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          try {
            const { error } = await supabase
              .from("entries")
              .insert([{ ...values }])
              .single();

            if (error) {
              throw error;
            }
          } catch (error) {
            console.error(error.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form>
          <div className="-mx-3 flex flex-wrap mb-6">
            <div className="mb-6 px-4 w-full md:mb-0 md:w-1/2">
              <label className="block font-semibold mb-2" htmlFor="firstName">
                First Name
              </label>
              <p className="font-light text-gray-400">
                First name as it appears on your passport
              </p>
              <Field
                className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                id="firstName"
                name="firstName"
              />
            </div>
            <div className="px-4 w-full md:w-1/2">
              <label className="block font-semibold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <p className="font-light text-gray-400">
                Last name as it appears on your passport
              </p>
              <Field
                className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                id="lastName"
                name="lastName"
              />
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap mb-6">
            <div className="px-4 w-full">
              <label className="block font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <p className="font-light text-gray-400">
                This for the advisor to contact you. This is NOT a mailing list.
                We won't send you emails.
              </p>
              <Field
                className="border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 leading-tight px-4 py-3 rounded-md w-full"
                id="email"
                name="email"
                type="email"
              />
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap mb-6">
            <div className="px-4 w-full">
              <label className="block font-semibold mb-2" htmlFor="phone">
                Phone
              </label>
              <p className="font-light text-gray-400">
                International format e.g. +34612033295
              </p>
              <Field
                className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                id="phone"
                name="phone"
                type="phone"
              />
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap mb-6">
            <div className="px-4 w-full">
              <label className="block font-semibold mb-2" htmlFor="advisorType">
                Advisor Type
              </label>
              <p className="font-light text-gray-400">
                This is the cost of a 1hr onboarding call. This is
                non-refundable. This is only for the onboarding call. To
                actually apply for a visa or set up a bank account will cost
                more. All the advisors we work with have either personally
                helped me or been personally recommended to me.
              </p>
              <Field
                as="select"
                className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                id="advisorType"
                name="advisorType"
              >
                <option value="immigration">
                  €150 Immigration & Tax Advisor
                </option>
                <option value="admin">
                  €50 Admin (NIE, Bank Account etc.)
                </option>
              </Field>
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap mb-6">
            <div className="mb-6 px-4 w-full md:mb-0 md:w-1/2">
              <label className="block font-semibold mb-2" htmlFor="dob">
                Date of birth
              </label>
              <p className="font-light text-gray-400">
                YYYY-MM-DD format (year-month-day)
              </p>
              <Field
                className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                id="dob"
                name="dob"
              />
            </div>
            <div className="px-4 w-full md:w-1/2">
              <label className="block font-semibold mb-2" htmlFor="gender">
                Gender
              </label>
              <p className="font-light text-gray-400">
                Legal gender as it appears on your passport
              </p>
              <Field
                className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                id="gender"
                name="gender"
              />
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap mb-6">
            <div className="mb-6 px-4 w-full md:mb-0 md:w-1/2">
              <label className="block font-semibold mb-2" htmlFor="nationality">
                Nationality
              </label>
              <p className="font-light text-gray-400">
                If you have multiple, use the primary
              </p>
              <Field
                className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                id="nationality"
                name="nationality"
              />
            </div>
            <div className="px-4 w-full md:w-1/2">
              <label className="block font-semibold mb-2" htmlFor="location">
                Location
              </label>
              <p className="font-light text-gray-400">
                In which country are you staying now?
              </p>
              <Field
                className="border border-gray-200 leading-tight px-4 py-3 rounded-md w-full"
                id="location"
                name="location"
              />
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap mb-6">
            <div className="px-4 w-full">
              <label className="block font-semibold mb-2" htmlFor="residence">
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
              />
            </div>
          </div>
          <p className="font-light">
            After clicking the button below, you will be redirected to complete
            payment for your first onboarding call. This is non-refundable. This
            is only for the onboarding call. By submitting information on this
            website, you agree that this information will be shared with
            third-parties for the purpose of providing you with the product
            and/or service you requested.
          </p>
          <button
            className="bg-gray-800 focus:outline-none focus:ring-2 font-semibold mt-4 px-6 py-3 rounded-md text-lg text-white w-full"
            type="submit"
          >
            Speak to an advisor
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AdvisorForm;
