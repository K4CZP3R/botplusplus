export function streakTime(value: number): string[] {
    switch (value) {
        case 1:
            return ['1️⃣']
        case 5:
            return ['5️⃣']
        case 10:
            return ['🔟']
        case 19:
            return ['🔞']
        case 69:
            return ['👌']
        case 100:
            return ['💯']
        case 418:
            return ['🫖']
        case 420:
            return ['🚬']
        case 421:
            return ['🚭']
        case 911:
            return ['🛫', '🛩', '🏢']
        case 1234:
            return ['🔢']
        default:
            return [];
    }
}