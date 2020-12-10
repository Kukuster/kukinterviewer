import { IIMessage } from "../../../core/Command/Command";
import askForQuestionText from "../../../core/sheet/methods/awaiting_questionText/askForQuestionText";
import addQuestion from "../../../core/sheet/methods/questions/addQuestion";
import { Ichat } from "../../../core/sheet/models/ChatModel";


export type addQuestion_execute_args = {
    action: addQuestion_execute_action;
    questionText: string | null;
    Tags?: string[];
    enabled?: boolean;
} & (
    {
        action: 'add question';
        questionText: string;
        Tags?: string[];
        enabled?: boolean;
    } | {
        action: 'ask to provide a questionText';
        questionText: null;
        Tags?: string[];
        enabled?: boolean;
    } | {
        action: 'ask to provide smaller questionText';
        questionText: null;
        enabled?: boolean;
    }
);

export type addQuestion_execute_action = 'add question' | 'ask to provide a questionText' | 'ask to provide smaller questionText';


export default async function addQuestion_execute(msg: IIMessage, args: addQuestion_execute_args)
    : Promise<{
        request: addQuestion_execute_args,
        response: Ichat,
    }>
{
    const chatId = msg.chat.id;
    

    if (args.action === 'add question') {
        return {
            request: args,
            response: await addQuestion(chatId, {
                questionText: args.questionText,
                Tags: args.Tags,
                enabled: true
            })
        };

    } else if (args.action === 'ask to provide a questionText') {
        return {
            request: args,
            response: await askForQuestionText(chatId, args.Tags),
        };

    } else {
        return {
            request: args,
            response: await askForQuestionText(chatId),
        };
    }

}
