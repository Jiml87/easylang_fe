module.exports = function makeEnvVariablesAsPublic(variables) {
  variables.forEach((variableName) => {
    process.env['NEXT_PUBLIC_' + variableName] = process.env[variableName];
  });
};
