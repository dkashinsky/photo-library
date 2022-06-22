import { QueryEngine } from "@comunica/query-sparql-rdfjs";
import { Store } from "n3";

export const store: Store = new Store();
export const queryEngine: QueryEngine = new QueryEngine();

export const queryAgeInterval = async (age: number): Promise<string | undefined> => {
  const ageRound = Math.round(age);
  const stream = await queryEngine.queryBindings(
    `
        PREFIX class: <URN:class:>
        PREFIX prop: <URN:prop:>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        SELECT ?interval ?label
        WHERE {
            ?interval a class:Interval;
                prop:hasMin ?minValue.
            FILTER ("${ageRound}"^^xsd:integer >= ?minValue)
            ?interval prop:hasMax ?maxValue.
            FILTER (?maxValue >= "${ageRound}"^^xsd:integer)
            ?kpi prop:hasInter ?interval;
                  rdfs:label ?label.
        }`, {
    sources: [store],
  });
  const bindings = await stream.toArray();

  return bindings[0]?.get('label')?.value;
};
