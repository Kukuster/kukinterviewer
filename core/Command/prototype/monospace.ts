/**
 * Telegram formating: monospace text
 * Requires `parse_mode: 'Markdown'` option to be added to options object (3rd argument for bot.sendMessage method)
 * 
 * added endlines affect message design, but it doen't work on all devices without them
 */
export default function monospace(str: string): string { 
    return '```\n' + str + '\n```'
};
