import "./VoiceRecorder.css";
import { FaMicrophone } from "react-icons/fa";

export default function VoiceRecorder({
   recording,
  startRecording,
  stopRecording,

}) {
  return (
    <button
      className={`mic-btn ${recording ? "recording" : ""}`}
      onClick={() => {
      if (recording) {
         stopRecording();
          } else {
         startRecording();
      }
}}
    >
      {recording ? "Stop" : <FaMicrophone />}
      {/* <FaMicrophone /> */}
    </button>
  );
}