const { Schema } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const { ObjectId } = Schema;

const RetentionSchema = new Schema({
  days: Number,
  hours: Number,
  minutes: Number,
}, { _id: false });

const OtherSchema = new Schema({
  name: String,
  retention: {
    type: RetentionSchema,
    default: {
      days: 2555, // 7 x 365 (7 years)
      hours: 0,
      minutes: 0,
    },
  },
  subothers: [{ type: ObjectId, ref: 'Other' }],
  parentObj: { type: ObjectId, ref: 'Other' },
  subParentObj: { type: ObjectId, ref: 'Other' },
  subSubParentObj: { type: ObjectId, ref: 'Other' },
}, {
  collection: 'otherSchema',
  timestamps: true,
});

OtherSchema.plugin(mongooseDelete, { indexFields: true, overrideMethods: true });



module.exports = OtherSchema;
