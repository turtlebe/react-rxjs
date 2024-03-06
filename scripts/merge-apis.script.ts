import { readYamlFileSync, writeYamlFileSync } from '@truckos/ts-yaml-files';

const apiDir = `${process.cwd()}/api/bundled`;

interface ApiDefinition {
  paths: { [key: string]: any };
  components: {
    schemas: { [key: string]: any };
    parameters: { [key: string]: any };
    securitySchemes: { [key: string]: any };
    requestBodies: { [key: string]: any };
    responses: { [key: string]: any };
    headers: { [key: string]: any };
    examples: { [key: string]: any };
    links: { [key: string]: any };
    callbacks: { [key: string]: any };
  };
}

function mergeSubComponents(
  addToComponent: { [key: string]: any },
  addFromComponent: { [key: string]: any },
  key: string,
  warnOnDuplicates = true
) {
  if (addFromComponent && addFromComponent[key]) {
    if (!addToComponent[key]) {
      addToComponent[key] = {}; //in case add-to doesn't have this section.
    }
    const addFrom = addFromComponent[key];
    const addTo = addToComponent[key];
    Object.keys(addFrom).forEach((subKey) => {
      if (addTo[subKey]) {
        //If they're identical, move on.
        if (JSON.stringify(addFrom[subKey]) != JSON.stringify(addTo[subKey])) {
          if (warnOnDuplicates) {
            console.warn(`${subKey} is duplicated. Using:\n`, addTo[subKey]);
          } else {
            throw new Error(`Duplicate [${key}.${subKey}]`);
          }
        }
      } else {
        // eslint-disable-next-line no-param-reassign
        addTo[subKey] = addFrom[subKey];
      }
    });
  }
}

function mergeApis(addTo: ApiDefinition, addFrom: ApiDefinition, warnOnDuplicates = true) {
  mergeSubComponents(addTo.components, addFrom.components, 'parameters', warnOnDuplicates);
  mergeSubComponents(addTo.components, addFrom.components, 'schemas', warnOnDuplicates);
  mergeSubComponents(addTo.components, addFrom.components, 'securitySchemes', warnOnDuplicates);
  mergeSubComponents(addTo.components, addFrom.components, 'requestBodies', warnOnDuplicates);
  mergeSubComponents(addTo.components, addFrom.components, 'responses', warnOnDuplicates);
  mergeSubComponents(addTo.components, addFrom.components, 'headers', warnOnDuplicates);
  mergeSubComponents(addTo.components, addFrom.components, 'examples', warnOnDuplicates);
  mergeSubComponents(addTo.components, addFrom.components, 'links', warnOnDuplicates);
  mergeSubComponents(addTo.components, addFrom.components, 'callbacks', warnOnDuplicates);
  mergeSubComponents(addTo, addFrom, 'paths', warnOnDuplicates);
}

const bffApi = readYamlFileSync(`${apiDir}/truckos-v1-api-bff.bundled.yml`);
const currentApi = readYamlFileSync(`${apiDir}/truckos-v1-api-current.bundled.yml`);

mergeApis(bffApi, currentApi);

writeYamlFileSync(`${apiDir}/truckos-v1-api.bundled.merged.yml`, bffApi);
