import axios from "axios";
import React, {useEffect, useState} from "react";
// import "./loader.css";
import firebase from '../../firebase'
import Loader from '../global/loader'
import EditSingleServiceComponent from "./editSingleServiceComponent";
import AddNewService from "./addNewService";
function SingleServiceComponent(props) {
  const {singleServiceObject} = props;

  const [imageUrl, setimageUrl] = useState('https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png')
const [isLoading, setisLoading] = useState(false)
const [editClicked, seteditClicked] = useState(false)
const [addClicked, setaddClicked] = useState(false)

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
        .delete(`https://bownapp.com/api/service-providers/${serviceProviderId}`)
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
      
      {
        editClicked ?
        
                  <EditSingleServiceComponent singleServiceObject={singleServiceObject} />

        :
        <>
        <div className="profilePicContainer">
      <img style={{height: '100%', width: '100%'}} src={imageUrl}/>

      </div>
      <div className="basicDetailsOuter">
        <div className="basicDetailsInner">
          <div className='detailHeader'>Name</div>
          <div className='detailText'>{singleServiceObject.name}</div>
        </div>
        
        <div className="basicDetailsInner">
          <div className='detailHeader'>Phone Number</div>
          <div className='detailText'>{singleServiceObject.phoneNumber}</div>
        </div>
        <div className="basicDetailsInner">
          <div className='detailHeader'>Address</div>
          <div className='detailText'>{singleServiceObject.address}</div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}><div style={{fontSize: 12, fontWeight: 'bold', marginRight: 5}} className='wahniColor'>LONGITUDE:</div> {singleServiceObject.loc.coordinates[1]}</div>
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}><div style={{fontSize: 12, fontWeight: 'bold', marginRight: 5}} className='wahniColor'>LATITUDE:</div> {singleServiceObject.loc.coordinates[0]}</div>
          
        </div>
      </div>
      <div className="servicesDetailsOuter">
        ServicesDetails
        {singleServiceObject.servicesDetails.map((singleServiceObject1, idx1) => {
          return <div className='singleServiceDetailsMainDiv'>
            <div className='singleServiceDetailsServiceText'>{singleServiceObject1.serviceName}</div>
            <div className='singleServiceDetailsSubTypeText'>{singleServiceObject1.subTypeName}</div>
          </div>;
        })}

          {
            singleServiceObject.isDummy ?
            <>
            {
            addClicked ?
            <AddNewService singleServiceObject={singleServiceObject} />
            :
            null
          }
          <div
          onClick={() => {
            setaddClicked(prev=> !prev)
            seteditClicked(false)
          }}
          className="buttonOne"
          style={{ marginTop: 20, backgroundColor: '#28798a' }}
        >
          {
              deleteIsLoading ? 
              <Loader width={10} borderWidth={2} />
              :
              <div>{
                addClicked ? 'Cancel' : 'Add'
                }</div>
          }
          
        </div>
            </>
            :
            null
          }

        
      </div>
      

        </>
      }
      
      {singleServiceObject.isDummy ? (
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%'
        }}>
        <div
          onClick={() => {
            seteditClicked(prev=> !prev)

          }}
          className="buttonOne"
          style={{ marginTop: 20, backgroundColor: '#28798a' }}
        >
          {
              deleteIsLoading ? 
              <Loader width={10} borderWidth={2} />
              :
              <div>{
                editClicked ? 'Back' : 'Edit'
                }</div>
          }
          
        </div>
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
        </div>
      ) : null}

    </div>
  );
}

export default SingleServiceComponent;
