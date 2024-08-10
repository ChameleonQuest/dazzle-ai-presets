import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CopyButton from './CopyButton'; // Assuming you have a CopyButton component

const ChatLog = ({ messages, iconPath, clearChat }) => {
    return (
        <>
            <div style={{ display: 'block', overflowX: 'clip' }}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'block',
                            fontSize: '.7rem',
                            fontStyle: message.role === "assistant" ? 'italic' : 'normal',
                            padding: '0px 4px 4px 4px',
                            position: 'relative'
                        }}
                    >
                        <img
                            src={iconPath}
                            style={{
                                height: "20px",
                                display: message.role === "assistant" ? 'inline-block' : 'none',
                                position: 'absolute',
                                top: '0px',
                                left: '0px'
                            }}
                        />
                        <div style={{ marginLeft: '20px', fontWeight: message.role != "assistant" ? '700' : '400' }}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                        </div>
                        <div style={{ marginLeft: '20px', display: message.role === "assistant" ? 'block' : 'none' }}>
                            <CopyButton text={message.content} />
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ flexGrow: 1 }}></div>
            <div style={{ display: 'flex', justifyContent: 'right', fontSize: '12px', padding: '8px', display: messages.length > 1 ? 'inherit' : 'none' }}>
                <a onClick={clearChat}>clear</a>
            </div>
            <span id="bottom-anchor"></span>
        </>
    );
};

export default ChatLog;
