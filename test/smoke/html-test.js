const glob = require('glob-all');

// eslint-disable-next-line no-undef
describe('Checking generated html files', () => {
    // eslint-disable-next-line no-undef
    it('should generated html files', (done) => {
        const files = glob.sync([
            './dist/index.html',
            './dist/search.html',
        ]);
        if (files.length > 0) {
            done();
        } else {
            throw new Error('no generated html files');
        }
    });
});
