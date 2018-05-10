const { expect } = require('chai');
require('mocha');
const { buildSchema } = require('./helpers');

describe('Stack overflow test', () => {
    let schema;
    beforeEach(() => buildSchema().then((s) => {
        schema = s;
    }));
    it('should not stack overflow', async () => {
        let errorThrown = null;
        const other = new schema.Other({
            name: 'test',
            subothers: [],
            parentObj: null,
            subParentObj: null,
            subSubParentObj: null,
        });
        await other.save();
        const first = new schema.First({
            other: other._id
        });
        await first.save();
        let firstFromDB = null;
        try {
            const POPULATE_REQUEST_FIELDS = [
                { path: 'other' },
                ];
                firstFromDB = await schema.First.findOne({}).populate(POPULATE_REQUEST_FIELDS);
        } catch (e) {
            errorThrown = e;
        }
        expect(errorThrown).to.not.exist;
        expect(firstFromDB).to.exist;
    });
});
