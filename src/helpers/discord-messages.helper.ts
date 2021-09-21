export default function removeIdsFromString(data: string): string {
    if (data.includes('<')) {
        let sIdx = data.search('<');

        let eIdx = data.search('>') + sIdx;

        let newData = data.substring(0, sIdx) + data.substring(eIdx + 1)
        return removeIdsFromString(newData)
    }

    return data;




}