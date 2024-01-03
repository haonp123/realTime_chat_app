import { Collapse, Typography, Button } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useContext } from "react";

import { AppContext } from "../../Context/AppProvider";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header,
        p {
            color: white;
        }
        .ant-collapse-content-box {
            padding: 0 40px;
        }
        .add-room {
            color: white;
            padding: 0;
        }
    }
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`;

function RoomList() {
    const { roomList, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext);

    return (
        <Collapse ghost defaultActiveKey={["1"]}>
            <PanelStyled header="Danh sách các phòng" key="1">
                {roomList.map((room) => {
                    return (
                        <LinkStyled
                            key={room.id}
                            onClick={() => {
                                setSelectedRoomId(room.id);
                            }}
                        >
                            {room.name}
                        </LinkStyled>
                    );
                })}
                <Button
                    onClick={() => {
                        setIsAddRoomVisible(true);
                    }}
                    type="text"
                    icon={<PlusSquareOutlined />}
                    className="add-room"
                >
                    Thêm Phòng
                </Button>
            </PanelStyled>
        </Collapse>
    );
}

export default RoomList;
