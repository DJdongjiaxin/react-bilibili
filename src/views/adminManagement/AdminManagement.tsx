import * as React from "react";

import { RouteComponentProps } from 'react-router-dom';
import style from './adminManagement.styl?css-modules';
import { getUsers, getComments, getVideos, getFeedback, delComment, delFeedback, delUser, delVideo, editRole } from "../../api/up-user";

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
      if (type == "users") {
        getUsers().then((result) => {
          console.log(JSON.stringify(result.list) + "####");
          setData(result.list);
          setFilteredData(result.list);
        });
      } else if (type == "comments") {
        getComments().then((result) => {
          console.log(JSON.stringify(result.list) + "####");
          setData(result.list);
          setFilteredData(result.list);
        });
      } else if (type == "videos") {
        getVideos().then((result) => {
          console.log(JSON.stringify(result.list) + "####");
          setData(result.list);
          setFilteredData(result.list);

        });
      } else if (type == "feedback") {
        getFeedback().then((result) => {
          console.log(JSON.stringify(result.list) + "####");
          setData(result.list);
          setFilteredData(result.list);
        });
      }
    };
    console.log(type);

    fetchData();
  }, [type]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  React.useEffect(() => {
    const newFilteredData = data.filter((item) =>
      Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredData(newFilteredData);
  }, [search, data]);

  if (!type) {
    return null;
  }
  const handleDelete = (id) => {
    console.log(id);
    if (type == "users") {
      delUser(id).then((result) => {
        console.log(JSON.stringify(result.list) + "####");
        window.location.reload();
      });
    } else if (type == "comments") {
      delComment(id).then((result) => {
        console.log(JSON.stringify(result.list) + "####");
        window.location.reload();
      });
    } else if (type == "videos") {
      delVideo(id).then((result) => {
        console.log(JSON.stringify(result.list) + "####");
        window.location.reload();
      });
    } else if (type == "feedback") {
      delFeedback(id).then((result) => {
        console.log(JSON.stringify(result.list) + "####");
        window.location.reload();
      });
    }

  }
  const handleEdit = (role, id) => {
    editRole(role, id).then((result)=>{
      console.log(result);
      window.location.reload();
    })
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
      {
        data.length > 0 && (
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
                    <button className={style.delete}
                      onClick={() => {
                        if (type == "comments") {
                          handleDelete(item.cid)
                        } else if (type == "feedback") {
                          handleDelete(item.fid)
                        } else {
                          handleDelete(item.id)
                        }

                      }}>删除</button>
                    {
                      type == "users" && (
                        <button className={style.edit}
                          onClick={() => {
                            if (item.role ===1) {
                              handleEdit(2, item.id)
                            } else {
                              handleEdit(1, item.id)
                            }

                          }}
                        >修改</button>
                      )
                    }

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }

    </div>
  );
};

export default AdminManagement;