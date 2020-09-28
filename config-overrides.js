const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')

module.exports = (config, env) => {
    // This prevents `jspdf` from throwing useless errors during the build process
    config.plugins.push(
        new FilterWarningsPlugin({
            exclude: /Critical dependency: the request of a dependency is an expression/,
        })
    )
    return config;
}
