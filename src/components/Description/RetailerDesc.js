import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getRetailer, deleteRetailer, editRetailer } from "../../store/retailers/action";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { Popconfirm, Button } from "antd";
import CoreForm from "../ModalFrom/CoreForm";

const RetailerDesc = ({
  //   getRetailer,
  // deleteRetailer,
  // editRetailer,
  // retailer: { createdAt, updatedAt, name, id, color },
  history,
  match: { params },
}) => {
  const { retailer } = useSelector((state) => {
    return { retailer: state.retailers.retailer };
  });

  const { createdAt, updatedAt, name, id, color } = retailer;
  const dispatch = useDispatch();

  const inputData = [{ label: "Colour", name: "color", type: "text", required: true }];

  const initialValue = {
    color,
  };

  useEffect(() => {
    dispatch(getRetailer(params.id));
  }, [dispatch, params.id]);

  const handleDelete = (id) => {
    dispatch(deleteRetailer(id)).then(() => {
      history.push("/retailers/page=0&perPage=10");
    });
  };
  const divStyle = {
    color: color,
  };

  const onSendForm = (values) => {
    dispatch(editRetailer(values, id)).then(() => {
      dispatch(getRetailer(params.id));
    });
  };

  return (
    <>
      <Button type="primary" onClick={() => history.goBack()}>
        Go Back
      </Button>
      <div className="item-title">Retailer Description</div>
      <div className="item-wrapper">
        <div className="description-box">
          <div className="title-item-desc">
            Created At: <span>{moment(createdAt).format("MMMM Do YYYY, h:mm")}</span>
          </div>
          <div className="title-item-desc">
            Updated At: <span>{moment(updatedAt).format("MMMM Do YYYY, h:mm")}</span>
          </div>
          <div className="title-item-desc">
            Colour: <span style={divStyle}>{color}</span>
          </div>
          <div className="title-item-desc">
            Name: <span>{name}</span>
          </div>
        </div>
        <div className="controls-box">
          <Popconfirm
            onConfirm={() => handleDelete(id)}
            title={`Are you sure you want to delete retailer ${name}？`}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          <CoreForm title={"Edit Color"} initialValue={initialValue} inputData={inputData} onSendForm={onSendForm} />
        </div>
      </div>
    </>
  );
};

export default withRouter(RetailerDesc);
