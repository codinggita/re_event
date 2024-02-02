import React, { useEffect } from 'react';

const Location = (props) => {
  const { location } = props;

  useEffect(() => {
    if (location) {
      const apiKey = 'AIzaSyAaYxvRwjfZmkunDmGVf4buRA7ClXw0Lk8';

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
    const geocoder = new window.google.maps.Geocoder();
    const mapOptions = {
      zoom: 14,
    };

    // Initialize Google Map
    const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

    // Geocode the provided place name
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        console.log(lat, lng);
        // Set the center of the map to the fetched coordinates
        map.setCenter({ lat, lng });

        // Add a marker for the location
        new window.google.maps.Marker({
          position: { lat, lng },
          map,
          title: location || '',
        });
      } else {
        console.error('Error geocoding place name:', status);
      }
    });
  };

  return (
    <>
      <div className="w-full rounded-2xl border border-zinc-600 bg-zinc-800">
        <div className="w-full">
          <div id="map" className="w-full rounded-t-2xl" style={{ height: '400px' }}></div>
        </div>
        <div className="w-full flex flex-col items-start justify-center py-2 px-4">
          <h1 className="text-lg">{location}</h1>
        </div>
      </div>
    </>
  );
};

export default Location;
