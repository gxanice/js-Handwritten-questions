function ajaxPromise(url, method, data) {
    return new Promise((resolve, reject) => {
        // 1.创建XMLHttpRequest对象
        const xhr = new XMLHttpRequest();

        // 2.与服务器建立连接
        xhr.open(method, url, true);

        // 3.给服务器发送数据
        xhr.send(method === "POST" && data ? JSON.stringify(data) : null);

        // 4.接收请求
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject(this.status);
                }
            }
        });
    });
}

ajaxPromise("GET", "https://dog.ceo/api/breeds/image/random")
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });