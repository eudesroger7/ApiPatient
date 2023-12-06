import {Entity, belongsTo, model, property} from '@loopback/repository';
import { Occupation } from './occupation.model';

@model({settings: {strict: true}})
export class Person extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 10,
      maxLength: 150,
      errorMessage: {
        minLength: 'O nome deve ter, no mínimo, 10 caracteres.',
        maxLength: 'O nome deve ter, no máximo, 150 caracteres.',
      },
    }
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  dateOfBirth: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 11,
      maxLength: 11,
      errorMessage: 'O CPF deve ter 11 caracteres.',
    }
  })
  cpf: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 11,
      maxLength: 11,
      errorMessage: 'O CPF deve ter 11 caracteres.',
    }
  })
  phone: string;

  @property({
    type: 'string',
    required: false,
    jsonSchema: {
      maxLength: 300,
      errorMessage: 'A observação deve ter, no máximo, 300 caracteres.',
    }
  })
  comments?: string;

  @property({
    type: 'date',
    default: () => new Date()
  })
  createdAt? : string;
  
  @property({
    type: 'date',
    default: () => new Date()
  })
  updatedAt? : string;

  @belongsTo(() => Occupation)
  occupationId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;
