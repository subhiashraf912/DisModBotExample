import mongoose from 'mongoose';
const init = async (): Promise<void> => {
      await mongoose.set('useFindAndModify', false);
      mongoose.Promise = global.Promise;

      mongoose.connection.on('connected', () => {
            console.log('Mongoose has successfully connected!');
      });

      mongoose.connection.on('err', (err: any) => {
            console.error(`Mongoose connection error: \n${err.stack}`);
      });

      mongoose.connection.on('disconnected', () => {
            console.warn('Mongoose connection lost');
      });
      const mongoURI = process.env.MONGODB;
      await mongoose.connect(mongoURI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4,
      });
};
export default init;
