import Employee from '../models/Employee.js';


export const createEmployee = (req, res) => {
    const employee = req.body;
    const newEmployee = new Employee(employee);
    newEmployee.save()
        .then(() => res.json(newEmployee))
        .catch(err => res.status(400).json('Error: ' + err));
}

export const showEmployee = (req, res) => {
    const { id } = req.params;
    Employee.findById(id)
        .then(employee => {
            res.json(employee);
        })
        .catch(err => res.status(400).json('Error:' + err));
}

export const filterEmployee = (req, res) => {
    Employee.find(req.body)
        .then(employee => {
            res.status(200).json(employee);
        })
        .catch(err => res.status(400).json('Error:' + err));
}

export const updateEmployee = (req, res) => {
    const { id } = req.params;
    const employee = Employee.findByIdAndUpdate(id, req.body)
        .then(() => res.status(200).json('Data sent'))
        .catch(err => res.status(400).json('Error: ' + err));
}

export const deleteEmployee = (req, res) => {
    const { id } = req.params;
    Employee.findByIdAndDelete(id).then(() => {
        res.status(200).json("Deleted Successfully");
    })
}


