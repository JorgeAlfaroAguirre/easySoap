const http = require("http");
const fs = require("fs");
const { soap } = require("strong-soap");

const service = {
  HelloService: {
    HelloPort: {
      sayHello: function (args) {
        const name = args?.name?.$value || "Nombre";
        const lastname = args?.lastname?.$value || "Apellido";
        const age = args?.age?.$value || 0;
        const email = args?.email?.$value || "sincorreo@ejemplo.com";
        const country = args?.country?.$value || "Pais desconocido";

        return {
          name,
          lastname,
          age,
          email,
          country,
        };
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
