import scheduleNextQuestion from "../../schedule/scheduleNextQuestion";
import getAllChats from "./chat/getAllChats";

export default async function scheduleQuestionsForEveryone(){
    const allChats = await getAllChats({"chatId": true, "Settings": true, "next_question": true});

    let Nrescheduled = 0;

    for (let i = 0; i < allChats.length; i++){
        const chat = allChats[i];

        if (chat.Settings.enabled && chat.next_question){
            scheduleNextQuestion(chat.chatId, chat.next_question) && Nrescheduled++;
        }

    }

    return {
        rescheduled_count: Nrescheduled,
        totalChats_count: allChats.length,
    };

}
