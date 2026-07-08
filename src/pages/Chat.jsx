import { useState, useRef, useEffect } from "react";
import "./Chat.css";
import axios from "axios";
import Message from "./Message";
import Welcome from "./Welcome";
import VoiceRecorder from "../components/VoiceRecorder";

export default function Chat({ setSidebarOpen }) {
   const [input, setInput] = useState("");
   const [messages, setMessages] = useState([]);
   const [loading, setLoading] = useState(false);
   const chatEndRef = useRef(null);
   const [recording, setRecording] = useState(false);
   const mediaRecorderRef = useRef(null);
   const audioChunksRef = useRef([]);
   const inputRef = useRef(null);


   const sendToAI = async (userMessage) => {

      if (!userMessage.trim()) return;

      const currentTime = new Date().toLocaleTimeString([], {
         hour: "2-digit",
         minute: "2-digit",
      });

      setMessages((prev) => [
         ...prev,
         {
            user: userMessage,
            reply: null,
            time: currentTime,
         },
      ]);

      setLoading(true);

      try {

         const response = await axios.post(
            "https://icanspe-backend.onrender.com/chat",
            {
               message: userMessage,
            }
         );

         await new Promise(resolve => setTimeout(resolve, 1000));

         setLoading(false);

         setMessages((prev) => {

            const updated = [...prev];

            updated[updated.length - 1].reply =
               response.data.reply;

            return [...updated];

         });

         inputRef.current?.focus();

      } catch (err) {

         setLoading(false);

         console.log(err);

      }

   };


   const sendMessage = () => {

      if (!input.trim()) return;

      const userMessage = input;

      setInput("");

      sendToAI(userMessage);




   };

   const startRecording = async () => {
      console.log("Start Recording Clicked");

      try {
         const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
         });
         console.log("Microphone Permission Granted");
         const mediaRecorder = new MediaRecorder(stream);

         mediaRecorderRef.current = mediaRecorder;
         audioChunksRef.current = [];

         mediaRecorder.ondataavailable = (event) => {
            console.log("Receiving audio chunk...");
            audioChunksRef.current.push(event.data);
         };

         mediaRecorder.onstop = async () => {
            console.log("Recording Stopped");


            const audioBlob = new Blob(audioChunksRef.current, {
               type: "audio/webm",
            });

            console.log(audioBlob);

            const formData = new FormData();

            formData.append(
               "audio",
               audioBlob,
               "voice.webm"
            );

            console.log("Sending to backend...");

            try {

               const response = await axios.post(
                  "https://icanspe-backend.onrender.com/voice",
                  formData,
                  {
                     headers: {
                        "Content-Type": "multipart/form-data",
                     },
                     timeout: 10000
                  }
               );

               console.log("SUCCESS");
               console.log(response.data);

               const spokenText = response.data.text;

               // setInput(spokenText);

               sendToAI(spokenText);

               // setInput("");
               // inputRef.current?.focus();

            }
            catch (err) {

               console.log("===== AXIOS ERROR =====");

               console.log("Message:", err.message);

               console.log("Code:", err.code);

               console.log("Response:", err.response);

               console.log("Status:", err.response?.status);

               console.log("Data:", err.response?.data);

               console.log("Full Error:", err);

            }

         };

         mediaRecorder.start();

         setRecording(true);

      } catch (err) {
         console.log(err);
      }
   };

   const stopRecording = () => {
      mediaRecorderRef.current.stop();
      setRecording(false);
   };

   useEffect(() => {
      chatEndRef.current?.scrollIntoView({
         behavior: "smooth",
      });
   }, [messages, loading]);





   return (
      <div className="chat-container"
         className="chat-container"
         onClick={() => {
            if (window.innerWidth <= 768) {
               setSidebarOpen(false);
            }
         }}

      >
         <h1 className="chat-title">iCanSpe</h1>

         <div className="chat-box">
            {messages.length === 0 && !loading ? (
               <Welcome />
            ) : null}

            {messages.map((msg, index) => (
               <div key={index} className="message-card">

                  <Message
                     type="user"
                     text={msg.user}
                     time={msg.time}
                  />

                  {msg.reply && (
                     <Message
                        type="eva"
                        text={msg.reply}
                        time={msg.time}
                     />
                  )}

               </div>
            ))}
            {loading && (
               <div className="typing-container">

                  <p> <img
                     src="/favicon.svg"
                     alt="Eva"
                     className="typing-avatar"
                  /> Eva is typing...</p>

                  <div className="typing">
                     <span></span>
                     <span></span>
                     <span></span>
                  </div>
               </div>
            )}
            <div ref={chatEndRef}></div>



         </div>
         
             
         <div className="input-section">
            <input
               ref={inputRef}
               className="chat-input"
               type="text"
               placeholder="Type Hindi here..."
               value={input}
               onChange={(e) => setInput(e.target.value)}
               autoFocus
            />
            <VoiceRecorder
               recording={recording}
               startRecording={startRecording}
               stopRecording={stopRecording}
            />

            <button className="send-btn" onClick={sendMessage}>
               Send
            </button>
         </div>
         
      </div>
   );
}