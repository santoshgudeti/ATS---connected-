const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use("/files",express.static("files"))

// MongoDB Connection
const mongoUrl = 'mongodb+srv://santoshgudeti:GUDETIsantosh@cluster0.7wsub.mongodb.net/santosh?retryWrites=true&w=majority';

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((e) => {
    console.log(e);
  });
  const multer  = require('multer')

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  
  require("./pdfDetails");
  const PdfSchema=mongoose.model("PdfDetails")
  const upload = multer({ storage: storage });
app.post("/upload-files",upload.single("file"),async(req,res)=>{
console.log(req.file);
const title = req.body.title;
const fileName=req.file.filename;
try{
  await PdfSchema.create({title: title, pdf: fileName});
res.send({status: "ok"});
} catch (error){
   res.json({status : error})
}


}); 
// Placeholder route
app.get('/', async (req, res) => {
  res.send('Success!!!!!!!');
});

// Start server

app.listen(5000, () => {
  console.log("Server started on port");
});
