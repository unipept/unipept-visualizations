import { Bar } from './Bar';

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
    computeMaxItemsInBars(bars: Bar[], maxItems: number | undefined): Bar[];
    /**
     * Convert the count values for each chunk of a bar from an absolute to a relative value.
     *
     * @param bars
     */
    convertAbsoluteToRelative(bars: Bar[]): Bar[];
}
