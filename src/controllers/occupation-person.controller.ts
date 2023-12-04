import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Occupation,
  Person,
} from '../models';
import {OccupationRepository} from '../repositories';

export class OccupationPersonController {
  constructor(
    @repository(OccupationRepository) protected occupationRepository: OccupationRepository,
  ) { }

  @get('/occupations/{id}/people', {
    responses: {
      '200': {
        description: 'Array of Occupation has many Person',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Person>,
  ): Promise<Person[]> {
    return this.occupationRepository.people(id).find(filter);
  }

  @post('/occupations/{id}/people', {
    responses: {
      '200': {
        description: 'Occupation model instance',
        content: {'application/json': {schema: getModelSchemaRef(Person)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Occupation.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {
            title: 'NewPersonInOccupation',
            exclude: ['id'],
            optional: ['occupationId']
          }),
        },
      },
    }) person: Omit<Person, 'id'>,
  ): Promise<Person> {
    return this.occupationRepository.people(id).create(person);
  }

  @patch('/occupations/{id}/people', {
    responses: {
      '200': {
        description: 'Occupation.Person PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {partial: true}),
        },
      },
    })
    person: Partial<Person>,
    @param.query.object('where', getWhereSchemaFor(Person)) where?: Where<Person>,
  ): Promise<Count> {
    return this.occupationRepository.people(id).patch(person, where);
  }

  @del('/occupations/{id}/people', {
    responses: {
      '200': {
        description: 'Occupation.Person DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Person)) where?: Where<Person>,
  ): Promise<Count> {
    return this.occupationRepository.people(id).delete(where);
  }
}
