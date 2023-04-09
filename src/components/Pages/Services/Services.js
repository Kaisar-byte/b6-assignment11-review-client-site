import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../Context/AuthProvider";
import Service from "./Service";
import Loading from "../../Loading/Loading";

const Services = () => {
  const [services, setServices] = useState([]);
  const { loading } = useContext(AuthContext)
  useEffect(() => {
    fetch(`https://dentist-jishan-server.vercel.app/services`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const handleLoadMore = () => {
    fetch(`https://dentist-jishan-server.vercel.app/services/seeall`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServices(data);
      });
  };
  if (loading) {
    return <Loading></Loading>
  }
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <Helmet>
        <title>Dentist Jishan-Service page</title>
        <meta name="description" content="This Service Page" />
        <meta name="keywords" content="Dental, Service, Doctor, Teeth" />
      </Helmet>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-4  md:grid-cols-2 sm:grid-cols-1 sm:p-4 sm:w-full px-6 gap-14 my-8 justify-center items-center px-6">
        {services.length && services?.map((serviceCard) => (
          <Service key={serviceCard._id} serviceCard={serviceCard}></Service>
        ))}
      </div>
      <button className="btn btn-success mx-4 mb-10" onClick={handleLoadMore}>
        See All
      </button>
    </div>
  );
};

export default Services;
