import { DatePicker } from "antd";
import { formatDate } from "../../utils";
import axios from "axios";
import "./index.css";
import { useContext } from "react";
import { DataContext } from "../../store";
import { initialData, urlProd } from "../../constants";
const SearchRecordInput = ({ setLoading, loading }) => {
  const { updateStore, updateDate } = useContext(DataContext);
  const onChange = (date, dateString) => {
    updateStore(initialData);
    const tempDate = formatDate(dateString);
    if (tempDate) {
      axios
        .get(`${urlProd}/shiftdata/${tempDate}`)
        .then((res) => {
          if (res.status === 200) {
            updateStore(res.data);
          }
          if (res.status === 201) {
            updateDate(tempDate);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(true);
    }
  };
  return (
    <div className="search-record-container">
      <span style={{ fontSize: "16px", fontWeight: "500" }}>Enter Date : </span>
      <DatePicker
        onChange={onChange}
        size={"large"}
        style={{ margin: "10px" }}
      />
    </div>
  );
};
export default SearchRecordInput;
