import React from "react";
import { withRouter } from "react-router-dom";
import { Tabs, Button } from "antd";
import UserDesc from "../Description/UserDesc";

const UserTabs = ({ user, history }) => {
  const { TabPane } = Tabs;

  const callback = (key) => {
    console.log(key);
  };

  return (
    <>
      <Button type="primary" onClick={() => history.goBack()}>
        Go Back
      </Button>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="User" key="1">
          <UserDesc />
        </TabPane>
        {/* <TabPane tab="Weights" key="2">
                    <MainWeights userId={user.id} />
                </TabPane> */}
      </Tabs>
    </>
  );
};

export default withRouter(UserTabs);
