const express = require('express');  
const bodyParser = require('body-parser');  
const cors = require('cors');  
const mongoose = require('mongoose');  

// MongoDB URL  
const mongoURL = 'mongodb://localhost:27017/customerDB';  

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })  
    .then(() => console.log('MongoDB Connected'))  
    .catch(err => console.log(err));  

// Customer Schema  
const customerSchema = new mongoose.Schema({  
    phone: String,  
    firstName: String,  
    lastName: String,  
    email: String,  
    address: {  
        street: String,  
        city: String,  
        state: String,  
        zip: String,  
    },  
    organization: String,  
});  

const Customer = mongoose.model('Customer', customerSchema);  

const app = express();  
app.use(cors());  
app.use(bodyParser.json());  

// Route to handle customer submission  
app.post('/api/customers', (req, res) => {  
    const newCustomer = new Customer(req.body);  
    newCustomer.save()  
        .then(customer => res.json(customer))  
        .catch(err => res.status(500).json({ error: 'Error saving customer.' }));  
});  

// Route to handle pushing to CRM  
app.post('/api/pushToCRM', (req, res) => {  
    const customerData = req.body;  

    
    
    //  using Axios to send data to a CRM API:  
    axios.post('CRM_API_URL', customerData)  
       .then(response => res.json({ message: 'Successfully pushed to CRM' }))  
       .catch(err => res.status(500).json({ error: 'Failed to push to CRM' }));  

    
    res.json({ message: 'Successfully pushed to CRM (simulated)' });  
});  

// Start the server  
const PORT = 5000;  
app.listen(PORT, () => {  
    console.log(`Server running on http://localhost:${PORT}`);  
});