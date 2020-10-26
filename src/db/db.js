const mongoose = require('mongoose');


const uri = 'mongodb+srv://pedrito:<Osaris03121971280>@cluster0.usq6d.mongodb.net/<urlshortenerdb>?retryWrites=true&w=majority'


mongoose.connect(uri, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(db=>console.log('DB is connected'))
    .catch(err=> console.log(err))