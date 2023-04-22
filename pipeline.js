const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://root:example@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(async (err) => {
  const collection = client.db('sakila').collection('film');

  const pipeline = [
    { $lookup: { from: "language", localField: "language_id", foreignField: "_id", as: "language" } },
    { $unwind: "$language" },
    { $group: { _id: "$language.name", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ];

  const result = await collection.aggregate(pipeline).toArray();
  console.log(result);

  client.close();
});
