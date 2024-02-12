import mongoose from 'mongoose';

const connectToDatabase = () => {
    mongoose
        .connect(process.env.MONGOLAB_URI)
        .then(() => {
            console.log("Database Connected");
        })
        .catch((err) => {
            console.log(err);
        });
};

export default connectToDatabase;
