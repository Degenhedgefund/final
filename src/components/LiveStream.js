import React, { useEffect, useRef } from 'react';

function LiveStream({ totalPot }) {
  const chatangoRef = useRef(null);

  const [chatBoxStyle, setChatBoxStyle] = React.useState({ height: '60vh', width: '10vw' });

  useEffect(() => {
    const updateStyles = () => {
      if (window.innerWidth <= 480) {
        setChatBoxStyle({ height: '40vh', width: '90vw' });
      } else if (window.innerWidth <= 888) {
        setChatBoxStyle({ height: '90vh', width: '80vw' });
      } else {
        setChatBoxStyle({ height: '60vh', width: '20vw' });
      }
    };

    updateStyles();

    window.addEventListener('resize', updateStyles);

    return () => {
      window.removeEventListener('resize', updateStyles);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'cid0020000353029536135';
    script.async = true;
    script.src = '//st.chatango.com/js/gz/emb.js';
    script.style = 'width: 100%; height: 100%';
    script.innerHTML =
      '{"handle":"degenhedgefund","arch":"js","styles":{"a":"666600","b":100,"c":"FFFFFF","d":"FFFFFF","k":"666600","l":"666600","m":"666600","n":"FFFFFF","p":"10","q":"666600","r":100,"cnrs":"1", "useonm":1}}';

    chatangoRef.current.appendChild(script);

    return () => {
      chatangoRef.current.removeChild(script);
    };
  }, []);

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-2 rounded-box">
          <p className="total-pot">
            TOT. wager amount:<br />
            {totalPot} ETH
          </p>
        </div>
        {/* Livestream/Chat Columns */}
        <div className="col-md-8">
          {/* Kick Livestream Embed */}
          <iframe
            className="rounded-stream"
            title="Livestream"
            src="https://kick.com/degenhedgefund"
            allowFullScreen={true}
          ></iframe>
        </div>
        <div className="col-md-2">
          {/* Chat box (Chatango embed) */}
          <div ref={chatangoRef} className="chat-box" style={chatBoxStyle}></div>
        </div>
      </div>
    </div>
  );
}

export default LiveStream;
