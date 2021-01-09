import getQuestions from "../../core/sheet/methods/questions/getQuestions";
import getTagDocByStr from "../../core/sheet/methods/tags/getTagDocByStr";
import { Iquestion } from "../../core/sheet/models/QuestionModel";

/**
 * Forms text for asking a question from either a question document or qid for Telegram chat. Assumes parse_mode='HTML'
 * @param chatId
 * @param question question document from the DB or a qid
 */
export default async function formQuestionAsked(chatId: number, question: Iquestion): Promise<string>;
export default async function formQuestionAsked(chatId: number, question: number): Promise<string | null>;
export default async function formQuestionAsked(chatId: number, question: Iquestion | number): Promise<string | null>;
export default async function formQuestionAsked(chatId: number, question: Iquestion | number) {

    if (typeof question === 'number') {
        question = (await getQuestions(chatId, [question]))[0];
    }
    if (!question) {
        return null;
    }

    const Tags = question.Tags;
    const Tags_len = Tags.length;
    let tagsLine = '';

    if (Tags_len) {
        tagsLine += '<i><b>Tags: ';
        for (let i = 0; i < Tags_len; i++) {
            const tag = await getTagDocByStr(chatId, Tags[i]);
            if (tag) {
                tagsLine += ` #${tag.str} `;
            }
        }
        tagsLine += '</b></i>\n';
    }

    return `<b><u>Question</u></b>
${tagsLine}
${question.questionText}`;
}
