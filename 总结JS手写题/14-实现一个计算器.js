const promiseAll = (array) => {
  if (!Array.isArray(array)) {
    throw new Error("要传入数组");
  }
  return new Promise((resolve, reject) => {
    let result = [];
    let count = 0;
    array.forEach((item, index) => {
      if (item instanceof Promise) {
        item.then(
          (res) => {
            result[index] = res;
            count++;
            if (count == array.length) {
              return resolve(result);
            }
          },
          (err) => reject(err)
        );
      } else {
        result[index] = item;
        count++;
        if (count == array.length) {
          return resolve(result);
        }
      }
    });
  });
};

let p1 = new Promise((res, err) => {
  setTimeout(() => {
    res(100);
  }, 3000);
});

let p2 = new Promise((res, err) => {
  setTimeout(() => {
    res(200);
  }, 2000);
});

let p3 = new Promise((res, err) => {
  setTimeout(() => {
    res(300);
  }, 5000);
});

promiseAll([p1, p2, p3]).then(
  (res) => console.log(res),
  (err) => console.log(err)
);
