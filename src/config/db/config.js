const config = {
  user: "sa",
  password: "123456",
  server: "localhost",
  database: "QL_TRAICAY",
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
    enableArithAbort: true,
    instancename: "QL_TRAICAY_NORTH",
  },
  port: 1433,
};

module.exports = config;
