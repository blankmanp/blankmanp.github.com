const Bundler = require("parcel-bundler");
const Path = require("path");

const file = Path.join(__dirname, './src/index.html');

const options = {
    outFile: 'index',
    publicUrl: "./",
    watch: false,
    sourceMaps: false
}

const bundler = new Bundler(file, options);

bundler.bundle();

bundler.on('bundled', bundle => {
    console.log('===== bundle success =====');
});
bundler.on('buildEnd', () => {
    console.log('===== build end =====');
});