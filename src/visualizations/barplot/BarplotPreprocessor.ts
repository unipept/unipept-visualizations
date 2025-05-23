import {Bar, BarItem} from "./Bar";

export default class BarplotPreprocessor {

    /**
     * Returns a new set of bars that can be rendered by the barplot that only contain the first maxItems bars
     * (if maxItems is set, if it is undefined, no transformation will be applied). The overflowing categories
     * will be grouped into one "other" category. The returned array of bars will thus have a max length of
     * maxItems + 1.
     *
     * Secondly, the categories in the bars will also be sorted according to their size in the first bar. All other
     * bars will respect the order of the categories in the first bar.
     *
     * @param bars
     * @param maxItems
     */
    public computeMaxItemsInBars(
        bars: Bar[],
        maxItems: number | undefined
    ): Bar[] {
        // Clone the bars such that we can modify them without updating the data moved into this structure
        let outputBars = bars.map(b => { return { ... b } });

        // Determine which items are the largest and which should be moved into the "rest" category
        let firstBarItems = [...(bars[0].items)].sort((a, b) => b.counts - a.counts);

        if (maxItems !== undefined) {
            firstBarItems = firstBarItems.splice(0, maxItems);
        }

        // After sorting out the items of the first bar, make sure that the remaining bars use the same categories
        outputBars = bars.map(bar => {
            let otherCount = 0;

            const newItems: BarItem[] = [];

            // Count all items in this bar that are not in the first bar
            for (const currentItem of bar.items) {
                if (firstBarItems.findIndex(item => item.label === currentItem.label) >= 0) {
                    newItems.push(currentItem);
                } else {
                    otherCount += currentItem.counts;
                }
            }

            // Sort the current bar's items according to the order of the first bar
            const sortedBarItems = newItems.sort((a, b) => {
                const aIndex = firstBarItems.findIndex(item => item.label === a.label);
                const bIndex = firstBarItems.findIndex(item => item.label === b.label);

                return aIndex - bIndex;
            });

            return {
                label: bar.label,
                items: [
                    ...sortedBarItems,
                    {label: "Other", counts: otherCount}
                ]
            };
        });

        return outputBars;
    }

    /**
     * Convert the count values for each chunk of a bar from an absolute to a relative value.
     *
     * @param bars
     */
    public convertAbsoluteToRelative(
        bars: Bar[]
    ): Bar[] {
        return bars.map(bar => {
            const total = bar.items.reduce((sum, item) => sum + item.counts, 0);
            return {
                label: bar.label,
                items: bar.items.map(item => ({
                    label: item.label,
                    counts: (item.counts / total) * 100
                }))
            };
        });
    }
}
