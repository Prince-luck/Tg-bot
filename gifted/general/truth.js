case 'truth': {
    try {
        const apiUrl = 'https://api.davidcyriltech.my.id/truth'; 
        const imagePath = 'https://files.catbox.moe/dmgo7t.jpg'; // 
        const userTag = `@${m.sender.split('@')[0]}`; 

        
        const response = await axios.get(apiUrl);

        if (response.data.status === 200 && response.data.success) {
            const truthQuestion = response.data.question; 


            David.sendMessage(from, {
                image: { url: imagePath }, 
                caption: `${userTag}, you chose *TRUTH*!\n\n*Question:* ${truthQuestion}\n\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀᴠɪᴅ ᴄʏʀɪʟ ᴛᴇᴄʜ*`,
                mentions: [m.sender], 
            }, { quoted: m });
        } else {

            reply('Failed to fetch a truth question. Please try again later.');
        }
    } catch (error) {
        
        if (error.response) {
            reply(`API Error: ${error.response.data.message || 'Unknown API error.'}`);
        } else if (error.request) {
            reply('No response received from the API. Please try again later.');
        } else {
            reply(`An error occurred: ${error.message}`);
        }
    }
    break;
}


case 'ss': case 'ssweb': {
    if (!args[0]) return m.reply(`Please provide a link\n\n Example: ${prefix + command}.`);
await David.sendMessage(m?.chat, { react: { text: `📸`, key: m?.key } });
   
    let apiUrl = `https://api.davidcyriltech.my.id/ssweb?url=${encodeURIComponent(args[0])}`;

    try {
        await David.sendMessage(m.chat, { image: { url: apiUrl }, caption: `🖼️ Screenshot of ${args[0]}` }, { quoted: m });
    } catch (error) {
        console.error(error);
        m.reply('Failed to capture the screenshot. Please try again later.');
    }
}
break;

case 'shorturl': {
    if (!args[0]) return m.reply('Please provide a URL to shorten.');
    let apiUrl = `https://api.davidcyriltech.my.id/shorten?url=${encodeURIComponent(args[0])}`;

    try {
        let response = await fetch(apiUrl);
        let jsonData = await response.json();
        if (jsonData.success) {
            m.reply(`🔗 *Shortened URL:* ${jsonData.shortUrl}`);
        } else {
            m.reply('Failed to shorten URL using TinyURL.');
        }
    } catch (error) {
        console.error(error);
        m.reply('Error processing your request.');
    }
}
break;