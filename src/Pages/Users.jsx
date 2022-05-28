import React, { useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../store/actions/users";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [err, setErr] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    phone: "",
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (_, res) => dayjs(res?.lastLogin).format("DD MM YYYY hh:mm A"),
    },
    {
      title: "Products",
      dataIndex: "prodeucts",
      key: "prodeucts",
      render: (_, res) => (
        <Button type="link" onClick={() => navigate(`/products/${res?._id}`)}>
          View Products
        </Button>
      ),
    },
  ];

  const loginLoader = useSelector((state) => state.dashboard.loginLoader);
  const users = useSelector((state) => state.dashboard.users);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // setIsModalVisible(false);
    setErr(false);
    if (
      !userData?.email ||
      !userData?.password ||
      !userData?.address ||
      !userData?.phone ||
      !userData?.name
    ) {
      return setErr(true);
    }
    dispatch({ type: "LOGIN_LOADER_ON" });
    dispatch(createUser(userData));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {isModalVisible && (
        <Modal
          title="Create new user"
          visible={isModalVisible}
          onOk={handleOk}
          confirmLoading={loginLoader}
          okText="Create account"
          onCancel={handleCancel}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input
              className="modal-input"
              type="text"
              placeholder="Full Name"
              value={userData?.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            <Input
              style={{ marginLeft: 10 }}
              className="modal-input"
              type="text"
              placeholder="Email"
              value={userData?.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <Input
            className="modal-input"
            type="text"
            placeholder="Address"
            value={userData?.address}
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input
              className="modal-input"
              type="text"
              placeholder="Phone"
              value={userData?.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
            <Input
              style={{ marginLeft: 10 }}
              className="modal-input"
              type="password"
              placeholder="Password"
              value={userData?.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
          {err && <p style={{ color: "tomato" }}>Please fill all fields!</p>}
        </Modal>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 20,
        }}
      >
        <Button onClick={showModal}>Create new user</Button>
      </div>
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

export default Users;
