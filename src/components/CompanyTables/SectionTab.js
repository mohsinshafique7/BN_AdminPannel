import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Checkbox } from "antd";
import { getCompanySection, subscribeCompanySection, unsubscribeCompanySection } from "../../store/companies/action";

import TableBox from "../TableBox/TableBox";
import Search from "../Search/Search";
import Loader from "../Loader/Loader";

import { STATE_STATUSES } from "../../utils/app";

const SectionTab = ({ companyId }) => {
  const dispatch = useDispatch();

  const {
    status,
    sections: { sections },
  } = useSelector((state) => state.companies);

  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    dispatch(getCompanySection(companyId)).then((response) => {
      const selectedSection = response.data.result.companySections.map((item) => item.name);
      setSelectedItem(selectedSection);
    });
  }, []);

  const handleChange = (name, id) => {
    if (selectedItem.includes(name)) {
      const update = selectedItem.filter((item) => item !== name);
      setSelectedItem(update);
      dispatch(unsubscribeCompanySection({ id, companyId }));
    } else {
      setSelectedItem((prevState) => [...prevState, name]);
      dispatch(subscribeCompanySection({ id, companyId }));
    }
  };

  const sortParams = [{ label: "Section", value: "id" }];

  const tableHeader = () => (
    <div className="item-box header">
      <div className="item-link">Section</div>
    </div>
  );

  const tableData = (item) => (
    <>
      <div className="item-link" style={{ textTransform: "capitalize" }}>
        {item.name}
      </div>
      <div className="checkboxes-wrap">
        <Checkbox onChange={() => handleChange(item.name, item.id)} checked={selectedItem.includes(item.name)}>
          Subscription
        </Checkbox>
      </div>
    </>
  );

  return (
    <>
      <div className="item-title">Retailers</div>
      {status !== STATE_STATUSES.PENDING ? (
        <>
          {sections && sections.length ? (
            <>
              <Search />
              <TableBox
                data={sections}
                tableHeader={tableHeader}
                tableData={tableData}
                titleParam={"name"}
                sortParams={sortParams}
                page={page}
                perPage={perPage}
                setPage={setPage}
                setPerPage={setPerPage}
              />
            </>
          ) : (
            <div className="empty-item">
              <Empty />
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SectionTab;
