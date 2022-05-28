import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal, Input, Avatar, Upload } from "antd";
import dayjs from "dayjs";
import { createProduct, fetchSingleProduct } from "../store/actions/users";
import { UploadOutlined } from "@ant-design/icons";

const Products = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const products = useSelector((state) => state.dashboard.products);
  const singleProduct = useSelector((state) => state.dashboard.singleProduct);
  const loginLoader = useSelector((state) => state.dashboard.loginLoader);
  const vendorID = useSelector((state) => state.user.user?._id);
  const isVendor = JSON.parse(localStorage.getItem("isVendor"));

  const [list, setList] = useState(true);
  const modalVisible = useSelector((state) => state.dashboard.showModal);
  const [err, setErr] = useState(false);
  const [image, setImage] = useState();
  const [media, setMedia] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    media: image,
    price: "",
    vendor: vendorID,
  });

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id]);

  const columns = [
    {
      title: "Image",
      dataIndex: "media",
      key: "media",
      render: (_, res) => <Avatar src={res?.media[0]} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      render: (_, res) => <a>{res?.vendor?.name}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, res) => dayjs(res?.createdAt).format("DD MM YYYY hh:mm A"),
    },
    {
      title: "Last Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_, ress) => {
        dayjs(ress?.updatedAt).format("DD MM YYYY hh:mm A");
      },
    },
  ];

  useEffect(() => {
    id && setList(false);
  }, [id]);

  const showModal = () => {
    dispatch({ type: "SHOW_MODAL" });
  };

  const handleCancel = () => {
    dispatch({ type: "HIDE_MODAL" });
  };

  useEffect(() => {
    setProductData({ ...productData, media: image });
  }, [media, image]);

  useEffect(() => {
    setProductData({ ...productData, vendor: vendorID });
  }, [vendorID]);

  const handleOk = () => {
    dispatch({ type: "LOGIN_LOADER_ON" });
    setErr(false);
    console.log(image, "Img");
    setProductData({ ...productData, media: image, vendor: vendorID });
    if (!productData?.name || !productData?.price) {
      return setErr(true);
    }
    dispatch(createProduct(productData));
  };

  // For image uplaod dummy request
  const dummyRequest = ({ file, onSuccess }) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div>
      {modalVisible && (
        <Modal
          title="Create new product"
          visible={modalVisible}
          onOk={handleOk}
          confirmLoading={loginLoader}
          okText="Create product"
          onCancel={handleCancel}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input
              className="modal-input"
              type="text"
              placeholder="Product Name*"
              value={productData?.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            />
            <Input
              style={{ marginLeft: 10 }}
              className="modal-input"
              type="text"
              placeholder="Price*"
              value={productData?.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
            />
          </div>
          <Upload
            accept="png"
            style={{ width: "100%" }}
            customRequest={dummyRequest}
            onChange={(file) => setMedia(file)}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload product image</Button>
          </Upload>
          {err && (
            <p style={{ color: "tomato" }}>Please fill all required fields *</p>
          )}
        </Modal>
      )}
      {isVendor && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <Button onClick={showModal}>Create new user</Button>
        </div>
      )}
      {list ? (
        <div>
          <Table columns={columns} dataSource={products} />
        </div>
      ) : (
        <div>
          <Table columns={columns} dataSource={singleProduct} />
        </div>
      )}
    </div>
  );
};

export default Products;
