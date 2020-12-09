import { IIMessage } from "../../../core/Command/Command";
import finishAddingQuestionText from "../../../core/sheet/methods/awaiting_questionText/finishAddingQuestionText";
import getAwaitingQuestionTags from "../../../core/sheet/methods/awaiting_questionText/getAwaitingQuestionTags";
import askForQuestionText from "../../../core/sheet/methods/awaiting_questionText/askForQuestionText";
import addQuestion from "../../../core/sheet/methods/questions/addQuestion";
import { Ichat } from "../../../core/sheet/models/ChatModel";
import { addQuestion_execute_args } from "../addQuestion/execute";


export default async function submitQuestionText_execute(msg: IIMessage, args: addQuestion_execute_args | 'deny')
    : Promise<{
        request: addQuestion_execute_args,
        response: Ichat,
        result?: 'adding a new question',
    } | {
        request: addQuestion_execute_args,
        response: Ichat,
        result: 'only tags provided',
    } | {
        request: 'deny',
        response: boolean,
        result: 'denied',
    }>
{

    const chatId = msg.chat.id;


    if (args === 'deny') {
        return {
            request: args,
            response: await finishAddingQuestionText(chatId),
            result: 'denied',
        };
    } else {
        if (args.questionText) {
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
                result: 'adding a new question',
            };
        } else {

            return {
                request: args,
                response: await askForQuestionText(chatId, args.Tags),
                result: 'only tags provided',
            };
        }
    }

}
