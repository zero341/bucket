// GCS Clone in JavaScript

class Bucket {
    constructor(name) {
        this.name = name;
        this.objects = {};
    }

    createObject(objectName, data) {
        this.objects[objectName] = data;
    }

    deleteObject(objectName) {
        delete this.objects[objectName];
    }

    getObject(objectName) {
        return this.objects[objectName];
    }

    listObjects() {
        return Object.keys(this.objects);
    }
}

class GCS {
    constructor() {
        this.buckets = {};
    }

    createBucket(bucketName) {
        if (!this.buckets[bucketName]) {
            this.buckets[bucketName] = new Bucket(bucketName);
        }
    }

    deleteBucket(bucketName) {
        delete this.buckets[bucketName];
    }

    getBucket(bucketName) {
        return this.buckets[bucketName];
    }

    listBuckets() {
        return Object.keys(this.buckets);
    }
}

class Metadata {
    constructor() {
        this.metadataStore = {};
    }

    setMetadata(objectName, metadata) {
        this.metadataStore[objectName] = metadata;
    }

    getMetadata(objectName) {
        return this.metadataStore[objectName];
    }
}

// Example usage
const gcs = new GCS();
gcs.createBucket('example-bucket');
const bucket = gcs.getBucket('example-bucket');
bucket.createObject('test.txt', 'Hello, GCS!');
const object = bucket.getObject('test.txt');
console.log(object); // Hello, GCS!