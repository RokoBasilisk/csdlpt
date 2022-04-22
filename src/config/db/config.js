const configsv1 = {
  user: "sa",
  password: "123456",
  server: "localhost",
  database: "QL_TRAICAY",
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
    enableArithAbort: true,
    instancename: "QL_TRAICAY_VN",
  },
  port: 2433,
};

const configsv2 = {
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

const configsv3 = {
  user: "sa",
  password: "123456",
  server: "localhost",
  database: "QL_TRAICAY",
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
    enableArithAbort: true,
    instancename: "QL_TRAICAY_CENT",
  },
  port: 1532,
};

module.exports = { configsv1, configsv2, configsv3 };
