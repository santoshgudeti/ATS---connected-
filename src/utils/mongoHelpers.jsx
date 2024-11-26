import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://santoshgudeti:*****@cluster0.7wsub.mongodb.net/"; // Replace this
const client = new MongoClient(uri);

export const connectToDatabase = async () => {
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    const database = client.db('santosh'); // Replace with your database name
    return database;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export const saveResumeData = async (resumeData) => {
  try {
    const database = await connectToDatabase();
    const collection = database.collection('resumes'); // Collection name
    const result = await collection.insertOne(resumeData);
    return result;
  } catch (error) {
    console.error('Error saving resume data:', error);
    throw error;
  }
};

export const fetchResumes = async () => {
  try {
    const database = await connectToDatabase();
    const collection = database.collection('resumes');
    const resumes = await collection.find().toArray();
    return resumes;
  } catch (error) {
    console.error('Error fetching resumes:', error);
    throw error;
  }
};
