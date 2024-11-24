export default MAC = [
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

export const getMACRoomPointCoordinates = (room) => { return MAC[0].rooms[1][room] || null };
export const getMACEntryPointCoordinates = (name) => { return MAC[0].entries[name] || null }