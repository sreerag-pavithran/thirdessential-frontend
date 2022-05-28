import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal, Input, Avatar } from "antd";
import dayjs from "dayjs";
import { fetchSingleProduct } from "../store/actions/users";

const Products = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const products = useSelector((state) => state.dashboard.products);
  const singleProduct = useSelector((state) => state.dashboard.singleProduct);
  const [list, setList] = useState(true);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id]);

  const columns = [
    {
      title: "Image",
      dataIndex: "media",
      key: "media",
      render: (_, res) => <Avatar src="https://joeschmoe.io/api/v1/random" />,
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

  return (
    <div>
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
