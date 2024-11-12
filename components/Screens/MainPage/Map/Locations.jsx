// use this website to find lat and long: https://www.latlong.net/

// storing all given locations
export const locations = [
    { 
      id: 1,
      name: "MAC", 
      coordinates: { 
        default: {latitude: 32.731841, longitude: -97.116840},
        center: {latitude:32.731777, longitude: -97.117485},
      },
      layout: 'MACLayoutScreen',
    },
    { 
      id: 2,
      name: "Geoscience Building", 
      coordinates: { 
        default: {latitude: 32.731812, longitude: -97.113861},
        center: {latitude:32.731577, longitude: -97.114098},
      },
      layout: 'GeoscienceLayoutScreen',
    },
    { 
      id: 3,
      name: "Science and Engineering Innovation and Research Building (SEIR)", 
      coordinates: { 
        default: {latitude: 32.728036, longitude: -97.113269},
        center: {latitude:32.728058, longitude: -97.113525},
      },
      layout: 'SEIRLayoutScreen',
    },
    { 
      id: 4,
      name: "College of Business", 
      coordinates: { 
        default: {latitude: 32.729716, longitude: -97.110664},
        center: {latitude:32.72972, longitude: -97.110614},
      },
      layout: 'CollegeOfBusinessLayoutScreen',
    },
    { 
      id: 5,
      name: "Wolfe Hall", 
      coordinates: { 
        default: { latitude: 32.731697, longitude: -97.112533 },
        center: {latitude:32.731742, longitude: -97.112527},
      },
      layout: 'WolfeHallLayoutScreen',
    },
    { 
      id: 6,
      name: "Engineering Research Building (ERB)", 
      coordinates: { 
        default: { latitude: 32.733331, longitude: -97.113498  },
        center: {latitude:32.733367, longitude: -97.112468},
      },
      layout: 'ERBLayoutScreen',
    },
  ];