import * as Joi from '@hapi/joi';

export const configSchema = Joi.object({
    //App
    NODE_ENV: Joi.string().valid('development', 'stage', 'production').required(),
    PORT: Joi.number().required(),
    //DB
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required()
});