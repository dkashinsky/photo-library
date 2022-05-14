import { Person } from '../db';

const getPersonDTO = (person: Person) => ({
  id: person.id,
  name: person.name,
});

export const getPeople = async () => {
  const people = await Person.findAll();

  return people.map(getPersonDTO);
};

export const getPerson = async (personId: string) => {
  const person = await Person.findByPk(personId, { rejectOnEmpty: true });

  return getPersonDTO(person);
};


export const addPerson = async (name: string) => {
  const person = await Person.create({ name });

  return getPersonDTO(person);
};
