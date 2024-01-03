import { Button, Avatar, Typography } from "antd";
import styled from "styled-components";
import { useEffect, useContext } from "react";

import { auth, db } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";

const WrapperStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;

    .user-info {
        display: flex;
        align-items: center;
    }
    .user-name {
        color: white;
        margin-left: 5px;
    }
`;

function UserInfo() {
    const { user } = useContext(AuthContext);

    

    return (
        <WrapperStyled>
            <div className="user-info">
                <Avatar src={user.photoURL} className="user-avatar">
                    {user.photoURL ? "" : user.displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography className="user-name">{user.displayName}</Typography>
            </div>
            <Button
                ghost
                className="log-out"
                onClick={() => {
                    if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
                        auth.signOut();
                    }
                }}
            >
                Đăng Xuất
            </Button>
        </WrapperStyled>
    );
}

export default UserInfo;
