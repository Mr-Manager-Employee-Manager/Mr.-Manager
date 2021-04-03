import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    empCd: String,
    name: String,
    designation: String,
    dept: String,
    username: String,
    attendance: [],
});

const employeeModel = mongoose.model('employeeModel',employeeSchema);
export default employeeModel;