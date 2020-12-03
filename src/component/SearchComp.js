import { Input } from "antd";
import { searchPatient } from "../api/doctor";

const { Search } = Input;

const SearchComp = () => {
  const onSearchSubmit = (data, e) => {
    searchPatient({ data });
  };

  return (
    <div style={{ width: "600px" }}>
      <Search
        placeholder="input search text"
        size="large"
        // loading
        enterButton="Search"
        onSearch={(value, event) => onSearchSubmit(value, event)}
      />
    </div>
  );
};

export default SearchComp;
