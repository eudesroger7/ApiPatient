import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'apiPatient',
  connector: 'postgresql',
  url: 'postgres://postgres:12345678@localhost/apiPatient',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '12345678',
  database: 'apiPatient'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ApiPatientDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'apiPatient';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.apiPatient', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
