export const generateFilename = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    const filename = `${timestamp}-${randomNumber}`;
    return filename;
};


export const generateRoomId = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `room_${randomNumber}`;
};