const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', { dbName: 'auth_tutorial',
useNewUrlParser: true,
useUnifiedTopology: true,
// useFindAndModify: false,
// useCreateIndex: true,
    })
    .then(() => {
    console.log('mongodb connected!')
    })
    .catch((error) => {console.log(error)});

mongoose.connection.on('connection', () => console.log('mongodb connected!'));

mongoose.connection.on('error', (error) => console.log(error.message));

mongoose.connection.on('disconnected', () => console.log('mongodb disconnected!'));

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
}); 