module.exports = {
    name: '',
    paths: {
        src: {
            base: "../src/",
            css: "../src/css/",
            js: "../src/js/"
        },
        dist: {
            base: "../public/dist/"
        },
        templates: "../templates/"
    },
    urls: {
        live: "https://example.com/",
        local: "http://example.test/",
        critical: "http://example.test/",
        publicPath: () => process.env.PUBLIC_PATH || "/dist/",
    },
    devServer: {
        host: "localhost",
        port: "8080",
        https: false
    },
    manifest: {
        fileName: 'manifest.json',
        basePath: ""
    }
}