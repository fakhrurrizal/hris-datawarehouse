export function formatNumberWithSeparator(number = 0, locale = 'id-ID', maximumFractionDigits = 2): string {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'decimal',
        maximumFractionDigits: maximumFractionDigits,
        useGrouping: true,
    })

    return formatter.format(number)
}

export function toTitleCase(str: string): string {
    const words = str.split(' ')

    const titleCaseWords = words.map(word => {
        const firstLetter = word.charAt(0).toUpperCase()
        const restOfWord = word.slice(1).toLowerCase()

        return `${firstLetter}${restOfWord}`
    })

    const titleCaseStr = titleCaseWords.join(' ')

    return titleCaseStr
}

export function formatToIDR(number?: number): string {
    if (!number) return 'Rp. 0'

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Mengatur jumlah digit desimal minimum menjadi 0
        maximumFractionDigits: 0,
    })

    return formatter.format(number)
}
