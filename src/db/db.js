const mongoose = require('mongoose');


const uri = 'mongodb+srv://pedrito:<osaris03121971280>@cluster0.usq6d.mongodb.net/<urlshortenerdb>?retryWrites=true&w=majority'


mongoose.connect(uri, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
})

    .then(db=>console.log('DB is connected'))
    .catch(err=> console.log(err))