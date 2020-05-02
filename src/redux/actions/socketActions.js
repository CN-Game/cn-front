const ACTIONS = {
    SET_SOCKET: 'SET_SOCKET',
};

const setSocket = (socket) => {
    return { type: ACTIONS.SET_SOCKET, socket}
};

export {
    setSocket,
}

