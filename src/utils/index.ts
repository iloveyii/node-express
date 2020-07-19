export function nRandomItems(items: any[], random_count: number) {
    // Get random_count random items from items
    const random10 = [...Array(random_count).keys()];
    const random_items = random10.map(() => {
        const num = items[Math.floor(Math.random() * items.length)];
        items = items.filter(item => item !== num);
        return num;
    });
    return random_items.sort((a, b) => Number(a) - Number(b));
}
