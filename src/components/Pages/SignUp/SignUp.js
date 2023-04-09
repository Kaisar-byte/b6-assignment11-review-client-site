import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthProvider";

const SignUp = () => {
  const { SignUp, updateUserProfile, user } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value || user?.displayName;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value || user?.photoURL;

    const handleUpdateUserProfile = () => {
      const profile = {
        name,
        photoURL,
      };
      updateUserProfile(profile)
        .then(() => { })
        .catch((error) => {
          console.error(error);
        });
    };

    SignUp(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user)
        handleUpdateUserProfile();
        if (user.accessToken) {
          Swal.fire("User Created Successfully")
          navigate("/");
          form.reset();
        }
      })
      .catch((err) => {
        console.error(err);
        setSignUpError(err)
      });
  };

  return (
    <section className="w-96 m-4 rounded-md mx-auto ">
      <Helmet>
        <title>Dentist Jishan-Create a new user</title>
        <meta name="description" content="This sign up Page" />
        <meta name="keywords" content="Dental, Service, Doctor, Teeth" />
      </Helmet>

      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-300 text-gray-800">
        <div className="mb-6 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-600">Create an account</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Your Full Name
                </label>
              </div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Full Name"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-left text-sm">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="user@email.com"
                required
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Your Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                required
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Photo URL
                </label>
              </div>
              <input
                type="text"
                name="photoURL"
                id="photoURL"
                required
                placeholder="Your Photo URL"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
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
        {signUpError && <p className="text-red-500">{signUpError.message}</p>}
      </div>
    </section>
  );
};

export default SignUp;
