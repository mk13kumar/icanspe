import "./Message.css";

function Message({ type, text, time }) {
  return (
    <div className={`message-row ${type}`}>

      <div className="message-bubble">

        <p>{text}</p>

        <span>{time}</span>

      </div>

    </div>
  );
}

export default Message;