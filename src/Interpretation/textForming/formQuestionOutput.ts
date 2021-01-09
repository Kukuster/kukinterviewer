import getQuestions from "../../core/sheet/methods/questions/getQuestions";
import getTagDocByStr from "../../core/sheet/methods/tags/getTagDocByStr";
import { Iquestion } from "../../core/sheet/models/QuestionModel";


export const tagEnabledSing = '';
export const tagDisabledSign = '✖️';

export const questionDisabledSign = '➖';
export const questionDisabledByTagsSign = '◻️';
export const questionEnabledSign = '🟩';


/**
 * Forms a pretty-print string of a given question for Telegram chat. Assumes parse_mode='HTML'.
 * @param chatId 
 * @param question question document from the DB or a qid
 */
export default async function formQuestionOutput(chatId: number, question: Iquestion): Promise<string>;
export default async function formQuestionOutput(chatId: number, question: number): Promise<string | null>;
export default async function formQuestionOutput(chatId: number, question: Iquestion | number): Promise<string | null>;
export default async function formQuestionOutput(chatId: number, question: Iquestion | number) {

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
        tagsLine += '\n<i><b>Tags: ';
        for (let i = 0; i < Tags_len; i++) {
            const tag = await getTagDocByStr(chatId, Tags[i]);
            if (tag) {
                tagsLine += ` ${tag.enabled ? tagEnabledSing : tagDisabledSign}#${tag.str} `;
            }
        }
        tagsLine += '</b></i>\n';
    }

    let questionSign: typeof questionEnabledSign | typeof questionDisabledByTagsSign | typeof questionDisabledSign;

    if (question.enabled) {
        const allTagsStatus = (await Promise.all(Tags.map(tag => getTagDocByStr(chatId, tag))));
        const allTagsEnabled = allTagsStatus.every(Tag => Tag && Tag.enabled);

        if (allTagsEnabled) {
            questionSign = questionEnabledSign;
        } else {
            questionSign = questionDisabledByTagsSign;
        }

    } else {
        questionSign = questionDisabledSign;
    }


    return `${questionSign} <b><u>Question #${question.qid}</u></b>${tagsLine}
${question.questionText}`;
}
