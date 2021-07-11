import axios from "axios";
import React, {useEffect, useState, useContext} from "react";
// import "./loader.css";
import firebase from '../../firebase'
import Loader from '../global/loader'
import { UserContext } from "../context/user1Context";
import { allServices1 } from "../context/allServices";
import TimePicker from 'react-time-picker';
import '../addServiceProviders.css'

function EditSingleServiceComponent(props) {
  const {singleServiceObject} = props;

  useEffect(() => {
    console.log(singleServiceObject)
    if(singleServiceObject) {
      setname(singleServiceObject.name)
      setphoneNumber(singleServiceObject.phoneNumber)
      setlatitude(singleServiceObject.loc.coordinates[1])
      setlongitude(singleServiceObject.loc.coordinates[0])
      setAddress(singleServiceObject.address)
      if(singleServiceObject.bio) {
        setbio(singleServiceObject.bio)
      }
     
    }
  }, [])

  const [isLoading, setisLoading] = useState(false)
  const [message, setmessage] = useState('Loading...')


  const [name, setname] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [photoUrl, setphotoUrl] = useState('')
  const [address, setAddress] = useState('')
  const [longitude, setlongitude] = useState('')
  const [latitude, setlatitude] = useState('')
  const [bio, setbio] = useState('')

   const [gettingAddress, setgettingAddress] = useState(false)
   function getAddress(addNew1) {
     
     if(latitude !== singleServiceObject.loc.coordinates[1] || longitude !== singleServiceObject.loc.coordinates[0]) {
      if(addNew1) {
        setisLoading(true)
       }
       setmessage('getting address')
      setgettingAddress(true)
      const lat1 = parseFloat(latitude)
      const long1 = parseFloat(longitude)
     //function to get address using current lat and lng
     fetch(
       `https://nominatim.openstreetmap.org/reverse?lat=${lat1}&lon=${long1}&format=json`,
     )
       .then(response => response.json())
       .then(responseJson => {
         setgettingAddress(false)
 
         console.log(responseJson.display_name);
         setAddress(responseJson.display_name);
         if(addNew1) {
           addNew1(responseJson.display_name)
         }
        
       })
       .catch(err => {
         console.log(err)
         alert(err)
         setgettingAddress(false)
         setisLoading(false)

       });
     } else {
       addNew1(address)
     }
  }

   function addNew(address1) {
    setisLoading(true)
    setmessage('adding to database')


     let updateObj= {
       name,
       phoneNumber,
       bio,
       contactInfo: {
         whatsapp: phoneNumber
       },
       photoUrl,
       address: address1,
      //  isDummy: true,
      //  addedBy: user.id,
       loc: {
         type: "Point",
         coordinates: [longitude, latitude]
       }
     }

    
     
     console.log(updateObj)

     axios.patch(`http://localhost:5000/api/service-providers/${singleServiceObject.id}`, updateObj)
     .then(res => {
      // console.log(res.data.dummyServiceProvider._id)
      if(image) {
        uploadToFirebase(singleServiceObject.id)
      
      } else {
        setisLoading(false)
        alert('Service provider added')
        resetInputs()
      }
      // setresults(prev => [...prev, res.data.dummyServiceProvider])
    })
     .catch(err => {
       alert(err)
       setisLoading(false)
     })
   }

   const [image, setImage] = useState(null);

   const extension = () => {
    if(image.name.includes('.png')) {
      return '.png'
    } else if (image.name.includes('.jpg')) {
      return '.jpg'
    } else if (image.name.includes('.jpeg')) {
      return '.jpg'
    }
  }
   
   const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0]; // get the supplied file
    // if there is a file, set image to that file
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log(file);
          setImage(file);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    // if there is no file, set image back to null
    } else {
      setImage(null);
    }
  };

  const uploadToFirebase = (newId) => {
    //1.
    setmessage('uploading profile image to database...')
    if (image && newId) {
      //2.
      const storageRef = firebase.storage().ref();
      //3.
      const fileRef = `profilePics/${newId}${extension()}`;

      const imageRef = storageRef.child(fileRef);
      //4.
      imageRef.put(image)
     //5.
     .then(() => {
        setmessage('updating database...')
        if(fileRef !== singleServiceObject.photoUrl) {
          axios.patch(`http://localhost:5000/api/service-providers/${newId}`,{photoUrl: `profilePics/${newId}${extension()}`})
      .then(res1 => {
        console.log(res1)
        setisLoading(false)
        alert('New service provider added')
        resetInputs()
      })
      .catch(err1 => {
        setisLoading(false)
        alert(err1)
      })
        } else {
          setisLoading(false)
          alert('Updated without changing photoUrl')
        }
    })
    .catch(err => alert(err))
    } else {
      alert("Please upload an image first.");
    }
  };

  function resetInputs() {
    setImage(null)
    setname('')
    setphotoUrl('')
    setphoneNumber('')
    setAddress('')
    setlongitude('')
    setlatitude('')
    setbio('')
    
  }

  return (
    <div className="cardOne flexCenter cardOneAdd fontMontserrat">
       
    {!isLoading ? 
    <>
        <div className='singleDataEntry'>
      Click Below
    <label class="custom-file-upload wahniColor">
    <input type="file" accept="image/x-png,image/jpeg" onChange={(e) => {onImageChange(e); }}/>
  <i class="fa fa-cloud-upload"></i> 
  {
    image ? image.name : 'Select Image'
  }
</label>
</div>
      
      {/* <button onClick={() => uploadToFirebase('1111')}>Upload to Firebase</button> */}
     
      <div className='singleDataEntry'>
      <p>display name</p>
      <input
        type="text"
        value={name}
        onChange={e => setname(e.target.value)}
        className='fontMontserrat textInputStyleOne'
      />
      </div>
      
      <div className='singleDataEntry'>
      <p>phone number</p>
      <input
        type="text"
        value={phoneNumber}
        onChange={e => setphoneNumber(e.target.value)}
        className='fontMontserrat textInputStyleOne'

      />
      </div>

      <div className='latNlong'>
      <div className='singleDataEntry'>
      <p>latitude</p>
      <input
        type="text"
        value={latitude}
        onChange={e => setlatitude(e.target.value)}
        className='fontMontserrat textInputStyleOne'

      />
      </div>
      <div className='singleDataEntry'>
      <p>longitude</p>
      <input
        type="text"
        value={longitude}
        onChange={e => setlongitude(e.target.value)}
        className='fontMontserrat textInputStyleOne'

      />
      </div>
      </div>
      <div className='singleDataEntry'>
        <p>address</p>
      <div className='addressArea flexCenter'>
      {
        gettingAddress ? 
        <Loader width={30} borderWidth={3} />
        :
        <p>{address}</p>
      }
      </div>
      <button onClick={() => getAddress()}>Get address</button>
      </div>
      <div className='singleDataEntry'>
      <p>Enter bio</p>
      <textarea
        type="text"
        value={bio}
        onChange={e => setbio(e.target.value)}
        className='fontMontserrat textInputStyleOne'
        style={{height: 80, flexWrap: 'wrap'}}
      />
      </div>
      
    <div onClick={() => getAddress(addNew)} className='buttonTwo flexCenter buttonAdd wahniColor'>UPDATE</div>
    </>
      :
      <>
      <Loader width={10} borderWidth={2} />
    <div>{message}</div>
      </>
    }
    
      </div>
  );
}

export default EditSingleServiceComponent;
