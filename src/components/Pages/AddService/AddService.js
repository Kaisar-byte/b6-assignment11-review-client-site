import React from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import Swal from "sweetalert2";


const AddService = () => {
  const handleAddServiceBtn = (e) => {
    e.preventDefault();

    const form = e.target;
    const serviceName = form.serviceName.value;
    const servicePrice = form.servicePrice.value;
    const serviceDescription = form.serviceDescription.value;
    const serviceImage = form.serviceImage.value;
    const addService = {
      serviceName,
      servicePrice,
      serviceDescription,
      serviceImage,
    };
    fetch(`https://dentist-jishan-server.vercel.app/addservice`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(addService),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        console.log(data.acknowledged);
        if (data.insertedId) {
          Swal.fire("Added successfully")
        }
      });


  };
  return (
    <HelmetProvider>
      <div className="w-full h-auto overflow-scroll block h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4 flex items-center justify-center">
        <Helmet>
          <title>Dentist Jishan-FAQ page</title>
          <meta name="description" content="This FAQ Page" />
          <meta name="keywords" content="Dental, Service, Doctor, Teeth" />
        </Helmet>
        <div className="bg-white py-6 px-10 sm:max-w-md w-full rounded-lg">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl bg-orange-400 rounded-md mt-10 py-2">
                Please add a service
              </h2>
            </div>
            <form onSubmit={handleAddServiceBtn}>
              <div className="flex flex-col space-y-6">
                <input
                  type="text"
                  name="serviceName"
                  className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
                  placeholder="Enter Name of service provider "
                />
                <input
                  type="text"
                  name="serviceImage"
                  className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
                  placeholder="Enter service Image URL"
                />
                <input
                  type="number"
                  name="servicePrice"
                  className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
                  placeholder="Price of Your Service"
                />
                <textarea
                  rows={3}
                  cols={10}
                  type="text"
                  name="serviceDescription"
                  className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
                  placeholder="Write description of your service"
                />
              </div>
              <div className="flex justify-center my-6">
                <button
                  type="submit"
                  className=" rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold "
                >
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default AddService;
