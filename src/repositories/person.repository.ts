import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ApiPatientDataSource} from '../datasources';
import {Person, PersonRelations, Occupation} from '../models';
import {OccupationRepository} from './occupation.repository';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {

  public readonly occupation: BelongsToAccessor<Occupation, typeof Person.prototype.id>;

  constructor(
    @inject('datasources.apiPatient') dataSource: ApiPatientDataSource, @repository.getter('OccupationRepository') protected occupationRepositoryGetter: Getter<OccupationRepository>,
  ) {
    super(Person, dataSource);
    this.occupation = this.createBelongsToAccessorFor('occupation', occupationRepositoryGetter,);
    this.registerInclusionResolver('occupation', this.occupation.inclusionResolver);
  }
}
