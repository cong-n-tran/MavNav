// use this website to find lat and long: https://www.latlong.net/

// storing all given locations
export const buildingLocations = [
    { 
      id: 1,
      name: "Science Hall", 
      coordinates: { 
        default: {latitude: 32.731841, longitude: -97.116840},
        center: {latitude:32.731777, longitude: -97.117485},
        north: {latitude: 0, longitude: 0},
        south: {latitude: 0, longitude: 0},
        east: {latitude: 0, longitude: 0},
        west: {latitude: 0, longitude: 0}
      },
      layout: 'ScienceHallLayoutScreen',
    },
    { 
      id: 2,
      name: "MAC", 
      coordinates: { 
        default: {latitude: 32.731841, longitude: -97.116840},
        center: {latitude:32.731777, longitude: -97.117485},
        north: {latitude: 0, longitude: 0},
        south: {latitude: 0, longitude: 0},
        east: {latitude: 0, longitude: 0},
        west: {latitude: 0, longitude: 0}
      },
      layout: 'MACLayoutScreen',
    },
    { 
      id: 3,
      name: "Geoscience Building", 
      coordinates: { 
        default: {latitude: 32.731812, longitude: -97.113861},
        center: {latitude:32.731577, longitude: -97.114098},
        north: {latitude: 0, longitude: 0},
        south: {latitude: 0, longitude: 0},
        east: {latitude: 0, longitude: 0},
        west: {latitude: 0, longitude: 0}
      },
      layout: 'GeoscienceLayoutScreen',
    },
    { 
      id: 4,
      name: "Science and Engineering Innovation and Research Building (SEIR)", 
      coordinates: { 
        default: {latitude: 32.728036, longitude: -97.113269},
        center: {latitude:32.728058, longitude: -97.113525},
        north: {latitude: 0, longitude: 0},
        south: {latitude: 0, longitude: 0},
        east: {latitude: 0, longitude: 0},
        west: {latitude: 0, longitude: 0}
      },
      layout: 'SEIRLayoutScreen',
    },
    { 
      id: 5,
      name: "College of Business", 
      coordinates: { 
        default: {latitude: 32.729716, longitude: -97.110664},
        center: {latitude:32.72972, longitude: -97.110614},
        north: {latitude: 0, longitude: 0},
        south: {latitude: 0, longitude: 0},
        east: {latitude: 0, longitude: 0},
        west: {latitude: 0, longitude: 0}
      },
      layout: 'CollegeOfBusinessLayoutScreen',
    },
    { 
      id: 6,
      name: "Wolfe Hall", 
      coordinates: { 
        default: { latitude: 32.731697, longitude: -97.112533 },
        center: {latitude:32.731742, longitude: -97.112527},
        north: {latitude: 0, longitude: 0},
        south: {latitude: 0, longitude: 0},
        east: {latitude: 0, longitude: 0},
        west: {latitude: 0, longitude: 0}
      },
      layout: 'WolfeHallLayoutScreen',
    },
    { 
      id: 7,
      name: "Engineering Research Building (ERB)", 
      coordinates: { 
        default: { latitude: 32.733331, longitude: -97.113498  },
        center: {latitude:32.733367, longitude: -97.112468},
        north: {latitude: 0, longitude: 0},
        south: {latitude: 0, longitude: 0},
        east: {latitude: 0, longitude: 0},
        west: {latitude: 0, longitude: 0}
      },
      layout: 'ERBLayoutScreen',
    },
  ];
export const getBuildingLocationByName = (name) => buildingLocations.find(loc => loc.name === name)?.coordinates.default;
export const getBuildingLayoutByName = (name) => buildingLocations.find(loc => loc.name == name)?.layout;
