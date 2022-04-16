'use strict';

const CustomErrors = {
  Database: (error) => {
    throw {
      code: 500,
      data: {
        ok: false,
        message: error.parent.sqlMessage,
      },
    };
  },
  Response: (response, error) => {
    const { code, data } = error;
    if (!code) return response.status(500).send({ error });
    return response.status(code).send(data);
  },
};

module.exports = CustomErrors;
