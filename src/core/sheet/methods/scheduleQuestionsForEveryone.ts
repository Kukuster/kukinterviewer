import scheduleNextQuestion from "../../schedule/scheduleNextQuestion";
import getAllChats from "./chat/getAllChats";

export default async function scheduleQuestionsForEveryone(){
    const allChats = await getAllChats({"chatId": true, "Settings": true, "next_question": true});

    if (allChats && allChats.length){
        for (let i = 0; i < allChats.length; i++){
            const chat = allChats[i];

            if (chat.Settings.enabled && chat.next_question){
                scheduleNextQuestion(chat.chatId, chat.next_question);
            }

        }
    }

}