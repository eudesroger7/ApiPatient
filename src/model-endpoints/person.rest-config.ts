import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Person} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Person,
  pattern: 'CrudRest',
  dataSource: 'apiPatient',
  basePath: '/people',
  readonly: false,
};
module.exports = config;
