self.onmessage = function(event) {
    if (event.data === "start") {
        let count = 0;
        setInterval(() => {
            count++;
            self.postMessage(count);
        }, 1000);
    }
};
