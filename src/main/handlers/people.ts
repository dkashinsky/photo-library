import { Person } from '../db';

const getPersonDTO = (person: Person) => ({
  id: person.id,
  name: person.name,
});

export const getPeople = async () => {
  const people = await Person.findAll();

  return people.map(getPersonDTO);
};
