import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthProvider";

import ReviewRow from "./ReviewRow";

const Review = () => {
  const { user, signOut } = useContext(AuthContext);
  const [myreviews, setMyreviews] = useState([]);

  useEffect(() => {
    fetch(
      `https://dentist-jishan-server.vercel.app/reviews?email=${user?.email}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("dentist-jishan")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut();
        }
        return res.json();
      })
      .then((data) => {
        setMyreviews(data);
      });
  }, [user?.email]);

  const handleDelete = (id) => {
    const proceed = Swal.fire({
      title: "Do you want to delete this review ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("You have successfully deleted this review", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

    if (proceed) {
      fetch(`https://dentist-jishan-server.vercel.app/reviews/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            const remaining = myreviews.filter(
              (indlReview) => indlReview._id !== id
            );
            setMyreviews(remaining);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleUpdateStatus = (id) => {
    fetch(`https://dentist-jishan-server.vercel.app/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const remaining = myreviews.filter((myrvw) => myrvw._id !== id);
          const approved = myreviews.find((myrvw) => myrvw._id === id);
          const totalReviews = [...remaining, approved];
          setMyreviews(totalReviews);
        }
      });
  };
  return (
    <div className="w-full">
      <Helmet>
        <title>Dentist Jishan-Review page</title>
        <meta name="description" content="This Home Page" />
        <meta name="keywords" content="Dental, Service, Doctor, Teeth" />
      </Helmet>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>email</th>
            <th>Commenting time </th>
            <th>Comment </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {myreviews.length === 0 ? (
            <>
              <div className="dark:bg-gray-800 dark:text-gray-100">
                <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold sm:text-4xl text-center">
                      No reviews yet. Please give a review.
                    </h2>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {myreviews.map((eachReview) => (
                <ReviewRow
                  key={eachReview._id}
                  handleDelete={handleDelete}
                  eachReview={eachReview}
                  handleUpdateStatus={handleUpdateStatus}
                ></ReviewRow>
              ))}
            </>
          )}
        </tbody>

        <tfoot></tfoot>
      </table>
    </div>
  );
};
export default Review;
