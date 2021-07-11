import axios from "axios";
import React, {useEffect, useState, useContext} from "react";
// import "./loader.css";
import firebase from '../../firebase'
import Loader from '../global/loader'
import { UserContext } from "../context/user1Context";
import { allServices1 } from "../context/allServices";
import TimePicker from 'react-time-picker';
import '../addServiceProviders.css'

function AddNewService(props) {
  const {singleServiceObject} = props;

  // useEffect(() => {
  //   console.log(singleServiceObject)
  //   if(singleServiceObject) {
      
  //     if(singleServiceObject.servicesDetails[0].daysAvailable) {
  //       singleServiceObject.servicesDetails[0].daysAvailable.map((obj, idx) => {
  //         if(obj === 'sunday') {
  //           daysAvailableArray[0].setvalue(true)
  //           console.log(obj)
  //         }
  //       })
  //     }
  //   }
  // }, [])

  const [isLoading, setisLoading] = useState(false)
  const [message, setmessage] = useState('Loading...')

  const [selectedService, setselectedService] = useState({})
  const [selectedServiceSubTypesArray, setselectedServiceSubTypesArray] = useState([])
  const [selectedSubType, setselectedSubType] = useState({})
  const [selectedSubTypeIndex, setselectedSubTypeIndex] = useState(0)

  ////days
  const [value1, setvalue1] = useState(false);
  const [value2, setvalue2] = useState(false);
  const [value3, setvalue3] = useState(false);
  const [value4, setvalue4] = useState(false);
  const [value5, setvalue5] = useState(false);
  const [value6, setvalue6] = useState(false);
  const [value7, setvalue7] = useState(false);

  const daysAvailableArray = [
    {
      name: 'sunday',
      value: value1,
      setvalue: setvalue1,
    },
    {
      name: 'monday',
      value: value2,
      setvalue: setvalue2,
    },
    {
      name: 'tuesday',
      value: value3,
      setvalue: setvalue3,
    },
    {
      name: 'wednesday',
      value: value4,
      setvalue: setvalue4,
    },
    {
      name: 'thursday',
      value: value5,
      setvalue: setvalue5,
    },
    {
      name: 'friday',
      value: value6,
      setvalue: setvalue6,
    },
    {
      name: 'saturday',
      value: value7,
      setvalue: setvalue7,
    },
  ];

  

   const [selectedTimeFrom, setselectedTimeFrom] = useState('12:00')
   const [selectedTimeTo, setselectedTimeTo] = useState('12:00')
   const [selectedTimeFrom1, setselectedTimeFrom1] = useState(new Date(2021, 6, 13, 24, 0))
   const [selectedTimeTo1, setselectedTimeTo1] = useState(new Date(2021, 6, 13, 24, 0))

   function toTimestamp(val){
    // let time = 1626739201;
    // console.log(time.toUTCString())
    if(val && val!=='' && val !== null) {
      const hourInt = parseInt(val.substr(0,2))
    const minuteInt = parseInt(val.substr(3,5))
    // console.log(hourInt)
    // console.log(minuteInt)
    // console.log(new Date(2021, 6, 13, hourInt, minuteInt))
    var datum = new Date(Date.UTC(2021,6,20,hourInt,minuteInt,1));
    return new Date(2021, 6, 13, hourInt, minuteInt)
    }
   }

   

   function addNew(address1) {
    setisLoading(true)
    setmessage('adding to database')

    var daysAvailable1 = daysAvailableArray.filter(function (el) {
      return el.value === true;
    });
    const daysAvailableNames = () => {
      if(daysAvailable1.length < 1) {
        return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      } else {
        return daysAvailable1.map(val => {
          return val.name;
        })
      }
    }

     let finalObj= {
      serviceName: selectedService.name,
  subTypeName: selectedSubType.name,
  serviceId: selectedService.id,
  subTypeId: selectedSubType.id,
  isActive: true,
  daysAvailable: daysAvailableNames(),
  preferredTime: {
    from : selectedTimeFrom1,
    to: selectedTimeTo1
  }
    }


    
     
     console.log(finalObj)

     axios.patch(`http://localhost:5000/api/service-providers/${singleServiceObject.id}/addService`, {
      newServiceDetails: finalObj
     }).then(res => {
          console.log(res.data)
          alert('Successfully added')
          setisLoading(false)
          resetInputs()
          window.location.reload()
        }).catch(err => {
          alert(err)
          console.log(err)
          setisLoading(false)

        })

   }


   


  function resetInputs() {
    
    setselectedService({})
    setselectedSubType({})
    setselectedSubTypeIndex(-1)
    setvalue1(false)
    setvalue2(false)
    setvalue3(false)
    setvalue4(false)
    setvalue5(false)
    setvalue6(false)
    setvalue6(false)
    setselectedTimeFrom('12:00')
    setselectedTimeTo('12:00')
    setselectedTimeFrom1('12:00')
    setselectedTimeTo1('12:00')
  }

  return (
    <div className="cardOneSmall flexCenter fontMontserrat"
    
    >
       
    {!isLoading ? 
    <>
       
      
      {/* <button onClick={() => uploadToFirebase('1111')}>Upload to Firebase</button> */}
      <div className='singleDataEntry selectCustom'>
        
        <div class="select">
  <select id="standard-select"
            // value={selectedService.name} 
        // defaultValue={5}
        onChange={(e) => {
          if(e.target.value>-1) {
            let selected1 = {
              name: allServices1[e.target.value].name,
              id: allServices1[e.target.value].serviceId,
            }
            setselectedService(selected1)
            setselectedServiceSubTypesArray(allServices1[e.target.value].subTypes)
            console.log(allServices1[e.target.value].subTypes)
            console.log(selected1)
            setselectedSubType({})
            setselectedSubTypeIndex(-1)
          }
        }} 
      >
        <option value={-1}>Select a Service</option>
       {
         allServices1.map((obj, idx) => {
          return <option value={idx}>{obj.name}</option>
         })
       }
      </select>
      </div>
      </div>
      <div className='singleDataEntry selectCustom'>

      <div class="select">
  <select id="standard-select"
        
        value={selectedSubTypeIndex}
        onChange={(e) => {
          if(e.target.value > -1) {
            let selected1 = {
              name: selectedServiceSubTypesArray[e.target.value].name,
              id: selectedServiceSubTypesArray[e.target.value].subTypeId,
            }
            setselectedSubType(selected1)
            setselectedSubTypeIndex(e.target.value)
            // setselectedServiceSubTypesArray(allServices1[e.target.value].subTypes)
            // console.log(allServices1[e.target.value].subTypes)
            console.log(selected1)
          }
        }} 
      >
                <option value={-1}>Select subTypeId</option>
       {
         selectedServiceSubTypesArray.map((obj, idx) => {
          return <option value={idx}>{obj.name}</option>
         })
       }
      </select>
      </div>
      </div>
      
      
      
    <div className='singleDataEntry'>

    <div className="daysDiv">
    
    {
      daysAvailableArray.map((obj, idx) => {
        return  <div style={{marginLeft:5, marginRight: 5, marginTop:5}} className='flexCenter'>
        <input type="checkbox" id="saturday" name={obj.name} checked={obj.value} onChange={(e) => {obj.setvalue(prev => !prev)}}/>{obj.name}
        </div>
      })
    }
</div>
</div>
<div className='singleDataEntry'>
    <div>FROM</div>
<TimePicker
      onChange={(val) => {
        setselectedTimeFrom(val)
        // console.log(val.substr(0,2))
        // console.log(val.substr(3,5))
        setselectedTimeFrom1(toTimestamp(val))
      }}
      value={selectedTimeFrom}
    />
    <div>TO</div>
    <TimePicker
      onChange={(val) => {
        setselectedTimeTo(val)
        // console.log(val.substr(0,2))
        // console.log(val.substr(3,5))
        console.log(selectedTimeTo1)
        setselectedTimeTo1(toTimestamp(val))
      }}
      value={selectedTimeTo}
    />
    </div>
    <div onClick={() => addNew()} className='buttonTwo flexCenter buttonAdd wahniColor'>ADD NEW</div>
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

export default AddNewService;
