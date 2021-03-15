const glob = require('glob-all');

// eslint-disable-next-line no-undef
describe('Checking generated css js files', () => {
    // eslint-disable-next-line no-undef
    it('should generated css js files', (done) => {
        const files = glob.sync([
            './dist/index_*.js',
            './dist/search_*.js',
            './dist/index_*.css',
            './dist/search_*.css',
        ]);
        if (files.length > 0) {
            done();
        } else {
            throw new Error('no generated css js files');
        }
    });
});
