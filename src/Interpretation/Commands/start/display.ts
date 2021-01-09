import { IIMessage } from "../../../core/Command/Command";
import { sendMessageSafely } from "../../../bot";
import { maybeTelegramBotMessage } from "../../../botlib";
import { start_execute_return } from "./execute";


export default async function start_display(msg: IIMessage, data: start_execute_return)
    : Promise<maybeTelegramBotMessage[] | null>
{
    
    const chatId = msg.chat.id;

    if (data.response.description === 'created a new chat document, now waiting for timezone') {
        
        const firstReply = `Hi! Need help preparing for an interview?

First things first, I'm not too wordy. That's mostly your chat, and it's your message history. Tell me what to do explicitly in simple English in the imperative form. Otherwise, I'll ignore the message as you may write what you want and answer your interview questions in whatever form you prefer to see in this chat history.

I store the data, so you can ask me to add a question to my permanent list. I help you to deal with tags in questions, so you can ask me to list tags, tag/untag questions.

I have a schedule, so you can tell me when and how often I should be asking you, and I'll be asking you random questions.

Whichever topic you want to prepare for, choose what questions or tags to disable accordingly, and I won't be asking you those. When asking a question, I disable it so I won't choose it again at random (unless you tell me so, of course).

Hope I'm making sense! I'm a simple bot. You tell me what to do — I do, if I understand. If I don't — I ignore.

I won't bother you with a lot of text anymore.`;



        const secondReply = `
...except. I need to know your timezone, so I shift my schedule in accord.

Where do you reside? I know all the countries and a lot of cities.
`;    

        const firstReply_result = await sendMessageSafely(chatId, firstReply, {
            parse_mode: 'Markdown'
        });
        setTimeout(async () => {
            return await sendMessageSafely(chatId, secondReply, {
                parse_mode: 'Markdown'
            });
        }, 5000);
        return firstReply_result;
        
    } else if (data.response.description === "the chat document already exists, here it is") {
        // normally this shouldn't happen

        const reply = `Hi! We already know each other!`;
        return sendMessageSafely(chatId, reply, {
            parse_mode: 'Markdown'
        });

    } else {
        // this shouldn't happen

        return null;
    }

}


