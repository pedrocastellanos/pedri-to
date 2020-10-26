const mongoose = require('mongoose');


const uri = 'mongodb+srv://pedrito:<password>@cluster0.usq6d.mongodb.net/<dbname>?retryWrites=true&w=majority'


mongoose.connect(uri, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
})

    .then(db=>console.log('DB is connected'))
    .catch(err=> console.log(err))