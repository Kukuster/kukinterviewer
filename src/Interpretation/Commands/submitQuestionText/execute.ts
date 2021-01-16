import { IIMessage } from "../../../bot/botlib";
import finishAddingQuestionText from "../../../core/sheet/methods/awaiting_questionText/finishAddingQuestionText";
import getAwaitingQuestionTags from "../../../core/sheet/methods/awaiting_questionText/getAwaitingQuestionTags";
import askForQuestionText from "../../../core/sheet/methods/awaiting_questionText/askForQuestionText";
import addQuestion from "../../../core/sheet/methods/questions/addQuestion";
import { Ichat } from "../../../core/sheet/models/ChatModel";


export type submitQuestionText_execute_args = {
    action: 'add question';
    questionText: string;
    Tags?: string[];
    enabled?: boolean;
} | {
    action: 'ask to provide a questionText (only Tags provided)';
    questionText: null;
    Tags?: string[];
    enabled?: boolean;
} | {
    action: 'ask to provide smaller questionText';
    questionText: null;
    enabled?: boolean;
} | {
    action: 'deny';
};

export type submitQuestionText_execute_action = 'add question' | 'deny' | 'ask to provide a questionText (only Tags provided)' | 'ask to provide smaller questionText';

export type submitQuestionText_execute_return = {
    request: submitQuestionText_execute_args,
    response: Ichat,
};


export default async function submitQuestionText_execute(msg: IIMessage, args: submitQuestionText_execute_args)
    : Promise<submitQuestionText_execute_return>
{

    const chatId = msg.chat.id;


    if (args.action === 'deny') {
        return {
            request: args,
            response: await finishAddingQuestionText(chatId),
        };

    } else if (args.action === 'add question') {
        finishAddingQuestionText(chatId);
        
        const awaitingTags = await getAwaitingQuestionTags(chatId);

        const Tags = awaitingTags ?
            awaitingTags.concat(args.Tags || []) :
            args.Tags;
        
        return {
            request: args,
            response: await addQuestion(chatId, {
                questionText: args.questionText,
                Tags: Tags,
                enabled: true
            }),
        };

    } else if (args.action === 'ask to provide a questionText (only Tags provided)') {
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
