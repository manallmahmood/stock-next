import { connect, model, models, Schema } from "mongoose";
// const connectionString =
//   "mongodb+srv://manallmahmood:stupid123@cluster0.y1xgwpp.mongodb.net/stocks;
const connectionString = process.env.MONGODB_URI;

export default async function handler(req, res) {
  await connect(connectionString);
  console.log("req.method: ", req.method);
  console.log("req.query.id", req.query.id);

  const id = req.query.id;
  if (req.method === "GET") {
    // Get only one document
    const doc = await Products.findOne({ _id: id });
    res.status(200).json(doc);
  } else if (req.method === "DELETE") {
    const deletedDoc = await Products.deleteOne({ _id: id });
    res.status(200).json(deletedDoc);
  } else if (req.method === "PUT") {
    console.log("id", req.query.id);
    console.log(req.body);
    const updatedDoc = await Products.updateOne({ _id: id }, req.body);
    res.status(200).json(updatedDoc);
  } else {
    res.setHeader("Allow", ["GET", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const productsSchema = new Schema({
  code: String,
  name: String,
  price: { type: Number, float: true },
});

console.log("Mongoose Models", models);
const Products = models?.products || model("products", productsSchema);
