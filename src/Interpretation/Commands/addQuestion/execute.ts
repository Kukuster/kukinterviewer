import { IIMessage } from "../../../core/Command/Command";
import askForQuestionText from "../../../core/sheet/methods/awaiting_questionText/askForQuestionText";
import addQuestion from "../../../core/sheet/methods/questions/addQuestion";
import { Ichat, Ichat_withNonEmptyFields } from "../../../core/sheet/models/ChatModel";


export type addQuestion_execute_return = {
    request: {
        action: 'add question';
        questionText: string;
        Tags?: string[];
        enabled?: boolean;
    },
    response: Ichat_withNonEmptyFields<'Questions' | 'lastqid'>,
} | {
    request: {
        action: 'ask to provide a questionText';
        questionText: null;
        Tags?: string[];
        enabled?: boolean;
    },
    response: Ichat,
} | {
    request: {
        action: 'ask to provide smaller questionText';
        questionText: null;
        Tags?: undefined;
        enabled?: boolean;
    },
    response: Ichat,
};


export type addQuestion_execute_args = addQuestion_execute_return["request"];

export type addQuestion_execute_action = addQuestion_execute_args["action"];


export default async function addQuestion_execute(msg: IIMessage, args: addQuestion_execute_args)
    : Promise<addQuestion_execute_return | null>
{
    const chatId = msg.chat.id;

    if (args.action === 'add question') {
        return {
            request: args,
            response: await addQuestion(chatId, {
                questionText: args.questionText,
                Tags: args.Tags,
                enabled: true
            }),
        };

    } else if (args.action === 'ask to provide a questionText') {
        return {
            request: args,
            response: await askForQuestionText(chatId, args.Tags),
        };

    } else if (args.action === 'ask to provide smaller questionText') {
        return {
            request: args,
            response: await askForQuestionText(chatId),
        };

    } else {
        // should never happen
        return null;

    }

}
