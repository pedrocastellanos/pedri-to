const mongoose = require('mongoose');


const uri = 'mongodb+srv://pedrito:<Osaris03121971280>@cluster0.usq6d.mongodb.net/<urlshortenerdb>?retryWrites=true&w=majority'


try {
    mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected"));    
}catch (error) { 
    console.log("could not connect", error);    
}

// mongoose.connect('mongodb://localhost/urlshortener', {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// })
//     .then(db=>console.log('DB is connected'))
//     .catch(err=> console.log(err))
