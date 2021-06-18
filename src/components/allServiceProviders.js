import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user1Context";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./allServiceProviders.css";
import SingleServiceComponent from "./subComponents/singleServiceComponent";
import firebase from "../firebase";


function AllServiceProviders() {
  const { user, userLoading, results, setresults } = useContext(UserContext);

  useEffect(() => {
    if (results.length < 1) {
      searchClick()
    } else {
      console.log("not loaded");
    }
  }, []);

  const [isLoading, setisLoading] = useState(false);
  const [isLoadingMore, setisLoadingMore] = useState(false);

  const [skipNumber, setskipNumber] = useState(false)
  const [noResults, setnoResults] = useState(false)

  function searchClick() {
    setisLoading(true);
    setnoResults(false)

    axios
      .get(
        // `https://bownapp.com/api/service-providers/search-by-service-id/${serviceid}/${subtypeid}`,
        `https://bownapp.com/api/service-providers/limit-skip/10`,
      )
      .then(res => {
        console.log('received');
        console.log(res.data.serviceProviders);
        if(res.data.serviceProviders.length < 10) {
          setskipNumber(false)
        } else {
          setskipNumber(10)
        }
        if(res.data.serviceProviders.length === 0) {
          setnoResults(true)
        }
        setresults(res.data.serviceProviders);
        setisLoading(false);
      })
      .catch(err => {
        console.log('not received');
        if(err && err.response && err.response.status === 404) {
          console.log(err.response.status)
          // alert(err.response.data.message)
          alert('Unable to find a result for your query')
        } else {
          alert('ERROR getting results')
        }
        
        setisLoading(false);
      });
  }

  function loadMore() {
      if(!isLoadingMore) {
        setisLoadingMore(true);
    axios
      .get(
        // `https://bownapp.com/api/service-providers/search-by-service-id/${serviceid}/${subtypeid}`,
        `https://bownapp.com/api/service-providers/limit-skip/10/${skipNumber}`,
      )
      .then(res => {
        console.log('received');
        console.log(res.data.serviceProviders);
        setresults(prev => [...prev, ...res.data.serviceProviders]);
        setisLoadingMore(false);
        if(res.data.serviceProviders.length < 10) {
          setskipNumber(false)
        } else {
          setskipNumber(num => num+10)
        }
        console.log(skipNumber)
      })
      .catch(err => {
        console.log('not received');
        alert(err.response.data.message);
        setisLoadingMore(false);
      });
      }
      else {
        window.alert('Loading...')
      }
  }

  if (user && !user.loggedIn) return <Redirect to="/" />;

  if (true) {
    return (
      <div className="body">
        <div className='logoutContainer'>
          <div>Welcome, {user.name}</div>
          <div onClick={() => firebase.auth().signOut()} className='logoutButton wahniColor flexCenter'>
            LOGOUT
          </div>
        </div>
        <div className="container2">
          {results.map((obj, idx) => {
            return (
              <SingleServiceComponent singleServiceObject={obj} />
            );
          })}
          {
        (skipNumber !== false) ? 
        <div 
        onClick={() => loadMore()}
        className='buttonTwo flexCenter wahniColor'>
          {
            isLoadingMore ? 'Loading...' : 'Load More'
          }
        </div>
        
        : 
        null
      }
        </div>
      </div>
    );
  }
}

export default AllServiceProviders;
