import React, { useEffect, useRef } from 'react';

function LiveStream({ totalPot }) {
/*   const chatangoRef = useRef(null);

  const [chatBoxStyle, setChatBoxStyle] = React.useState({ height: '60vh', width: '10vw' }); */
  

/*   useEffect(() => {
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
 */
/*   useEffect(() => {
    const script = document.createElement('script');
    script.id = 'cid0020000353813840656';
    script.async = true;
    script.dataCfasync = 'false';
    script.src = '//st.chatango.com/js/gz/emb.js';
    script.style.width = '100%';
    script.style.height = '100%';
    script.innerHTML =
      '{"handle":"degenhedge","arch":"js","styles":{"a":"DCB633","b":100,"c":"000000","d":"000000","k":"DCB633","l":"DCB633","m":"DCB633","p":"10","q":"DCB633","r":100,"usricon":0,"surl":0,"allowpm":0,"cnrs":"0.6","fwtickm":1}}';
  
    chatangoRef.current.appendChild(script);
  
    return () => {
      chatangoRef.current.removeChild(script);
    };
  }, []);   */

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
{/*           <div ref={chatangoRef} className="chat-box" style={chatBoxStyle}></div> */}
        </div>
      </div>
    </div>
  );
}

export default LiveStream;
