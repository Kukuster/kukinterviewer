export default function formList(Array: (string|number)[], format: {
    prefix?: string,
    suffix?: string,
    comma?: string,
    conj?: 'and' | 'or' | '&' | '',
} = {
    prefix: '#',
    comma: ',',
    conj: '',
}): string
{

    const prfx = format.prefix ? format.prefix : '';
    const sffx = format.suffix ? format.suffix : '';
    const conj = format.conj   ? format.conj   : '';
    const comma = format.comma ? format.comma  : '';

    const len = Array.length;

    if (len === 0) {
        return '';

    } else if (len === 1) {
        return `${prfx}${Array[0]}${sffx}`;

    } else if (len === 2) {
        return `${prfx}${Array[0]}${sffx}${conj ? ` ${conj} ` : `${comma} `}${prfx}${Array[1]}${sffx}`;

    } else {

        let str = '';

        const last = (i: number) => i === len - 1;
        const _2ndLast = (i: number) => i === len - 2;

        const glue = `${comma} `;
        const glue2ndLast = conj ? `${comma} ${conj} ` : `${comma} `;
        const glueLast = '';

        for (let i = 0; i < len; i++) {
            str += `${prfx}${Array[i]}${sffx}${last(i) ? glueLast : _2ndLast(i) ? glue2ndLast : glue}`;
        }

        return str;

    }
}
