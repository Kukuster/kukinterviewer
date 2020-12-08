import { IIMessage } from "../../../core/Command/Command";
import askForQuestionText from "../../../core/sheet/methods/awaiting_questionText/askForQuestionText";
import addQuestion from "../../../core/sheet/methods/questions/addQuestion";
import { Ichat } from "../../../core/sheet/models/ChatModel";


export type addQuestion_execute_args = {
    questionText: string | null;
    Tags ?: string[];
    enabled ?: boolean;
}

export default async function addQuestion_execute(msg: IIMessage, args: { questionText: string | null, Tags?: string[], enabled?: boolean })
    : Promise<{
        request: addQuestion_execute_args,
        response: Ichat,
    }>
{
    const chatId = msg.chat.id;
    

    if (args.questionText){
        return {
            request: args,
            response: await addQuestion(chatId, {
                questionText: args.questionText,
                Tags: args.Tags,
                enabled: true
            })
        };
    } else {

        return {
            request: args,
            response: await askForQuestionText(chatId, args.Tags),
        };
    }

}
