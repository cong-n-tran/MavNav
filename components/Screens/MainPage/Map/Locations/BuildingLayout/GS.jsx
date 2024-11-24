export default GS = [
    {
        dimensions: {x: 0, y: 0},
        entries: {

        },
        stairs: {

        },
        rooms: {
           
        }
    }
];

export const getGeoscienceRoomPointCoordinates = (room) => { return GS[0].rooms[1][room] || null };
export const getGeosceinceEntryPointCoordinates = (name) => { return GS[0].entries[name] || null }