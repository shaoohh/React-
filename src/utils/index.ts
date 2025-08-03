export const delay = (successRate: number = 50, ms: number = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const num = Math.random() * 100;
      if (num < successRate) {
        resolve(true);
      } else {
        reject(new Error("Promise 失败"));
      }
    }, ms);
  });
};
