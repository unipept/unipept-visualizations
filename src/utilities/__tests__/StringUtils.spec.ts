import StringUtils from "./../StringUtils";

describe("StringUtils.stringHash", () => {
    it("produces different hashes for different input strings", () => {
        const previouslyCreatedHashes: number[] = [];
        const inputStrings = [
            "monstrous",
            "priority",
            "moving",
            "variant",
            "trainer",
            "species",
            "monk",
            "hope",
            "explode",
            "wolf",
            "Kaleidoscope"
        ];

        for (const input of inputStrings) {
            const hash = StringUtils.stringHash(input);
            expect(previouslyCreatedHashes.includes(hash)).toBeFalsy();
            previouslyCreatedHashes.push(hash);
        }
    });

    it("produces the same hash for same inputs", () => {
        const s1 = "AAABBB";
        const s2 = "CCCCDDD";

        const h1 = StringUtils.stringHash(s1);
        const h2 = StringUtils.stringHash(s2);
        const h3 = StringUtils.stringHash(s1);
        const h4 = StringUtils.stringHash(s2);

        expect(h1).toEqual(h3);
        expect(h2).toEqual(h4);
    });
});
