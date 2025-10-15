let express = require('express')
let mongoose = require('mongoose');
const enquiryRouter = require('./App/routes/web/enquiryRoutes');
let cors = require('cors');
require('dotenv').config();
let app = express()
app.use(cors());


app.use(express.json());

//Routes
app.use('/api/website/enquiry',enquiryRouter)


//connect to MongoDB
mongoose.connect(process.env.DBURL).then(()=>{
    console.log('Connected to MongoDB');

    app.listen(process.env.PORT || 3000,()=>{
        console.log('Server is running');
    })
}).catch((err)=>{
    console.log(err)
})