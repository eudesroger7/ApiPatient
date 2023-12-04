import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Person,
  Occupation,
} from '../models';
import {PersonRepository} from '../repositories';

export class PersonOccupationController {
  constructor(
    @repository(PersonRepository)
    public personRepository: PersonRepository,
  ) { }

  @get('/people/{id}/occupation', {
    responses: {
      '200': {
        description: 'Occupation belonging to Person',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Occupation),
          },
        },
      },
    },
  })
  async getOccupation(
    @param.path.number('id') id: typeof Person.prototype.id,
  ): Promise<Occupation> {
    return this.personRepository.occupation(id);
  }
}
