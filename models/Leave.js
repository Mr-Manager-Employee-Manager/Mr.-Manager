import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
    admin: String,
    empCd: String,
    reason: String
});

const leaveModel = mongoose.model('leaveModel',leaveSchema);
export default leaveModel;