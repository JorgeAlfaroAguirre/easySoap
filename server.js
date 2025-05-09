const http = require("http");
const fs = require("fs");
const { soap } = require("strong-soap");

const service = {
  HelloService: {
    HelloPort: {
      sayHello: function (args) {
        const name = args.name || "Mundo";
        return { message: `Hola, ${name}` };
      },
    },
  },
};

const wsdl = fs.readFileSync("./easySoap.wsdl", "utf8");

const server = http.createServer(function (req, res) {
  res.statusCode = 404;
  res.end("404: Not Found");
});

server.listen(8001, function () {
  console.log("SOAP server listening on http://localhost:8001/wsdl");
  soap.listen(server, "/wsdl", service, wsdl);
});
