const { Schema } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const ObjectId = Schema.ObjectId;

const FirstSchema = new Schema({
  other: {
    type: ObjectId,
    ref: 'Other',
  },
  
}, {
  collection: 'first',
  timestamps: true,
});

FirstSchema.plugin(mongooseDelete, { indexFields: true, overrideMethods: true });

module.exports = FirstSchema;
