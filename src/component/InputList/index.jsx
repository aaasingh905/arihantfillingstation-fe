import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import CustomTextField from "../CustomTextField";
import { DataContext } from "../../store";

function InputList({ type, total, shift, machine }) {
  const [listItem, setListItem] = useState(0);
  const { data, updateData } = useContext(DataContext);
  const list = data?.[shift]?.[machine]?.[`list${type}`];
  const handleKeyPressEvent = (event) => {
    if (event.key === "Enter") {
      updateData(shift, machine, `list${type}`, [
        ...list,
        parseFloat(event?.target?.value),
      ]);
      setListItem(0);
    }
  };
  useEffect(() => {
    const sum = list.reduce((partialSum, a) => partialSum + a, 0);
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
        {list.map((ele, index) => {
          return (
            <li key={`${ele} - ${index}`}>
              <span style={{ fontWeight: "600", padding: "6px" }}>{ele}</span>
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
  }, [clearListItem, list]);
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

export default InputList;
