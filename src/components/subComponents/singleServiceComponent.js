import axios from "axios";
import React, {useEffect, useState} from "react";
// import "./loader.css";
import firebase from '../../firebase'
import Loader from '../global/loader'
function SingleServiceComponent(props) {
  const {singleServiceObject} = props;

  const [imageUrl, setimageUrl] = useState('https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png')
const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
      if((singleServiceObject.photoUrl) && (singleServiceObject.photoUrl !== '')) {
          firebase.storage().ref().child(singleServiceObject.photoUrl).getDownloadURL()
          .then(res => {
            console.log(res)
            setimageUrl(res)
          })
          .catch(err => console.log(err))
          console.log('loading')
      }
      console.log('loading')
  }, [])

  const [deleteIsLoading, setdeleteIsLoading] = useState(false)
  function deleteService(serviceProviderId) {
      if(!deleteIsLoading) {
        setdeleteIsLoading(true)
        axios
        .delete(`http://bownapps.com/api/service-providers/${serviceProviderId}`)
        .then(res => {
            alert('Successfully Deleted')
            setdeleteIsLoading(false)
            window.location.reload()
        })
        .catch(err => {
            alert(err)
            setdeleteIsLoading(false)
            window.location.reload()
        })
      }
  }

  return (
    <div className="allServiceProvidersCard">
      <div className="profilePicContainer">
      <img style={{height: 50, width: 50}} src={imageUrl}/>

      </div>
      <div className="basicDetailsOuter">
        <div className="basicDetailsInner">
          <p>Name: </p>
          <p>{singleServiceObject.name}</p>
        </div>
        <div className="basicDetailsInner">
          <p>Address: </p>
          <p>{singleServiceObject.address}</p>
        </div>
        <div className="basicDetailsInner">
          <p>Number: </p>
          <p>{singleServiceObject.phoneNumber}</p>
        </div>
      </div>
      <div className="servicesDetailsOuter">
        ServicesDetails
        {singleServiceObject.servicesDetails.map((singleServiceObject1, idx1) => {
          return <p>{singleServiceObject1.serviceName}</p>;
        })}
      </div>
      {singleServiceObject.isDummy ? (
        <div
          onClick={() => {
            if (window.confirm("Delete this service?")) {
              deleteService(singleServiceObject.id);
            } else {
              console.log("cancelled");
            }
          }}
          className="buttonOne"
          style={{ marginTop: 20 }}
        >
          {
              deleteIsLoading ? 
              <Loader width={10} borderWidth={2} />
              :
              <div>Delete</div>
          }
          
        </div>
      ) : null}
    </div>
  );
}

export default SingleServiceComponent;
