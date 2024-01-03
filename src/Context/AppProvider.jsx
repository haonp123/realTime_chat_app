import { createContext, useContext, useMemo, useState } from "react";

import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";

export const AppContext = createContext();

function AppProvider({ children }) {
    const { user } = useContext(AuthContext);
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState();

    //Get room list
    const roomsCondition = useMemo(() => {
        return {
            fieldName: "members",
            operator: "array-contains",
            compareValue: user.uid,
        };
    }, [user]);

    const roomList = useFirestore("rooms", roomsCondition);

    // Get current room
    const selectedRoom = useMemo(() => {
        return (
            roomList.find((room) => {
                return room.id === selectedRoomId;
            }) || {}
        );
    }, [roomList, selectedRoomId]);

    // Get members of current room:
    const usersCondition = useMemo(() => {
        return {
            fieldName: "uid",
            operator: "in",
            compareValue: selectedRoom.members,
        };
    }, [selectedRoom.members]);

    const members = useFirestore("users", usersCondition);

    return (
        <AppContext.Provider
            value={{
                isAddRoomVisible,
                setIsAddRoomVisible,
                roomList,
                selectedRoomId,
                setSelectedRoomId,
                selectedRoom,
                members,
                isInviteMemberVisible,
                setIsInviteMemberVisible,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
