import { UserAddOutlined } from "@ant-design/icons";
import { Button, Tooltip, Avatar, Input, Form } from "antd";
import styled from "styled-components";
import { useEffect, useContext, useMemo, useState, useRef } from "react";

import Message from "./Message";
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import useFirestore from "../../hooks/useFirestore";

const WrapperStyled = styled.div`
    height: 100vh;
`;

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 16px;
    border-bottom: 1px solid rgb(230, 230, 230);

    .header {
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        &__title {
            font-weight: bold;
            margin: 0;
        }
        &__description {
            font-size: 12px;
        }
    }
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`;

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`;

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`;

function ChatWindow() {
    const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext);
    const { user } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState("");

    const [form] = Form.useForm();
    const inputRef = useRef(null);
    const messageListRef = useRef(null);

    const handleOnSubmit = () => {
        addDocument("messages", {
            text: inputValue,
            uid: user.uid,
            photoURL: user.photoURL,
            roomId: selectedRoom.id,
            displayName: user.displayName,
        });

        form.resetFields(["message"]);
        setInputValue("");

        if (inputRef?.current) {
            setTimeout(() => {
                inputRef.current.focus();
            });
        }
    };

    const condition = useMemo(() => {
        return {
            fieldName: "roomId",
            operator: "==",
            compareValue: selectedRoom.id,
        };
    }, [selectedRoom]);

    const messageList = useFirestore("messages", condition);

    useEffect(() => {
        // scroll to bottom after message changed
        if (messageListRef?.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50;
        }
    }, [messageList]);

    return (
        <WrapperStyled>
            {Object.keys(selectedRoom).length === 0 ? (
                ""
            ) : (
                <>
                    <HeaderStyled>
                        <div className="header__info">
                            <p className="header__title">{selectedRoom.name}</p>
                            <span className="header__description">{selectedRoom.description}</span>
                        </div>
                        <ButtonGroupStyled>
                            <Button
                                onClick={() => {
                                    setIsInviteMemberVisible(true);
                                }}
                                type="text"
                                icon={<UserAddOutlined />}
                            >
                                Mời
                            </Button>
                            <Avatar.Group size="small" maxCount={2}>
                                {members.map((member) => {
                                    return (
                                        <Tooltip key={member.uid} title={member.displayName.charAt(0).toUpperCase()}>
                                            <Avatar src={member.photoUrl}>
                                                {member.photoUrl ? "" : member.displayName.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </Tooltip>
                                    );
                                })}
                            </Avatar.Group>
                        </ButtonGroupStyled>
                    </HeaderStyled>
                    <ContentStyled>
                        <MessageListStyled ref={messageListRef}>
                            {messageList.map((message, index) => {
                                return (
                                    <Message
                                        key={index}
                                        text={message.text}
                                        displayName={message.displayName}
                                        createdAt={message.createdAt}
                                        photoURL={message.photoURL}
                                    />
                                );
                            })}
                        </MessageListStyled>
                        <FormStyled form={form}>
                            <Form.Item name="message">
                                <Input
                                    ref={inputRef}
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                    }}
                                    onPressEnter={handleOnSubmit}
                                    placeholder="Nhập tin nhắn..."
                                    bordered={false}
                                    autoComplete="off"
                                />
                            </Form.Item>
                            <Button onClick={handleOnSubmit} type="primary">
                                Gửi
                            </Button>
                        </FormStyled>
                    </ContentStyled>
                </>
            )}
        </WrapperStyled>
    );
}

export default ChatWindow;
