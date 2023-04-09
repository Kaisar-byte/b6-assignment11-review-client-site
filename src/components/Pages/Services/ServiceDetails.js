import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import AllReview from "../Review/AllReview";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ServiceDetails = () => {
  const { user } = useContext(AuthContext);
  const services = useLoaderData();
  const { serviceName, serviceImage, serviceDescription, servicePrice } =
    services;

  const [reviewitems, setReviewitems] = useState([]);
  const handleAddReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = user?.displayName || "unregistered";
    const email = user?.email;
    const photoURL = user?.photoURL;
    const comment = form.comment.value;
    const commentDate = user?.metadata?.creationTime;
    const reviewBox = {
      name,
      email,
      photoURL,
      comment,
      commentDate,
    };

    console.log(reviewBox);
    fetch(`https://dentist-jishan-server.vercel.app/reviews`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reviewBox),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire("You commented for this service", "", "success");
          form.reset();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`https://dentist-jishan-server.vercel.app/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviewitems(data);
      });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Dentist Jishan-Particular Service page</title>
        <meta name="description" content="This Home Page" />
        <meta name="keywords" content="Dental, Service, Doctor, Teeth" />
      </Helmet>

      <div className="flex sm: flex-col py-16 lg:py-0 lg:flex-col">
        <img
          className="sm:w-full sm:h-40 sm:mb-4 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 "
          src={serviceImage}
          alt=""
        />
        <div className="w-full max-w-2xl px-4 mx-auto md:px-0 lg:px-4 lg:py-20 lg:max-w-screen-2xl">
          <div>
            <h2 className="mb-5 text-center rounded-lg bg-blue-200 border-2 border-gray-400 py-4 text-blue-500 font-sans text-md font-bold tracking-tight  sm:text-4xl sm:leading-none ">
              {serviceName}
            </h2>
            <h2 className="mb-5 pl-2 font-sans text-md text-orange-400 tracking-tight sm:text-2xl  md:text-left">
              Consultation Fee: BDT {servicePrice}
            </h2>
            <p className=" text-base text-gray-700 md:text-lg md:text-justify">
              {serviceDescription}
            </p>
          </div>
        </div>
        <div className="flex mx-6 justify-center w-full items-center">
          <div className="mb-12 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
            <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 dark:bg-gray-900 dark:text-gray-100">
              <div className="flex flex-col items-center w-full">
                <h2 className="text-3xl font-semibold text-center">
                  Write about my provided services
                </h2>
                <div className="flex flex-col items-center py-6 space-y-3">
                  <span className="text-center">How was your experience?</span>
                </div>
                <form
                  onSubmit={handleAddReview}
                  className="flex flex-col w-full"
                >
                  <textarea
                    name="comment"
                    rows="3"
                    placeholder="Add review message..."
                    className="p-4 border-2 border-yellow-400 rounded-md resize-none dark:text-gray-100 dark:bg-gray-900"
                  ></textarea>
                  <div className="mt-6">
                    {user?.uid ? (
                      <>
                        {" "}
                        <button
                          type="submit"
                          className="py-4 btn btn-warning my-8 font-semibold rounded-md dark:text-gray-900 dark:bg-violet-400"
                        >
                          Add Comment
                        </button>
                      </>
                    ) : (
                      <>
                        <p>
                          Please login to add a review ....{" "}
                          <Link
                            to="/login"
                            className="btn btn-success hover:bg-orange-400 hover:text-white"
                          >
                            Log in
                          </Link>
                        </p>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4 mx-4 justify-center items-center">
          {reviewitems.length && reviewitems?.map((review) => (
            <AllReview key={review._id} review={review}></AllReview>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
