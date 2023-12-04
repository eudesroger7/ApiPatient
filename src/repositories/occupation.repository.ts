import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ApiPatientDataSource} from '../datasources';
import {Occupation, OccupationRelations, Person} from '../models';
import {PersonRepository} from './person.repository';

export class OccupationRepository extends DefaultCrudRepository<
  Occupation,
  typeof Occupation.prototype.id,
  OccupationRelations
> {

  public readonly people: HasManyRepositoryFactory<Person, typeof Occupation.prototype.id>;

  constructor(
    @inject('datasources.apiPatient') dataSource: ApiPatientDataSource, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>,
  ) {
    super(Occupation, dataSource);
    this.people = this.createHasManyRepositoryFactoryFor('people', personRepositoryGetter,);
    this.registerInclusionResolver('people', this.people.inclusionResolver);
  }
}
