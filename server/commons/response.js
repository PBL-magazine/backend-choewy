'use strict';

const defaults = {
  success: (data = undefined) => ({ ok: true, ...data }),
  error: (data = undefined) => ({ ok: false, ...data }),
};

const Response = {
  Success: {
    Created: (res, data = undefined) => {
      return res.status(201).send(defaults.success(data));
    },
    Ok: (res, data = undefined) => {
      return res.status(200).send(defaults.success(data));
    },
  },
  Fails: (res, error) => {
    const { code, message } = error;
    const data = message ? { message } : { error };
    return res.status(code ? code : 500).send(defaults.error(data));
  },
  Validation: (res, error) => {
    const { details } = error;
    const data = { message: details[0].message };
    return res.status(400).send(defaults.error(data));
  },
};

module.exports = Response;
