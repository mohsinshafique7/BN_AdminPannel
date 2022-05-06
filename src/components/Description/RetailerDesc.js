import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { Popconfirm, Button } from "antd";
import CoreForm from "../ModalFrom/CoreForm";
import { retailerEditInput } from "../../utils/FormInputs/RetailerFormInputs";
import { useGetSingleRetailers, useUpdateRetailer, useDeleteRetailer } from "../../Requests/RetailerRequest";
import Loader from "../../components/Loader/Loader";
const RetailerDesc = ({ history, match: { params } }) => {
  const { isLoading: retailerIsLoading, data: retailerData } = useGetSingleRetailers(params.id);
  const { mutate: updateRetailer } = useUpdateRetailer("retailerDes");
  const { mutate: deleteRetailer, status: retailerDeleteStatus } = useDeleteRetailer();

  const inputData = retailerEditInput();

  const initialValue = {
    id: params.id,
    color: retailerData?.retailer?.color,
  };
  useEffect(() => {
    if (retailerDeleteStatus === "success") {
      history.push("/retailers/page=0&perPage=10");
    }
  }, [retailerDeleteStatus, history]);
  const handleDelete = () => {
    deleteRetailer(params.id);
  };
  const divStyle = {
    color: retailerData?.retailer?.color,
  };

  const onSendForm = (values) => {
    const { id, color } = values;
    updateRetailer({ id, color });
  };

  return (
    <>
      <Button type="primary" onClick={() => history.goBack()}>
        Go Back
      </Button>
      <div className="item-title">Retailer Description</div>
      {!retailerIsLoading ? (
        <div className="item-wrapper">
          <div className="description-box">
            <div className="title-item-desc">
              Created At: <span>{moment(retailerData?.retailer?.createdAt).format("MMMM Do YYYY, h:mm")}</span>
            </div>
            <div className="title-item-desc">
              Updated At: <span>{moment(retailerData?.retailer?.updatedAt).format("MMMM Do YYYY, h:mm")}</span>
            </div>
            <div className="title-item-desc">
              Colour: <span style={divStyle}>{retailerData?.retailer?.color}</span>
            </div>
            <div className="title-item-desc">
              Name: <span>{retailerData?.retailer?.name}</span>
            </div>
          </div>
          <div className="controls-box">
            <Popconfirm
              onConfirm={() => handleDelete(params.id)}
              title={`Are you sure you want to delete retailer ${retailerData?.retailer?.name}？`}
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
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withRouter(RetailerDesc);
