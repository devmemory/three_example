const util = {
    delay: (ms: number) => {
        // ms 만큼 딜레이
        return new Promise<void>((res) => {
            const timer = setTimeout(() => {
                res();
                clearTimeout(timer);
            }, ms);
        });
    },
    browserSupport: () => {
        
    },
    getQueryParam: (key: string) => {
        // query param 가져오기 없을 때 null

        const params = new URLSearchParams(window.location.search);

        return params.get(key);
    },
    generateNumber: () => {
        const min = 1;
        const max = 9;

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

export default util;