import axios from "axios";
import React, {  useEffect, useState } from "react";
import firebase from "../../firebase";

// const defaultUser = { loggedIn: false, email: "" };
export const UserContext = React.createContext({});

const UserProvider = UserContext.Provider;

// const UserConsumer = UserContext.Consumer;

// function onAuthStateChange(callback) {
// make sure user register or login
// }

// user is added or logged in and sent to all the components of this site through this context



export function UserContextProvider(props) {
  const [user, setUser] = useState({ loggedIn: false });
  const [userScores, setUserScores] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  // loading
  const [userLoading, setuserLoading] = useState(true);
  const [userScoresLoading, setuserScoresLoading] = useState(false);
  const [userDetailsLoading, setuserDetailsLoading] = useState(false);
  /// results
  const [results, setresults] = useState([])
  const [token, settoken] = useState('123')
  const [expiryDate, setexpiryDate] = useState(new Date())

  async function onAuthStateChange() {
    

    setuserLoading(true);
    setuserDetailsLoading(true);
    setuserScoresLoading(true);

    return firebase.auth().onAuthStateChanged((user1) => {
      if (user1) {
        console.log('yes')
        setUser({
          loggedIn: true,
          email: user1.email,
          name: user1.displayName,
          id: user1.uid,
          number: user1.phoneNumber,
          photoURL: user1.photoURL,
        });

        setuserLoading(false);
        // getToken()

        
      } else {
        console.log('yes')

        setUser({ loggedIn: false });
        setUserScores(null);
        setUserDetails(null);
        setuserLoading(false);
        setuserDetailsLoading(false);
        setuserScoresLoading(false);
      }
    });
  }

  
  // on useEffect user is authorized and user details are set and sent via context API to all components

  useEffect(() => {
    const unsubscribe = onAuthStateChange();

    
    return () => {
      unsubscribe();
    };
  }, []);

  async function getToken(func) {
   
      const user4token = firebase.auth().currentUser;
        user4token && (user4token.getIdToken(true).then((res) => {
          console.log(new Date(new Date().setHours(new Date().getHours() + 1)))
          console.log(res)
          setexpiryDate(new Date(new Date().setHours(new Date().getHours() + 1)))
                  settoken(res)
                  if(func) {
                    func()
                  }
        }).catch(e => {
          alert('Sorry! Could not authenticate with the server');
        }));

    clearTimeout(refreshTokenExpired);
    var refreshTokenExpired = setTimeout(() => {
      getToken()
    }, 3300000);
  }

  async function getTokenAndRunFunc(func) {
    if((new Date() < expiryDate)) {
      func()
    } else {
      const user4token = firebase.auth().currentUser;
        user4token && (user4token.getIdToken(true).then((res) => {
          console.log(new Date(new Date().setHours(new Date().getHours() + 1)))
          console.log(res)
          setexpiryDate(new Date(new Date().setHours(new Date().getHours() + 1)))
                  settoken(res)
                  func()
        }));
    }
        // console.log(token1)
  }
  // useEffect(() => {
  //   getToken()
    
  // }, [])

  
  

  

  return (
    <UserProvider
      value={{
        user: user,
        userScores: userScores,
        userDetails: userDetails,
        userLoading: userLoading,
        userScoresLoading: userScoresLoading,
        userDetailsLoading: userDetailsLoading,
        results,
        setresults,
        getTokenAndRunFunc,
        token,
        settoken,
        expiryDate,
        setexpiryDate,
        getToken
      }}
    >
      {props.children}
    </UserProvider>
  );
}
