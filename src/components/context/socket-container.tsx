import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = React.createContext(null);
export const ConnectContext = React.createContext(null);

export default function SocketContainer({ children }: any) {
    let [socket, setSocket] = useState(null);

    let connect: Function = (token: string) => {

        let newSocket = io("http://localhost:8080", {
            query: { token },
        });
        
        setSocket(newSocket);
        console.log("Successful websocket connection");
    }

    useEffect(() => {
        if (!socket){
            let token = localStorage.getItem("token");
            if (token) {
                connect(token);
            }
        }       
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            <ConnectContext.Provider value={connect}>
                {children}
            </ConnectContext.Provider>
        </SocketContext.Provider>
    );
}