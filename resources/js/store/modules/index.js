import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

/**
 * Automatically imports all the modules and exports as a single module object
 */
const requireModule = require.context('.', false,  /\.js$/);
const modules = {};

requireModule.keys().forEach(filename => {

    // create the module name from fileName

    const moduleName = camelCase(filename.replace(/^\.\//, '').replace(/\.\w+$/, ''))

    modules[moduleName] = requireModule(filename).default || requireModule(filename);
});

export default modules;
