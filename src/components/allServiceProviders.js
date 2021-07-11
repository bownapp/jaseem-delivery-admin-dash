import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user1Context";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./allServiceProviders.css";
import SingleServiceComponent from "./subComponents/singleServiceComponent";
import firebase from "../firebase";
import Loader from "./global/loader";


function AllServiceProviders() {
  const { user, userLoading, results, setresults, getTokenAndRunFunc, getToken } = useContext(UserContext);

  useEffect(() => {
    if (results.length < 1) {
      setisLoading(true)
      getToken(searchClick)
      console.log('getting')
    } else {
      console.log("not loaded");
    }

  }, []);

  const [isLoading, setisLoading] = useState(false);
  const [isLoadingMore, setisLoadingMore] = useState(false);

  const [skipNumber, setskipNumber] = useState(10)
  const [noResults, setnoResults] = useState(false)
  const [message, setmessage] = useState('')

  function searchClick() {
    setisLoading(true);
    setnoResults(false)
    axios
      .get(
        // `https://bownapp.com/api/service-providers/search-by-service-id/${serviceid}/${subtypeid}`,
        `https://bownapp.com/api/service-providers/limit-skip-dummy/${user.id}/10`,
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
          setmessage('Sorry! There are no entries yet.')
        }
        setresults(res.data.serviceProviders);
        setisLoading(false);
      })
      .catch(err => {
        console.log('not received');
        if(err && err.response && err.response.status === 404) {
          console.log(err.response?.status)
          // alert(err.response.data.message)
          alert('Unable to find a result for your query')
        } else {
          alert('ERROR getting results')
        }
        setmessage('Sorry! Unable to get your entries.')

        setisLoading(false);
      });
  }

  function loadMore() {
      if(!isLoadingMore) {
        setisLoadingMore(true);
    axios
      .get(
        // `https://bownapp.com/api/service-providers/search-by-service-id/${serviceid}/${subtypeid}`,
        `https://bownapp.com/api/service-providers/limit-skip-dummy/${user.id}/10/${skipNumber}`,
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

  async function fetchFromAPI() {

    // const user = firebase.auth().currentUser;
    // const token = user && (await user.getIdToken());
  
    await axios.get(`https://bownapp.com/api/service-providers/`
    // , 
    // {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
    )
    .then(res => {
      console.log(res.data)
    });

    // return res.data
  }

  if (user && !user.loggedIn) return <Redirect to="/admin" />;
  if (isLoading) return <div className='flexContainFull flexCenter body'>
    <Loader width='50px' borderWidth='5px'/>
  </div>;

    return (
      <div className="body">
        
        {/* <button onClick={() => getTokenAndRunFunc(fetchFromAPI)}>fetch</button> */}
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
      {
        results.length<1 ? 
        <div>{message}</div>
        :
        null
      }
        </div>
      </div>
    );
}

export default AllServiceProviders;
