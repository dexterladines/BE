const express = require("express");
const app = express();


const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const nodemailer = require("nodemailer");
// const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const auth = require("./routes/auth");

dotenv.config();
const PORT = process.env.PORT;
const Product = require("./models/Product");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

// app.use(cors());
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
// app.use("/api/checkout", stripeRoute);





app.get('/', (req, res) => {
    res.send('Welcome to our API')
});
app.post('/pay', (req, res) => {
	
});
app.get('/search/:key', async (req, res) => {
	let data = await Product.find(
		{
			"$or": [
				{name:{$regex:req.params.key}},
				{description:{$regex:req.params.key}}
			]
		}
	)
	res.send(data);
})

// let mailTransporter = nodemailer.createTransport({
// 	service: "gmail",
// 	auth: {
// 		user: "dexladines@gmail.com",
// 		pass: "perote143"
// 	}
// })

// let details = {
// 	from: "dexladines@gmail.com",
// 	to: "drexladines@gmail.com",
// 	subject: "Testing our nodemailer",
// 	text: "Test"
// }

// mailTransporter.sendMail(details, (err)=> {
// 	if(err){
// 		console.log("It has error")
// 	} else {
// 		console.log("Email has sent")
// 	}
// })

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port : ${PORT}`);
});