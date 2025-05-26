const projectsElem = document.querySelector('#projects');
const form = document.querySelector('form');
const emailElem = document.querySelector('#contact-email');
const errMessage = document.querySelector('.error-message'); 

// link para o gist json com a lista de projetos 
const file = 'https://gist.githubusercontent.com/olwr/9f1a920de672fbc1147dbac963f6eb2a/raw/bbeda3ce6662b04175734dfc602d7cdc3f9bfac3/projects';

const loadProjects = async () => {
  // Retorna o array de projetos em forma de objeto
  try {
    const response = await fetch(file);
    return await response.json();
  } catch (e) {
    console.error("Erro ao carregar projetos:", e);
    return null;
  }
};

const renderStacks = (stacks) => {
  // retorna o html da lista de stacks do projeto
  let ul = `<ul class="project-stacks">`;

  for (let i = 0; i < stacks.length; i++) {
    const [stack, color] = stacks[i];
    ul += `<li class="stack-item" style="background: ${color};">${stack}</li>`;
  }

  ul.innerHTML += `</ul>`
  return ul;
}

const renderProjects = () => {
  // adiciona os projetos de forma dinâmica no html (renderiza os projetos)
  projectsElem.innerHTML = '<h2 class="work-title">Projetos</h2>';

  loadProjects().then(projects => {
    if (projects) {
      projects.forEach(project => {

        projectsElem.innerHTML +=
          `
          <div class="project">

          <a href="${project.link}" class="project-link-img" target="_blank">
          <img src="/src/assets/${project.image}" class="project-img" alt="print do projeto ${project.name}" />
          </a>

          <div class="project-details">
          <h3 class="project-name">
          <a href="${project.link}" target="_blank" class="project-link-h3" rel="noopener noreferrer">${project.name}</a>
          </h3>
          
          <h4 class="project-type">${project.type}</h4>
          
          ${renderStacks(project.stacks)}
          </div>
          </div>
          `;
      });
    }
  });
}

const validateEmail = () => {
  // simplificação de regex que aceita a maioria dos endereços de e-mail válidos
  const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  return regex.test(emailElem.value);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const validate = validateEmail();
  console.log(validate);

  if (!validate) {
    errMessage.classList.remove('hidden');
  }

  if (validate) {
    errMessage.classList.add('hidden');
  }
})

renderProjects();