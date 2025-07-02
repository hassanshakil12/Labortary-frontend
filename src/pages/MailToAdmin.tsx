import React, { useState } from 'react';

const MailToAdmin = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Placeholder: Replace with your actual email sending logic
    alert(`Subject: ${subject}\nMessage: ${message}`);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="bg-white p-6 font-sans max-w-3xl mx-auto rounded-md shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4">Mail to Admin</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter subject"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Type your message to admin..."
        ></textarea>
      </div>
    <div className='justify-center flex '>
      <button
        onClick={handleSend}
        className="bg-gray-200 text-black px-6 py-2 rounded-3xl hover:bg-gray-700 hover:text-white"
      >
        Send Message
      </button>
      </div>
    </div>
  );
};

export default MailToAdmin;
