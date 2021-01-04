import queryChat from "../functions/queryChat";

export type turnQuestionsOnOff_result =
{
    hasChanges: false,
    reason: 'no questions with such qids' |
            'the questions already have the specified status'
}
|
{
    hasChanges: true,
    qidsAffected: number[],
    qidsUnaffected: number[]
};

/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param qids list of `question` document `qid`s to switch `enabled` status. Will be validated.
 * @param status whether to turn on or off questions
 * @return {Promise<turnQuestionsOnOff_result>}
 *
 */
export default async function turnQuestionsOnOff(chatId: number, args: {qids: number[] | 'all', status: 'on' | 'off'})
    : Promise<turnQuestionsOnOff_result>
{
    const {qids, status} = args;

    return queryChat(chatId, { "Questions": true },
    (chat, save): turnQuestionsOnOff_result => {

        const applyStatus = status === 'on' ? true : false;

        const chatQuestions = Array.isArray(chat.Questions) ? chat.Questions : [];


        const queriedQuestions =
            qids === 'all' ?
                chatQuestions :
                chatQuestions.filter(cq => qids.includes(cq.qid));

        if (queriedQuestions.length === 0) {
            return {
                hasChanges: false,
                reason: 'no questions with such qids'
            };
        };



        let atLeastOne = false;

        const qidsAffected:   number[] = [];


        // for each of the specified questions
        queriedQuestions.forEach((q)=>{
            if (q.enabled !== applyStatus){
                atLeastOne = true;

                // apply the specified status
                q.enabled = applyStatus;

                // add to the list of affected questions, if not already
                qidsAffected.indexOf(q.qid) === -1 ? qidsAffected.push(q.qid) : '';

            };
        });

        if (!atLeastOne) {
            return {
                hasChanges: false,
                reason: 'the questions already have the specified status'
            };
        };


        const qidsUnaffected = queriedQuestions.map(q=>q.qid).filter(x => !qidsAffected.includes(x));

        save();

        return {
            hasChanges: true,
            qidsAffected: qidsAffected,
            qidsUnaffected: qidsUnaffected
        };

    });

};
