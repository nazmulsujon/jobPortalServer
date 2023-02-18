const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Port
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Job Portal server is running!"));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pdzsrjb.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const fresherJobsCollection = client.db("JobPortal").collection("fresherJobs");
    const experiencedJobsCollection = client.db("JobPortal").collection("experiencedJobs");
    const topItCompaniesCollection = client.db("JobPortal").collection("topItCompanies");

    // // all fresherJobs API
    app.get("/fresherJobs", async (req, res) => {
      const query = {};
      const fresherJobs = await fresherJobsCollection.find(query).toArray();
      res.send(fresherJobs);
    });

    // experiencedJobs API
    app.get("/experiencedJobs", async (req, res) => {
      const query = {};
      const experiencedJobs = await experiencedJobsCollection.find(query).toArray();
      res.send(experiencedJobs);
    });

    // topItCompanies API
    app.get("/topItCompanies", async (req, res) => {
      const query = {};
      const topItCompanies = await topItCompaniesCollection.find(query).toArray();
      res.send(topItCompanies);
    });
  } catch (error) {
    console.log(error);
  }
}
run().catch((err) => console.error(err));

app.listen(port, () => console.log(`Job Portal app listening on port ${port}`));
