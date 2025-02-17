import { useState } from 'react';
import IndiaMap from 'react-svgmap-india';

function IndiaPoliticalMap() {
  const [selectedState, setSelectedState] = useState('');

  const handleStateClick = (stateAbbreviation) => {
    const stateNames = {
      AN: 'Andaman and Nicobar Islands',
      AP: 'Andhra Pradesh',
      AR: 'Arunachal Pradesh',
      AS: 'Assam',
      BR: 'Bihar',
      CH: 'Chandigarh',
      CT: 'Chhattisgarh',
      DD: 'Dadra and Nagar Haveli',
      DL: 'Delhi',
      DN: 'Daman and Diu',
      GA: 'Goa',
      GJ: 'Gujarat',
      HP: 'Himachal Pradesh',
      HR: 'Haryana',
      JH: 'Jharkhand',
      JK: 'Jammu and Kashmir',
      KA: 'Karnataka',
      KL: 'Kerala',
      LA: 'Ladakh',
      LD: 'Lakshadweep',
      MH: 'Maharashtra',
      ML: 'Meghalaya',
      MN: 'Manipur',
      MP: 'Madhya Pradesh',
      MZ: 'Mizoram',
      NL: 'Nagaland',
      OR: 'Odisha',
      PB: 'Punjab',
      PY: 'Puducherry',
      RJ: 'Rajasthan',
      SK: 'Sikkim',
      TG: 'Telangana',
      TN: 'Tamil Nadu',
      TR: 'Tripura',
      UP: 'Uttar Pradesh',
      UT: 'Uttarakhand',
      WB: 'West Bengal',
    };
    setSelectedState(`You clicked ${stateNames[stateAbbreviation]}`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Interactive Political Map of India</h2>
      <IndiaMap
        onClick={handleStateClick}
        size="500px"
        mapColor="white"
        strokeColor="#4f4f4f"
        strokeWidth="1"
        hoverColor="#48d8f5"
      />
      {selectedState && <p style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>{selectedState}</p>}
    </div>
  );
}

export default IndiaPoliticalMap;
