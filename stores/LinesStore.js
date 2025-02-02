import { defineStore } from "pinia";

export const useLineStore = defineStore("lineStore",{
    state: () => ({
        lines: [
            {
                id: "l1",
                name: "Line 1",
                color: "#ed1b2d",
                Stations: []
            },
        ]
    }),
    actions:{

    }
});
