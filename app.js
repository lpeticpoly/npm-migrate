const migrate = require('./npm-migrate')
const { moduleName } = require('./settings')

const from = 'https://npm.polydev.blue'
const to = 'https://gitlab.polyconseil.fr/api/v4/projects/720/packages/npm/'
 
// optional
const options = {
    debug: true
}


migrate(moduleName, from, to, options)
    .then((migrated) => console.log(migrated)) // list of migrated packages
    .catch((err) => console.error(err))
 