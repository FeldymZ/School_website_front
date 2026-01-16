module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Créer un composant React',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nom du composant (ex: TopBar) ?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
      },
    ],
  });
};
