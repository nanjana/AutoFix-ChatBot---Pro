// ChatBox.js
import React, { useState, useRef } from 'react';
import { queryLLM } from '../utils/getLLMClient';
import { FaPaperPlane, FaMicrophone, FaDownload } from 'react-icons/fa';
import '../styles.css';

function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const reply = await queryLLM(input);
      const followUps = "\n\nWould you like to know:\n• Estimated repair cost?\n• Whether it's safe to drive?";
      const responseText = reply.toLowerCase().includes("i'm an automotive expert")
        ? reply
        : reply + followUps;

      setMessages((prev) => [...prev, { sender: 'bot', text: responseText }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Oops! Something went wrong.' }]);
    }

    setInput('');
  };

  const handleRecord = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Your browser does not support audio recording.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      setIsRecording(true);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        if (audioChunksRef.current.length === 0) {
          alert('No audio recorded.');
          return;
        }

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('file', audioBlob, 'recording.webm');
        formData.append('model', 'whisper-1');

        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: formData,
        });

        const data = await response.json();
        setInput(data.text || '');
      };

      mediaRecorder.start();
    } catch (err) {
      alert('Microphone access denied.');
    }
  };

  const handleExport = () => {
    if (messages.length === 0) {
      alert('No messages to export.');
      return;
    }

    const textData = messages.map(m => `${m.sender === 'user' ? 'You' : 'AutoFix'}: ${m.text}`).join('\n');
    const blob = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AutoFix_Chat.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="chatbox">
      <div className="chat-title-bar">
        <span className="logo-icon">🚘</span>
        <span className="title-text">AutoFix Pro Assistant</span>
      </div>

      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your car issue..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="icon-btn" onClick={handleSend}><FaPaperPlane /></button>
        <button className="icon-btn" onClick={handleRecord}><FaMicrophone /></button>
        <button className="icon-btn" onClick={handleExport}><FaDownload /></button>
      </div>
    </div>
  );
}

export default ChatBox;
