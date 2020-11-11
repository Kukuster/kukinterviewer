import { IIMessage } from "../../../core/Command/Command";
import addQuestion from "../../../core/sheet/methods/questions/addQuestion";

export default async function addQuestion_execute(msg: IIMessage, args: { questionText: NonNullable<string>, Tags?: string[], enabled?: boolean }) {

    const chatId = msg.chat.id;
    const questionText = args.questionText;
    const Tags = args.Tags;

    if (questionText){
        return {
            request: args,
            response: await addQuestion(chatId, { questionText, Tags, enabled: true })
        };
    } else {
        return {
            request: args,
            response: {
                error: 'unable to add a question with an empty questionText',
            },
        };
    };

};
