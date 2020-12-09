/**
 * 
 * Removes lines that contain only tags from the questionText
 * and trims any trailing and leading whitespace
 * 
 * @param questionText cut question text
 */
export default function (questionText: string): string { 
    questionText = questionText.replace(/^((\s)*|(#([0-9_]*([a-zA-Z]+[0-9_]*)+))*)*$/gm, '');
    return questionText.trim();
}
