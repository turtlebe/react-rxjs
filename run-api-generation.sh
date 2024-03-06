#!/bin/bash


generateApi() {
  API_LABEL=${1}

  if [ -n "${API_LABEL}" ]
  then
    SOURCE_FILE=api/truckos-v1-api-${API_LABEL}.yml
    BUNDLED_FILE=api/bundled/truckos-v1-api-${API_LABEL}.bundled.yml
    OUTPUT_FILE=src/__generated__/truckos-api-${API_LABEL}.ts
  else
    SOURCE_FILE=api/truckos-v1-api-current.yml
    BUNDLED_FILE=api/bundled/truckos-v1-api-current.bundled.yml
    OUTPUT_FILE=src/__generated__/truckos-api.ts
  fi


  echo Label[${API_LABEL}] source[${SOURCE_FILE}] bundle[${BUNDLED_FILE}] out[${OUTPUT_FILE}]

  #Clean
  rm -rf ${BUNDLED_FILE} ${OUTPUT_FILE}

  #Validate
  swagger-cli validate ${SOURCE_FILE}

  #Bundle
  swagger-cli bundle ${SOURCE_FILE} --type yaml --outfile ${BUNDLED_FILE}

  #Generate
  openapi-typescript --alphabetize ${BUNDLED_FILE} --output ${OUTPUT_FILE}

  #Lint
  eslint --fix --no-eslintrc --config ./eslintrc-for-generated.json ${OUTPUT_FILE}
  prettier-eslint --write ${OUTPUT_FILE}
}

generateApi
generateApi bff
