import * as React from "react";

import { RouteComponentProps } from 'react-router-dom';
import style from './adminManagement.styl?css-modules';

interface AdminManagementProps extends RouteComponentProps<{ type: string }> {
  type: 'users' | 'comments' | 'videos' | 'feedback';
}

const AdminManagement: React.FC<AdminManagementProps> = (props) => {
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [type, setType] = React.useState('');

  React.useEffect(() => {
    if (props.match.params.type) {
      setType(props.match.params.type);
    }
  }, [props.match.params.type]);

  React.useEffect(() => {
    const fetchData = async () => {
      const dummyData = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
      ];
      setData(dummyData);
      setFilteredData(dummyData);
    };

    fetchData();
  }, [type]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  React.useEffect(() => {
    const newFilteredData = data.filter((item) =>
      Object.keys(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredData(newFilteredData);
  }, [search, data]);

  if (!type) {
    return null;
  }

  return (
    <div className={style.container}>
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Management</h2>
    <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
        className={style.search}
      />
    <table className={style.table}>
      <thead>
          <tr>
            {Object.keys(data[0] || {}).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
      <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {Object.keys(data[0] || {}).map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
              <td>
              <button className={style.delete}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManagement;