import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal, Input, Avatar, Upload } from "antd";
import dayjs from "dayjs";
import {
  createProduct,
  deleteProduct,
  fetchSingleProduct,
  updateProduct,
} from "../store/actions/users";
import { UploadOutlined } from "@ant-design/icons";

const Products = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const products = useSelector((state) => state.dashboard.products);
  const singleProduct = useSelector((state) => state.dashboard.singleProduct);
  const loginLoader = useSelector((state) => state.dashboard.loginLoader);
  const loader = useSelector((state) => state.dashboard.loader);
  const updateData = useSelector((state) => state.dashboard.updateData);
  const vendorID = useSelector((state) => state.user.user?._id);
  const isVendor = JSON.parse(localStorage.getItem("isVendor"));

  const [list, setList] = useState(true);
  const modalVisible = useSelector((state) => state.dashboard.showModal);
  const modalVisibleUpdate = useSelector(
    (state) => state.dashboard.showModalUpdate
  );
  const [err, setErr] = useState(false);
  const [image, setImage] = useState();
  const [media, setMedia] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    media: image,
    price: "",
    vendor: vendorID,
    _id: "",
  });

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id]);

  const handleDelete = (id) => {
    dispatch(deleteProduct({ _id: id, vendor: vendorID }));
  };

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
      render: (text, res) => (
        <a
          onClick={() => {
            dispatch({ type: "UPDATE_DATA", payload: res });
            dispatch({ type: "SHOW_MODAL_UPDATE" });
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      render: (_, res) => <span>{res?.vendor?.name}</span>,
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
      render: (_, res) => dayjs(res?.updatedAt).format("DD MM YYYY hh:mm A"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, res) => (
        <Button
          loading={loginLoader}
          onClick={() => handleDelete(res?._id)}
          danger
        >
          Delete
        </Button>
      ),
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
    setErr(false);
    console.log(image, "Img");
    setProductData({ ...productData, media: image, vendor: vendorID });
    if (!productData?.name || !productData?.price) {
      return setErr(true);
    }
    dispatch({ type: "LOGIN_LOADER_ON" });
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

  useEffect(() => {
    setProductData({ ...productData, _id: updateData?._id });
  }, [updateData]);

  const handleUpdate = () => {
    dispatch({ type: "LOADER_ON" });
    let updateDataProduct = {
      name:
        (productData?.name).length == 0 ? updateData?.name : productData?.name,
      price:
        (productData?.price).length == 0
          ? updateData?.price
          : productData?.price,
      _id: updateData?._id,
      // vendor: vendorID,
    };
    dispatch(updateProduct(updateDataProduct));
  };

  const handleCancelUpdate = () => {
    dispatch({ type: "HIDE_MODAL_UPDATE" });
  };

  let isVendorCheck = localStorage.getItem("isVendor");

  return (
    <div>
      {modalVisibleUpdate && isVendorCheck && (
        <Modal
          title="Updateproduct"
          visible={modalVisibleUpdate}
          onOk={handleUpdate}
          confirmLoading={loader}
          okText="Update product"
          onCancel={handleCancelUpdate}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input
              className="modal-input"
              type="text"
              placeholder={updateData?.name}
              value={productData?.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            />
            <Input
              style={{ marginLeft: 10 }}
              className="modal-input"
              type="text"
              placeholder={updateData?.price}
              value={productData?.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
            />
          </div>
          <Avatar style={{ marginRight: 10 }} src={updateData?.media[0]} />
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
          <Button onClick={showModal}>Create new product</Button>
        </div>
      )}
      {list ? (
        <div>
          {isVendorCheck && <span>Click on the product to update!</span>}
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
