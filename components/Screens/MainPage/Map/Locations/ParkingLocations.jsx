export const parkingLocations = [
    {
        id: 50,
        name: "Lot 49", // south of seir
        coordinates: { 
            default: {latitude: 32.725817, longitude: -97.112808},
        },
        layout: '',
    }, 
    {
        id: 51,
        name: "Lot 10", // east of nursing building
        coordinates: { 
            default: {latitude: 32.728146, longitude: -97.110542},
        },
        layout: '',
    },
    {
        id: 52,
        name: "Lot 52", //east of lot 49
        coordinates: { 
            default: {latitude: 32.725580, longitude: -97.110476},
        },
        layout: '',
    },
    {
        id: 53,
        name: "Lot 36", //north of erb
        coordinates: { 
            default: {latitude: 32.734575, longitude: -97.113292},
        },
        layout: '',
    },
    {
        id: 54,
        name: "West Campus Garage", // mac garage 
        coordinates: { 
            default: {latitude: 32.733636, longitude: -97.117093},
        },
        layout: '',
    }
]

export const getParkingLocationByName = (name) => parkingLocations.find(loc => loc.name === name)?.coordinates.default;
export const getParkingLayoutByName = (name) => parkingLocations.find(loc => loc.name == name)?.layout;
