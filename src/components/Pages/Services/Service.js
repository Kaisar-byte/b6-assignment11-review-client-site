import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import Loading from "../../Loading/Loading";
const Service = ({ serviceCard }) => {
  const { loading } = useContext(AuthContext)
  const { _id, serviceName, serviceImage, serviceDescription, servicePrice } =
    serviceCard;
  if (loading) {
    return <Loading></Loading>
  }
  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <figure><PhotoProvider>
        <PhotoView src={serviceImage}>
          <img
            src={serviceImage}
            alt=""
            className="rounded-tl-xl rounded-tr-xl"
          />
        </PhotoView>
      </PhotoProvider></figure>
      <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 rounded-bl-xl rounded-br-xl max-h-50">
        <h2 className="text-center text-xl font-bold bg-orange-400 shadow-md shadow-white">
          {serviceName}
        </h2>
        <p className="pt-6 text-justify px-4">{serviceDescription.split("", 180)}</p>
        <div className="pt-4">
          <Link className="" to={`/servicedetails/${_id}`}>
            <button className="btn btn-sm mt-0 my-4">Show Details</button>
          </Link>
        </div>
      </div>
    </div>

  );
};

export default Service;
