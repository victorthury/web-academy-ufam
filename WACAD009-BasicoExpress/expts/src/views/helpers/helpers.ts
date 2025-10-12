import { Technologies } from './helpersTypes';

function listTechnologies(technologies: Technologies[]) {
  const list = technologies
    .filter(({ poweredByNodejs }) => poweredByNodejs)
    .map(({ name, type }) => `<li>${name} - ${type}</li>`);
  return `<ul>${list.join('')}</ul>`;
}

export default { listTechnologies };
