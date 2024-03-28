import fetch from "cross-fetch";

export function getJSON(url: string, data) {
  let param = "";
  if (data) {
    const datas = [];
    for (const k in data) {
      if (k) {
        datas.push(`${k}=${data[k]}`);
      }
    }
    if (datas.length > 0) {
      param = "?" + datas.join("&");
    }
  }
  console.log(param+"%%%%%%%");
  
  return fetch(url + param)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
}

export function postJSON(url: string, data) {
  let headers = {};

  if (data instanceof FormData) {
    console.log("data is formData");
    
  } else {
    headers = {
      "Content-Type": "application/json; charset=utf-8"
    };
    data = JSON.stringify(data);
  }

  return fetch(url, {
    method: "post",
    body: data,
    headers: headers
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });
}
