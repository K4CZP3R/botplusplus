export default function removeIdsFromString(data: string): string {
    if (!data.includes('<#')) {
        console.log("data", data)
        return data
    }


    let startIdx = data.search('<#');
    let lastIdx = data.substring(startIdx).search('>');

    let cleaner = data.substring(0, startIdx) + data.substring(lastIdx + 1);

    return removeIdsFromString(cleaner)
}