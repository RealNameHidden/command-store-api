
const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:admin@cluster0.a6kvs.azure.mongodb.net/commands?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB Connected…')
    })
    .catch(err => console.log(err))

