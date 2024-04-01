import { View, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { selectFieldToUpdate } from '../redux/slices/authSlice';
import DobUpdate from '../components/UpdateComponents/DobUpdate';
import { useSelector } from 'react-redux';
import PanUpdate from '../components/UpdateComponents/PanUpdate';
import NoofChildren from '../components/UpdateComponents/NoofChildren';
import MontlyEmi from '../components/UpdateComponents/MontlyEmi';
import HouseType from '../components/UpdateComponents/HouseType';
import NumberofBusiness from '../components/UpdateComponents/NumberofBusiness';
import NoofTrucks from '../components/UpdateComponents/NoofTrucks';
import CityUpdate from '../components/UpdateComponents/CityUpdate';
import PhoneUpdate from '../components/UpdateComponents/PhoneUpdate';
import TruckNumber from '../components/UpdateComponents/TruckNumber';
import PanCardUpdate from '../components/UpdateComponents/PanCardUpdate';
import AadharCardUpdate from '../components/UpdateComponents/AadharCardUpdate';



const UpdateScreen = () => {
  const fieldName = useSelector(selectFieldToUpdate);

  // Render the appropriate component based on the fieldToUpdate parameter
  const renderUpdateComponent = () => {
    switch (fieldName) {
      case 'dob':
        return <DobUpdate />;
      case 'pan':
        return <PanUpdate />;
      case 'noofchildren':
        return <NoofChildren />;
      case 'montlyemioutflow':
        return <MontlyEmi />;
      case 'housetype':
        return <HouseType martials={false}/>
      case 'noofyearsinbusiness':
        return <NumberofBusiness />
      case 'numberoftrucks':
        return <NoofTrucks />
      case 'city':
        return <CityUpdate house={false} />;
      case 'houseaddress':
        return <CityUpdate house={true} />
      case 'phone':
        return <PhoneUpdate alternate={false}/>;
      case 'altphone':
        return <PhoneUpdate alternate={true}/>;
      case 'marital':
        return <HouseType maritals={true} />;
      case 'trucknumber':
        return <TruckNumber />
      case 'pancard':
        return <PanCardUpdate />
      case 'aadharcard':
        return <AadharCardUpdate />
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      {renderUpdateComponent()}
    </View>
  );
}

export default UpdateScreen