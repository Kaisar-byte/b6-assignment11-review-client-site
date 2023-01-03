import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <section className="w-96 m-4 rounded-md mx-auto ">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-300 text-gray-800">
        <div className="mb-6 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-600">Create an account</p>
        </div>
        <form className="space-y-12 ng-untouched ng-pristine ng-valid">
          <div className="space-y-4">
            <div>
              <label for="email" className="block mb-2 text-left text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label for="password" className="text-sm">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label for="password" className="text-sm">
                  Photo URL
                </label>
              </div>
              <input
                type="text"
                name="photourl"
                id="photourl"
                placeholder="Your Photo URL"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="button"
                className="w-full px-8 py-3 font-semibold rounded-md bg-green-600 text-gray-50"
              >
                Sign Up
              </button>
            </div>
            <p className="px-6 text-sm text-center text-gray-600">
              Already an account? Please
              <Link to="/login" className="hover:underline text-green-600 ml-2">
                Sign In
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;