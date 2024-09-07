import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import CustomTextField from "../CustomTextField";
import { DataContext } from "../../store";

function InputListWithDetails({ type, total, shift, machine }) {
  // const [list, setList] = useState([]);
  const { data, updateData } = useContext(DataContext);
  const list = data?.[shift]?.[machine]?.[`list${type}`];
  const [listItem, setListItem] = useState(0);
  const [comment, setComment] = useState("");
  const handleKeyPressEvent = (event) => {
    if (event.key === "Enter" && listItem > 0 && comment) {
      updateData(shift, machine, `list${type}`, [
        ...list,
        { item: parseFloat(listItem), comment: comment },
      ]);
      setListItem(0);
      setComment("");
    }
  };
  useEffect(() => {
    let sum = 0;
    list.forEach(({ item }) => {
      sum = sum + item;
    });
    updateData(shift, machine, `total${type}`, sum);
  }, [list]);
  const clearListItem = useCallback(
    (ind) => {
      const tempList = [...list];
      tempList.splice(ind, 1);
      updateData(shift, machine, `list${type}`, tempList);
    },
    [list]
  );
  const listUI = useMemo(() => {
    return (
      <ul className="list-ui-container">
        {list.map(({ item, comment }, index) => {
          return (
            <li key={`${item} - ${index}`}>
              <span
                style={{ fontWeight: "600", padding: "6px" }}
              >{`${item} - ${comment}`}</span>
              <button
                style={{
                  padding: "8px",
                  border: "none",
                  background: "#023047",
                  borderTopRightRadius: "12px",
                  borderBottomRightRadius: "12px",
                  color: "#fff",
                  fontWeight: "600",
                }}
                onClick={() => {
                  clearListItem(index);
                }}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    );
  }, [list]);
  return (
    <div className="list-main">
      <div className="list-container">
        <CustomTextField
          required
          id="list-input"
          label={`Enter ${type} list`}
          value={listItem}
          onChange={(e) => {
            setListItem(parseFloat(e?.target?.value));
          }}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <CustomTextField
          required
          id="list-input"
          label={`Enter Name`}
          value={comment}
          onChange={(e) => {
            setComment(e?.target?.value);
          }}
          onKeyUp={(event) => {
            handleKeyPressEvent(event);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* <span className="list-header">{`${type} Total : ${total}`}</span> */}
      </div>
      {listUI}
    </div>
  );
}

export default InputListWithDetails;
