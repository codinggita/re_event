import React, { useEffect } from 'react';

const Location = ({ location }) => {
  useEffect(() => {
    if (location) {
      const apiKey = 'AIzaSyAaYxvRwjfZmkunDmGVf4buRA7ClXw0Lk8'; // Replace with your Google Maps API key
      const mapapi = 'https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJeRpOeF67j4AR9ydy_PIzPuM&key=' + apiKey;
      console.log(mapapi)
      // Dynamically load Google Maps API script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);

      // Clean up the script tag
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [location]);

  const initializeMap = () => {
    const mapOptions = {
      zoom: 14,
      center: { lat: 30, lng: 78 }, // Initial center, will be updated with the provided location
    };

    // Initialize Google Map
    const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

    // Set the center of the map to the provided location
    map.setCenter(location);
    
    // Add a marker for the location
    new window.google.maps.Marker({
      position: location,
      map,
      title: location || '',
    });
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-600 bg-zinc-800">
      <div className="w-full">
        <div id="map" className="w-full rounded-t-2xl" style={{ height: '250px' }}></div>
      </div>
      <div className="w-full flex flex-col items-start justify-center py-2 px-4">
        <h1 className="text-lg">{location}</h1>
      </div>
    </div>
  );
};

export default Location;
