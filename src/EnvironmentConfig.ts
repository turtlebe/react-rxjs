const CONFIG_URL = '/config/config.json';

export async function getEnvironmentConfig() {
  return fetch(CONFIG_URL).then((response) => response.json());
}
