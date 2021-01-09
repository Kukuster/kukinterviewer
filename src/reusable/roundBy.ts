export default function roundBy(n: number, divider: number = 1, where?: 'down' | 'up' | 'to the nearest') {
    switch (where){
        case 'down':
            return Math.floor(n / divider) * divider;
            break;
        case 'up':
            return Math.ceil(n / divider) * divider;
            break;
        case 'to the nearest':
        default:
            return Math.round(n / divider) * divider;
            break;
    }
}
