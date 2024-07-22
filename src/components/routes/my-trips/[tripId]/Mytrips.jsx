import { Button } from '@/components/ui/button';
import { db } from '@/Service/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import Locationinfo from '../Elements/Locationinfo';
import Hotels from '../Elements/Hotels';
import { LogInContext } from '@/Context/LogInContext/Login';
import Places from '../Elements/Places';

function Mytrips() {
  const { tripId } = useParams();
  const { setTrip} = useContext(LogInContext);
  
  const getTripData = async () => {
    const docRef = doc(db, 'Trips', tripId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      // console.log("Document data:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      toast.error('No Such Trip');
    }
  };

  useEffect(()=>{
    tripId && getTripData();
  }, [tripId]);
  

  return (
    <div className='py-2'>
      <Locationinfo/>
      <Hotels/>
      <Places/>
    </div>
  )
}

export default Mytrips