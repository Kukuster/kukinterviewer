export default function formList(Array: (string|number)[], format: {
    prefix?: string,
    suffix?: string,
    comma?: string,
    conj?: 'and' | 'or' | '&' | '',
    noSpaces?: true,
} = {
    prefix: '#',
    comma: ',',
    conj: '',
}): string
{

    // define format with applying defaults to not specified props:
    const prfx    = format.prefix   !== undefined ? format.prefix : '';
    const sffx    = format.suffix   !== undefined ? format.suffix : '';
    const conj    = format.conj     !== undefined ? format.conj   : '';
    const comma   = format.comma    !== undefined ? format.comma  : ',';
    const noSpace = format.noSpaces !== undefined ? format.noSpaces : false;


    const len = Array.length;

    const s = noSpace ? '' : ' ';

    if (len === 0) {
        return '';

    } else if (len === 1) {
        return `${prfx}${Array[0]}${sffx}`;

    } else if (len === 2) {
        return `${prfx}${Array[0]}${sffx}${conj ? `${s}${conj}${s}` : `${comma}${s}`}${prfx}${Array[1]}${sffx}`;

    } else {

        let str = '';

        const last = (i: number) => i === len - 1;
        const _2ndLast = (i: number) => i === len - 2;

        const glue = `${comma}${s}`;
        const glue2ndLast = conj ? `${comma}${s}${conj}${s}` : `${comma}${s}`;
        const glueLast = '';

        for (let i = 0; i < len; i++) {
            str += `${prfx}${Array[i]}${sffx}${last(i) ? glueLast : _2ndLast(i) ? glue2ndLast : glue}`;
        }

        return str;

    }
}
