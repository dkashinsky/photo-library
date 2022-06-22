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

export const getIntervalThreshold = async (ageCategory: string): Promise<number | undefined> => {
  const stream = await queryEngine.queryBindings(
    `
        PREFIX prop: <URN:prop:>
        PREFIX ind: <URN:inds:>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        SELECT ?threshold
        WHERE {
          ?kpi prop:kpi ind:proc0;
               rdfs:label "${ageCategory}";
               prop:recognitionThreshold ?threshold.
      }`, {
    sources: [store],
  });
  const bindings = await stream.toArray();
  const threshold = bindings[0]?.get('threshold')?.value;

  return typeof threshold !== 'undefined'
    ? parseFloat(threshold)
    : undefined;
};


export const updateIntervalThreshold = async (ageCategory: string, threshold: number): Promise<void> => {
  const storeSize = store.size;

  await queryEngine.queryVoid(
    `
        PREFIX class: <URN:class:>
        PREFIX prop: <URN:prop:>
        PREFIX ind: <URN:inds:>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        DELETE { ?kpi prop:recognitionThreshold ?threshold }
        INSERT { ?kpi prop:recognitionThreshold "${threshold}"^^xsd:decimal }
        WHERE {
            ?kpi prop:kpi ind:proc0;
                 rdfs:label "${ageCategory}".
            OPTIONAL { ?kpi prop:recognitionThreshold ?threshold }
        }`, {
    sources: [store],
  });

  console.log('kb size before update:', storeSize);
  console.log('kb size after update:', store.size);
};
