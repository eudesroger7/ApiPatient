import {Entity, model, property, hasMany} from '@loopback/repository';
import {Person} from './person.model';

@model({settings: {strict: true}})
export class Occupation extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Person)
  people: Person[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Occupation>) {
    super(data);
  }
}

export interface OccupationRelations {
  // describe navigational properties here
}

export type OccupationWithRelations = Occupation & OccupationRelations;
