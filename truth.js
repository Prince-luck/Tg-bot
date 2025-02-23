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


