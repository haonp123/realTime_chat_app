import { Modal, Form, Input } from "antd";
import { useState, useContext } from "react";

import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";

function AddRoomModal() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const { user } = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleOk = () => {
        //add new room to firestore
        addDocument("rooms", {
            ...form.getFieldsValue(),
            members: [user.uid],
        });
        //reset form value
        form.resetFields();

        setIsAddRoomVisible(false);
    };

    const handleCancel = () => {
        //reset form value
        form.resetFields();
        setIsAddRoomVisible(false);
    };

    return (
        <div>
            <Modal title="Tạo phòng" open={isAddRoomVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên phòng" name="name">
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea placeholder="Nhập mô tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddRoomModal;
