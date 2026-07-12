require("dotenv").config();

const { getAIReply } = require("./services/ai");
const OpenAI = require("openai");
const express = require("express");
const cors = require("cors");
const multer = require("multer");


// =============================
// GROQ AI CLIENT
// =============================

const client = new OpenAI({

    apiKey: process.env.GROQ_API_KEY,

    baseURL: "https://api.groq.com/openai/v1"

});


// =============================
// EXPRESS SETUP
// =============================

const app = express();

console.log("THIS IS MY SERVER FILE");


app.use((req,res,next)=>{

    console.log(`${req.method} ${req.url}`);

    next();

});


app.use(cors());

app.use(express.json());


// =============================
// MULTER AUDIO STORAGE
// =============================

const storage = multer.memoryStorage();

const upload = multer({
    storage
});



// =============================
// HOME ROUTE
// =============================

app.get("/",(req,res)=>{

    res.send("iCanSpe Backend Running");

});



// =============================
// TEXT CHAT ROUTE
// =============================

app.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;

        console.log("User:", message);

        const reply = await getAIReply(message);

        res.json({
            reply
        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            reply: "Sorry, something went wrong."
        });

    }

});





// =============================
// VOICE TO TEXT ROUTE
// =============================


app.post(
"/voice",
upload.single("audio"),
async(req,res)=>{


console.log("VOICE API HIT");



if(!req.file){

    return res.status(400).json({

        message:"No audio received"

    });

}




console.log("File Name:",
req.file.originalname);


console.log("Type:",
req.file.mimetype);


console.log("Size:",
req.file.size);




try{


    // Create file for Whisper

    const audioFile = new File(

        [
            req.file.buffer
        ],

        "voice.webm",

        {

            type:req.file.mimetype

        }

    );



    const transcription = await client.audio.transcriptions.create({


        file:audioFile,


        model:"whisper-large-v3",

        language: "en",

         temperature: 0 

    });



    console.log(
        "TEXT:",
        transcription.text
    );




    res.json({

        success:true,

        text:transcription.text


    });



}

catch(error){


    console.log(
        "WHISPER ERROR:",
        error.message
    );


    res.status(500).json({

        success:false,

        error:"Speech to text failed"

    });


}



});




// =============================
// SERVER START
// =============================


process.on(
"uncaughtException",
(err)=>{

console.log(
"ERROR:",
err
);

});



app.listen(5000,()=>{


console.log(
"Server running on port 5000"
);


});