const fs = require('graceful-fs')
const async = require('async')
const curry = require('lodash.curry')
const { prefix, moduleName } = require('./settings')

const updatePackageJson = function (newRegistry, folder, callback) {

    const packjson = folder + '/package.json'

    let packageJsonObject = require(packjson)
    if(packageJsonObject.publishConfig == undefined){
        packageJsonObject.publishConfig = {}
    }
    packageJsonObject.publishConfig[prefix + ":registry"] = newRegistry
    delete packageJsonObject.publishConfig.registry

    packageJsonObject.name = prefix + "/" + moduleName

    if(packageJsonObject.dependencies != undefined){
        array = ["angular-gettext", "bootstrap-datepicker", "cassets", "vanitils", "albillo-registration-ui", "alacarte", "angutils", "boards-registration", "bornetobe-ui", "bulot", "cleaningmap-ui", "dynamic-scheduler", "filio-ui", "pachavas-ui", "holysheets", "lookcoco", "oook-ui", "palettone-ui", "sales-ui", "walldo", "tocsin"]
        array.forEach(item => {
            if (packageJsonObject.dependencies[item]){
                packageJsonObject.dependencies[prefix + "/" + item] = packageJsonObject.dependencies[item]
                delete packageJsonObject.dependencies[item]
            }
        })
    }


    fs.writeFile(packjson, JSON.stringify(packageJsonObject), (err) => {
        if (err) return callback(err);
        callback(null, folder)
    })
}

module.exports = function update (newRegistry, folders) {

    let curried_updatePackageJson = curry(updatePackageJson)
    let series = folders.map((folder) => curried_updatePackageJson(newRegistry, folder))

    return new Promise((resolve, reject) => {
        async.series(
            series,
            (err, results) => {
                if (err) return reject(err);

                resolve(results)
            })
    })
}