import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";
import ActivityLog from "./ActivityLog";
import LocationUpload from "./LocationUpload";
import WebCameraForm from "./WebCameraForm";
import { useDispatch, useSelector } from "react-redux";
import { loadCustomers } from "../store/reducers/customers";
import { clientAdded, clientMoved } from "../store/reducers/cartClient";

import DataList from "./common/DataList";

// TODO 信息保存后一起提交到数据库,文件可以单独保存
// 相片提交后返回数据库中文件名,其他如地理位置、日记等才可以保存成功
// 所有提交成功后,锁定页面，可以看，不能修改
// 重新选择客户，重新录入,点击确定，开始录入,
const VisitBeginInfo = (props) => {
  const { visitStart } = props;
  return (
    <>
      <div className="row g-0 mt-2 p-2 border rounded">
        <div className="col-12 col-sm-6 text-start mt-1">
          Visit Starts at:&nbsp;&nbsp;
          <span className="text-primary">{visitStart.toLocaleString()}</span>
        </div>

        <div className="col-12 col-sm-6 text-start text-sm-end mt-1 ">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => props.onChange(new Date())}
          >
            Reset Start Time
          </button>
        </div>
      </div>
    </>
  );
};

function VisitCustomerForm(props) {
  const { user } = props; // user: _id,name,isAdmin,region
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.entities.customers.list);

  useEffect(() => {
    dispatch(loadCustomers());
  }, []);

  useEffect(() => {
    setCustomerList(customers);
  }, [customers]);

  const [customerList, setCustomerList] = useState(undefined);

  const [errors, setErrors] = useState({ customer: undefined });
  const [visitStart, setVisitStart] = useState(new Date());

  const tabData = [
    { name: "Location", isActive: true, component: LocationUpload },
    { name: "Photo", isActive: false, component: WebCameraForm },
    { name: "Log", isActive: false, component: ActivityLog },
  ];

  const handleCustomerChange = (e) => {
    const inputValue = e.target.value;
    const obj = customers.find(function (item) {
      return item.name === inputValue;
    });
    if (!obj) {
      const newErrors = { ...errors };
      newErrors[e.target.name] = inputValue + " doest not exist in database.";
      setErrors(newErrors);
      dispatch(clientMoved());
    } else {
      const newErrors = { ...errors };
      newErrors[e.target.name] = undefined;
      setErrors(newErrors);
      dispatch(clientAdded(obj));
    }
  };

  return (
    <>
      {customerList && customerList.length >= 1 && (
        <DataList
          inputName={"customer"}
          data={customerList}
          dataListTitle={"Select a customer to begin this visit:"}
          onChange={handleCustomerChange}
          errorMessages={errors}
        />
      )}
      {!(customerList && customerList.length >= 1) && (
        <div className="alert alert-info">Customers data is loading...</div>
      )}

      <VisitBeginInfo
        visitStart={visitStart}
        onChange={(value) => setVisitStart(value)}
      />

      <Tabs tabData={tabData} user={user} visitStart={visitStart} />
    </>
  );
}

export default VisitCustomerForm;
