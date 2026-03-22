const express = require('express');
const { Storage } = require('@google-cloud/storage');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const storage = new Storage();

app.use(bodyParser.json());

// Create a new bucket
app.post('/buckets', async (req, res) => {
    const { bucketName } = req.body;
    if (!bucketName) return res.status(400).send('Bucket name is required');
    try {
        await storage.createBucket(bucketName);
        res.status(201).send(`Bucket ${bucketName} created.`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Upload an object to a bucket
app.post('/buckets/:bucketName/upload', async (req, res) => {
    const { bucketName } = req.params;
    const { file } = req.body;
    if (!file) return res.status(400).send('File content is required');
    try {
        const bucket = storage.bucket(bucketName);
        const fileName = Date.now() + '-uploaded-file'; // You can modify this to use a user-defined name
        const fileUpload = bucket.file(fileName);
        await fileUpload.save(Buffer.from(file, 'base64')); // Assume the file is sent as base64 encoded string
        res.status(201).send(`File ${fileName} uploaded to ${bucketName}.`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Download an object from a bucket
app.get('/buckets/:bucketName/download/:fileName', async (req, res) => {
    const { bucketName, fileName } = req.params;
    try {
        const options = {
            destination: res,
        };
        await storage.bucket(bucketName).file(fileName).download(options);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get metadata for an object
app.get('/buckets/:bucketName/metadata/:fileName', async (req, res) => {
    const { bucketName, fileName } = req.params;
    try {
        const [metadata] = await storage.bucket(bucketName).file(fileName).getMetadata();
        res.status(200).json(metadata);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
