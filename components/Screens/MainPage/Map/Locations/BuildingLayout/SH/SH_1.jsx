export const SH_1 = [
    {
        dimensions: {x: 1584, y: 1224},
        entries: {
            north_1: {x: 680, y: 120},
            north_2: {x: 1086, y: 130},
            south_1: {x: 914, y: 860},
            east_1: {x: 1216, y: 249},
            east_2: {x: 442, y: 610},
            west_1: {x: 372, y: 302},
            west_2: {x: 379, y: 802},
        },
        stairs: {
            west_1: {x: 372, y: 302},
            west_2: {x: 379, y: 802},
            south_1: {x: 914, y: 860},
            north_1: {x: 680, y: 120},
            north_2: {x: 1086, y: 130},
        }
    }
]
export const getScienceHallEntryPointCoordiantes = (name) => { return SH_1[0].entries[name] || null }