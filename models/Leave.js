import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
    admin: String,
    empCd: String,
    date: {
        "year": String,
        "month": String,
        "date": String
    },
    id:String,
    days: Number,
    reason: String,
    name:String,
    status:String
});

const leaveModel = mongoose.model('leaveModel',leaveSchema);
export default leaveModel;