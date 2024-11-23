// use this website to find lat and long: https://www.latlong.net/

// storing all given locations
export const buildingLocations = [
  { 
    id: 1,
    name: "Science Hall", 
    coordinates: { 
      default: {latitude: 32.73071184496668, longitude: -97.11402209896427},
      center: {latitude: 32.73071184496668, longitude: -97.11402209896427},
      entries: {
        north_1: {latitude: 32.73095370165395, longitude: -97.11392743506755},
        north_2: {latitude: 32.7309537016539, longitude: -97.11361484194124},
        south_1: {latitude: 32.73041175247476, longitude:-97.11382361549465},
        east_1: {latitude: 32.73087881328362, longitude: -97.11349102157537},
        east_2: {latitude: 32.730651335925785, longitude: -97.11394545196242},
        west_1: {latitude: 32.73087349269386, longitude: -97.11423922867473},
        west_2: {latitude: 32.73050507845114, longitude: -97.11425444170978}
      }
    },
    layout: 'ScienceHallLayoutScreen',
  },
  { 
    id: 2,
    name: "MAC", 
    coordinates: { 
      default: {latitude: 32.731841, longitude: -97.116840},
      center: {latitude:32.731777, longitude: -97.117485},
      entries: {
        north: {latitude: 0, longitude: 0},
        south: {latitude: 0, longitude: 0},
        east: {latitude: 0, longitude: 0},
        west: {latitude: 0, longitude: 0}
      }
    },
    layout: 'MACLayoutScreen',
  },
  { 
    id: 3,
    name: "Geoscience Building", 
    coordinates: { 
      default: {latitude: 32.731812, longitude: -97.113861},
      center: {latitude:32.731577, longitude: -97.114098},
      entries: {
        north: {latitude: 0, longitude: 0},
        south: {latitude: 0, longitude: 0},
        east: {latitude: 0, longitude: 0},
        west: {latitude: 0, longitude: 0}
      }
    },
    layout: 'GeoscienceLayoutScreen',
  },
];

export const getBuildingLocationByName = (name) => buildingLocations.find(loc => loc.name === name)?.coordinates;
export const getBuildingLayoutByName = (name) => buildingLocations.find(loc => loc.name == name)?.layout;

const buildingData = {
  "SH": require('./BuildingLayout/SH.jsx').default,
  // "MAC": require('./BuildingLayout/MAC.jsx').default,
  // "GEO": require('./BuildingLayout/GEO.jsx').default,
}

export const getBuildingDataByInitals = (initals) => { return buildingData[initals] || null }

const buildingInitals = {
  "Science Hall" :'SH', 
  "MAC" :'MAC', 
  "Geoscience Building" :'GEO', 
}
export const getBuildingInitalsByName = (name) => { return buildingInitals[name] || null }










// may use but for now, its in my face and i hate it
// { 
//   id: 4,
//   name: "Science and Engineering Innovation and Research Building (SEIR)", 
//   coordinates: { 
//     default: {latitude: 32.728036, longitude: -97.113269},
//     center: {latitude:32.728058, longitude: -97.113525},
//     entries: {
//       north: {latitude: 0, longitude: 0},
//       south: {latitude: 0, longitude: 0},
//       east: {latitude: 0, longitude: 0},
//       west: {latitude: 0, longitude: 0}
//     }
//   },
//   layout: 'SEIRLayoutScreen',
// },
// { 
//   id: 5,
//   name: "College of Business", 
//   coordinates: { 
//     default: {latitude: 32.729716, longitude: -97.110664},
//     center: {latitude:32.72972, longitude: -97.110614},
//     entries: {
//       north: {latitude: 0, longitude: 0},
//       south: {latitude: 0, longitude: 0},
//       east: {latitude: 0, longitude: 0},
//       west: {latitude: 0, longitude: 0}
//     }
//   },
//   layout: 'CollegeOfBusinessLayoutScreen',
// },
// { 
//   id: 6,
//   name: "Wolfe Hall", 
//   coordinates: { 
//     default: { latitude: 32.731697, longitude: -97.112533 },
//     center: {latitude:32.731742, longitude: -97.112527},
//     entries: {
//       north: {latitude: 0, longitude: 0},
//       south: {latitude: 0, longitude: 0},
//       east: {latitude: 0, longitude: 0},
//       west: {latitude: 0, longitude: 0}
//     }
//   },
//   layout: 'WolfeHallLayoutScreen',
// },
// { 
//   id: 7,
//   name: "Engineering Research Building (ERB)", 
//   coordinates: { 
//     default: { latitude: 32.733331, longitude: -97.113498  },
//     center: {latitude:32.733367, longitude: -97.112468},
//     entries: {
//       north: {latitude: 0, longitude: 0},
//       south: {latitude: 0, longitude: 0},
//       east: {latitude: 0, longitude: 0},
//       west: {latitude: 0, longitude: 0}
//     }
//   },
//   layout: 'ERBLayoutScreen',
// },