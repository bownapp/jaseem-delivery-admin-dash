import React, { useState, useContext, useEffect } from "react";
// import Profile from "../Profile/profile";
import firebase from "../../firebase";
import { UserContext } from "./context/user1Context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from './global/loader'

import "./myAccount.css";

function Login() {

  const [isloading1, setIsLoading1] = useState(false)
  const [isloading2, setIsLoading2] = useState(false)
  // on Component load fetch the country code based on the ip address and set input field
  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        const countryCode = data.country_calling_code.substring(1);
        setInputNumber(`${countryCode}`);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  // confirm if user is available
  // user details and scores
  const userContextObject = useContext(UserContext);
  const user = userContextObject.user;
  const userLoading = userContextObject.userLoading;
  //  input for mobile number
  const [inputNumber, setInputNumber] = useState("");
  const [otpInput, setOtpInput] = useState('')
  const [verificationId1, setVerificationId1] = useState('');
  // show itp has been sent warning
  const [otpHasBeenSent, setotpHasBeenSent] = useState(false)
  // useHistory hook to redirect to '/Quiz' on login if registration is complete
  const history = useHistory();

  //Registration, Verifying Captcha and OTP validation START
  const setUpRecaptcha = () => {

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "small",
        callback: function (response) {

          // reCAPTCHA solved, allow signInWithPhoneNumber.
          setIsLoading1(false)
          onSignInSubmit();
        },
      }
    );
       
  };

  const onSignInSubmit = (number, name) => {
    
    setIsLoading1(true)
    setUpRecaptcha();
    alert('Please fill captcha below to get OTP')
    // var phoneNumber = getPhoneNumberFromUserInput();
    var phoneNumber = "+" + number;
    var appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // console.log("get OTP initiated");

        // afterGETotp(confirmationResult)

        // run OTP confirmation

        // window.confirmationResult = confirmationResult;

        // step4
        setVerificationId1(confirmationResult.verificationId)
        // console.log('verificationId set')
        // alert('OTP has been sent to your number')
        setotpHasBeenSent(true)
      })
      .catch(function (error) {
        // Error; SMS not sent
        alert(error);
        window.location.reload();
      });
  };
  //Registration, Verifying Captcha and OTP validation END

  function otpConfirmation() {
    if(verificationId1 !== '' && otpInput !== '') {
      setIsLoading2(true)
    var credential = firebase.auth.PhoneAuthProvider.credential(verificationId1, otpInput);
        firebase.auth().signInWithCredential(credential).then((res) => {
          // console.log('signedIn')
              var user1 = firebase.auth().currentUser;
            if (user1.displayName !== null || user1.displayName === "") {
              history.push("/Quiz");
            } else {
              window.location.reload();
            }
            setIsLoading2(false)

  }).catch(err => {
    alert('Error Verifying OTP')
    window.location.reload();
    setIsLoading2(false)
  })
    } else if(otpInput === '' && verificationId1 !== '') {
      alert('Solve reCaptcha to initialize verification')
    } else {
      alert('Get OTP to initialize verification')
    }
}


  function CompleteProfile(nameInput) {
      //on submitting FORM in complete registration form in <Profile />
    firebase
      .auth()
      .currentUser.updateProfile({ displayName: nameInput })
      .then(function () {
        history.push("/Quiz");
        window.location.reload();
      });
  }

  function logout() {
  //on log out click inside <Profile />
    firebase.auth().signOut();
  }

  // if user is logged in we show PROFILE else we show LOGIN

  if (user && user.loggedIn) {
    return (
      // <Profile completeProfile={CompleteProfile} user={user} logout={logout} />
      <h1>Hello</h1>
    );
  }
  else if (userLoading) {
    return (
      <div className='body flexCenter'>
        <Loader width='50px' borderWidth='5px' />
      </div>
    )
  }
  else {
    
    return (
      <div className="body">
       

        <div className="cardOne flexCenter cardOneAdd fontMontserrat">
          <div className='blank100'></div>
          <div className='loginSection'>
          <p className="headerLogin fontMontserrat">L O G I N</p>
            <div className="numberInputContainer">
              <p>enter <b>mobile number</b></p>
              <div className='numberInputSubContainer'>
              <input
                className="numberInput fontMontserrat"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                type="number"
                placeholder='e.g. 919564458759'
                name="mobile"
                required={true}
              />
              {!isloading1 ? 
              <div
              className="getOTPbutton wahniBgColor flexCenter"
              type="button"
              onClick={() => onSignInSubmit(inputNumber)}
            >
              Get OTP
            </div>
            : 
            <div
              className="getOTPbutton wahniBgColor flexCenter"
              type="button"
              onClick={() => {
                if(verificationId1 === '') {
                  if (window.confirm('Solve reCaptcha to receive OTP. Verification in progress. Click OK to abort the process.')) window.location.reload();
                } else {
                  if (window.confirm('Verification in progress. Click OK to abort the process.')) window.location.reload();
                }
              }
            }
              >
              <Loader width='15px' borderWidth='3px' />
            </div>
            }

              </div>
              
            </div>

            <div className="numberInputContainer">
              <p>enter <b>OTP</b></p>
              <div className='numberInputSubContainer'>
              <input
                className="numberInput fontMontserrat"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                type="number"
                placeholder='Enter your OTP'
                name="mobile"
                required={true}
              />

              </div>
              
            </div>


            {!isloading2 ? 
              <div
              className="signInButton wahniBgColor flexCenter"
              type="button"
              onClick={() => otpConfirmation()}
            >
              SIGN IN
            </div>
            : 
            <div
              className="signInButton wahniBgColor flexCenter"
              type="button"
              onClick={() => { if (window.confirm('Verification in progress. Click OK to abort the process.')) window.location.reload();} }
              >
              <Loader width='15px' borderWidth='3px' />
            </div>
            }
            

          </div>
          <div className='flexCenter' id="recaptcha-container"></div>
          {
            otpHasBeenSent ? 
            <p className='otpHasBeenSent'>OTP has been sent to your number</p>
            :
            null
          }

  
            

        </div>
      </div>
    );
  }
}

export default Login;
