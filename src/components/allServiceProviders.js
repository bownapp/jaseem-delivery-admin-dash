import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/user1Context";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./allServiceProviders.css";
import SingleServiceComponent from "./subComponents/singleServiceComponent";

function AllServiceProviders() {
  const { user, userLoading, results, setresults } = useContext(UserContext);

  useEffect(() => {
    if (results.length < 1) {
      axios
        .get(`http://localhost:5000/api/service-providers/`)
        .then((res) => {
          setresults(res.data.serviceProviders);
          console.log(res.data.serviceProviders);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("not loaded");
    }
  }, []);

  function deleteService(serviceProviderId) {
    axios
    .delete(`http://localhost:5000/api/service-providers/${serviceProviderId}`)

  }

  if (user && !user.loggedIn) return <Redirect to="/" />;

  if (true) {
    return (
      <div className="container">
        <div className="container2">
          {results.map((obj, idx) => {
            return (
              <SingleServiceComponent singleServiceObject={obj} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default AllServiceProviders;
