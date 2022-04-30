import { Bucket, BucketObject, ObjectAccessControl } from "@pulumi/gcp/storage";
import * as pulumi from "@pulumi/pulumi";

// Create the bucket that holds the state of our infrastructure
const stateBucket = new Bucket(
  "state-bucket",
  {
    location: "US",
  },
  { protect: true }
);

const assetsBucket = new Bucket("assets-bucket", {
  location: "US",
});

// Assets config
const htmlObject = new BucketObject("index.html", {
  bucket: assetsBucket.name,
  source: new pulumi.asset.FileAsset("../dist/index.html"),
  name: "index.html",
});

const publicHtmlRule = new ObjectAccessControl("publicHtmlRule", {
  object: htmlObject.outputName,
  bucket: assetsBucket.name,
  role: "READER",
  entity: "allUsers",
});

const bundleObject = new BucketObject("main.js", {
  bucket: assetsBucket.name,
  source: new pulumi.asset.FileAsset("../dist/main.js"),
  name: "main.js",
});

const publicBundleRule = new ObjectAccessControl("publicBundleRule", {
  object: bundleObject.outputName,
  bucket: assetsBucket.name,
  role: "READER",
  entity: "allUsers",
});

// link to site in "prod"
export const link = pulumi.interpolate`https://storage.googleapis.com/${assetsBucket.name}/${htmlObject.name}`;
