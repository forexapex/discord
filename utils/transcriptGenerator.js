function generateHTMLTranscript(messages, ticketInfo) {
  const { userId, type, createdAt, claimedBy } = ticketInfo;
  
  const ticketTypes = {
    'billing': '💵 Billing Support',
    'account': '📧 Account Issues',
    'general': '🔧 General Support',
    'report': '⚠️ Report'
  };

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket Transcript - SG ESPORTS</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #5865F2 0%, #7289DA 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }
        .header p {
            opacity: 0.9;
            font-size: 14px;
        }
        .ticket-info {
            background: #f7f9fc;
            padding: 20px 30px;
            border-bottom: 2px solid #e3e7ed;
        }
        .ticket-info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        .info-item {
            background: white;
            padding: 12px;
            border-radius: 8px;
            border-left: 3px solid #5865F2;
        }
        .info-label {
            font-size: 12px;
            color: #72767d;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 5px;
        }
        .info-value {
            font-size: 14px;
            color: #2c2f33;
            font-weight: 500;
        }
        .messages {
            padding: 30px;
        }
        .message {
            margin-bottom: 20px;
            padding: 15px;
            background: #f7f9fc;
            border-radius: 8px;
            border-left: 3px solid #5865F2;
        }
        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .message-author {
            font-weight: 600;
            color: #5865F2;
            font-size: 15px;
        }
        .message-timestamp {
            font-size: 12px;
            color: #72767d;
        }
        .message-content {
            color: #2c2f33;
            line-height: 1.6;
            font-size: 14px;
            word-wrap: break-word;
        }
        .message.bot {
            background: #fff3cd;
            border-left-color: #ffc107;
        }
        .message.bot .message-author {
            color: #ffc107;
        }
        .footer {
            background: #f7f9fc;
            padding: 20px 30px;
            text-align: center;
            border-top: 2px solid #e3e7ed;
        }
        .footer p {
            color: #72767d;
            font-size: 13px;
        }
        .sg-logo {
            font-size: 20px;
            font-weight: bold;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎮 SG ESPORTS Support Ticket</h1>
            <p>Ticket Transcript</p>
        </div>
        
        <div class="ticket-info">
            <h2 style="margin-bottom: 10px; color: #2c2f33;">Ticket Information</h2>
            <div class="ticket-info-grid">
                <div class="info-item">
                    <div class="info-label">Category</div>
                    <div class="info-value">${ticketTypes[type] || type}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Created</div>
                    <div class="info-value">${new Date(createdAt).toLocaleString()}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">User ID</div>
                    <div class="info-value">${userId}</div>
                </div>
                ${claimedBy ? `
                <div class="info-item">
                    <div class="info-label">Claimed By</div>
                    <div class="info-value">${claimedBy}</div>
                </div>
                ` : ''}
            </div>
        </div>
        
        <div class="messages">
            <h2 style="margin-bottom: 20px; color: #2c2f33;">Conversation</h2>
            ${messages.map(msg => `
            <div class="message ${msg.author.bot ? 'bot' : ''}">
                <div class="message-header">
                    <span class="message-author">${escapeHtml(msg.author.tag)}</span>
                    <span class="message-timestamp">${new Date(msg.createdTimestamp).toLocaleString()}</span>
                </div>
                <div class="message-content">${escapeHtml(msg.content) || '<i>No text content</i>'}</div>
            </div>
            `).join('')}
        </div>
        
        <div class="footer">
            <p class="sg-logo">SG ESPORTS</p>
            <p style="margin-top: 10px;">Thank you for contacting our support team!</p>
        </div>
    </div>
</body>
</html>
  `.trim();

  return html;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

module.exports = { generateHTMLTranscript };
