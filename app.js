import http from "http";
import fs from "fs";
import qs from "querystring";

const server = http.createServer((req, res) => {});

//8000번 포트 사용
PORT = 8000;
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
