import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Occupation} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Occupation,
  pattern: 'CrudRest',
  dataSource: 'apiPatient',
  basePath: '/occupations',
  readonly: false,
};
module.exports = config;
