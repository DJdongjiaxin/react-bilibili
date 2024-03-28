import * as React from "react";
import { Helmet } from "react-helmet";
import storage, { ViewHistory } from "../../util/storage";
import { formatDate } from "../../util/datetime";

import tips from "../../assets/images/nocontent.png";
import style from "./history.styl?css-modules";
import { getVideo } from "../../api/video";



const getDateKey = (timestamp) => {
  const currentTime = new Date();
  const dateTime = new Date(timestamp);
  if (currentTime.getFullYear() === dateTime.getFullYear() &&
    currentTime.getMonth() === dateTime.getMonth()) {
    const diffDate = currentTime.getDate() - dateTime.getDate();
    switch (diffDate) {
      case 0:
        return "今天";
      case 1:
        return "昨天";
      case 2:
        return "前天";
      default:
        return "更早";
    }
  } else {
    return "更早";
  }
}

const getTime = (timestamp) => {
  const currentTime = new Date();
  const dateTime = new Date(timestamp);
  if (currentTime.getFullYear() === dateTime.getFullYear() &&
    currentTime.getMonth() === dateTime.getMonth()) {
    const diffDate = currentTime.getDate() - dateTime.getDate();
    switch (diffDate) {
      case 0:
        return "今天 " + formatDate(dateTime, "hh:mm");
      case 1:
        return "昨天 " + formatDate(dateTime, "hh:mm");
      case 2:
        return "前天 " + formatDate(dateTime, "hh:mm");
      default:
        return formatDate(dateTime, "yyyy-MM-dd hh:mm");
    }
  } else {
    return formatDate(dateTime, "yyyy-MM-dd hh:mm");
  }
}

interface HistoryState {
  itemIndex: number;
  histories: Array<[string, ViewHistory[]]>;
  userRole: number;
  videoList: any;
}

class History extends React.Component<null, HistoryState> {
  constructor(props) {
    super(props);

    this.state = {
      itemIndex: 0,
      histories: [],
      userRole: 0,
      videoList: []
    }
  }
  public componentDidMount() {
    const eyeUser = localStorage.getItem("eyeUser");

    if (eyeUser) {
      const userData = JSON.parse(eyeUser);
      this.setState({ userRole: userData[0].role });

      getVideo(userData[0].number).then((result) => {
        console.log(JSON.stringify(result) + "####");
        if (result.code === 0) {
          console.log(JSON.stringify(result.data));
          localStorage.getItem('eyeUser');
          this.setState({ videoList: result.data })
        }
      });
    }
    const viewHistories = storage.getViewHistory();
    // 按点击时间降序
    viewHistories.sort((a, b) => b.viewAt - a.viewAt);

    // 按时间点（今天，昨天，更早）分组
    const historyMap: Map<string, ViewHistory[]> = new Map();
    viewHistories.forEach((history) => {
      const key = getDateKey(history.viewAt);
      let histories = historyMap.get(key);
      if (histories) {
        histories.push(history);
      } else {
        histories = new Array();
        histories.push(history);
        historyMap.set(key, histories);
      }
    });
    this.setState({
      histories: [...historyMap]  // 转换成Array [[key, value], [key, value]]
    });

  }
  public render() {
    const isAdmin = this.state.userRole === 2;
    return (
      <div className="history">
        <Helmet>
          <title>个人空间</title>
        </Helmet>
        <div className={style.tabWrapper}>
          <div className={style.tabItem + (this.state.itemIndex === 0 ? " " + style.current : "")}
            onClick={() => { this.setState({ itemIndex: 0 }) }}>
            <span>历史记录</span>
          </div>
          <div className={style.tabItem + (this.state.itemIndex === 1 ? " " + style.current : "")}
            onClick={() => { this.setState({ itemIndex: 1 }) }}>
            <span>我的投稿</span>
          </div>
          {isAdmin && (
            <div
              className={style.tabItem + (this.state.itemIndex === 2 ? " " + style.current : "")}
              onClick={() => {
                this.setState({ itemIndex: 2 });
              }}
            >
              <span>平台管理</span>
            </div>
          )}
        </div>
        <div className={style.history} style={{ display: this.state.itemIndex === 0 ? "block" : "none" }}>
          {
            this.state.histories.map((item, i) => (
              <div className={style.historyItem} key={i}>
                <div className={style.itemTitle}>{item[0]}</div>
                {
                  item[1].map((history) => (
                    <div className={style.itemWrapper} key={history.aId}>
                      <a href={"/video/av" + history.aId}>
                        <div className={style.imgContainer}>
                          <img src={history.pic} />
                        </div>
                        <div className={style.info}>
                          <div className={style.title}>{history.title}</div>
                          <div className={style.time}>{getTime(history.viewAt)}</div>
                        </div>
                      </a>
                    </div>
                  ))
                }
              </div>
            ))
          }
          {
            this.state.histories.length === 0 ? (
              <div className={style.tips}>
                <img src={tips} />
                <div className={style.text}>你还没有历史记录</div>
                <div className={style.text}>快去发现&nbsp;<a href="/index">新内容</a>&nbsp;吧！</div>
              </div>
            ) : null
          }

        </div>
        <div className={style.history} style={{ display: this.state.itemIndex === 1 ? "block" : "none" }}>
          {
            this.state.videoList.map((item, i) => (
              <div className={style.historyItem} key={i}>
                <div className={style.itemTitle}>{item.videoname}</div>
                    <div className={style.itemWrapper}>
                      <a href={"/video?"+item.id}>
                        <div className={style.imgContainer}>
                          <img src={`http://localhost:3011/${item.cover_image}`} />
                        </div>
                        <div className={style.info}>
                          <div className={style.title}>{item.description}</div>
                          {/* <div className={style.time}>{getTime(history.viewAt)}</div> */}
                        </div>
                      </a>
                    </div>
              </div>
            ))
          }
          {
            this.state.videoList.length === 0 ? (
              <div className={style.tips}>
                <img src={tips} />
                <div className={style.text}>{JSON.stringify(this.state.videoList)}~</div>
              </div>
            ) : null
          }

        </div>
        {isAdmin && (
          <div
            style={{ display: this.state.itemIndex === 2 ? "block" : "none" }}
            className={style.platformManagement}
          >
            <div className={style.managementItem}>
              <span>用户管理</span>
            </div>
            <div className={style.managementItem}>
              <span>视频管理</span>
            </div>
            <div className={style.managementItem}>
              <span>评论管理</span>
            </div>
            <div className={style.managementItem}>
              <span>查看反馈信息</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default History;
