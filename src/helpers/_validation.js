/* eslint-disable prefer-regex-literals */
import Joi from 'joi';
import PassowordComplexity from 'joi-password-complexity';

const schemas = {
  signup: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .message('Please enter a valid email address'),
    password: new PassowordComplexity({
      min: 8,
      max: 25,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    }),
  }),
};

export default (schema, object) => schemas[schema].validate(object);
