export const calcRecordingTime = (timeStamp: number): string => {
    let hours;
    let minutes;
    let seconds;
    if (timeStamp) {
        hours = Math.floor(timeStamp / 1200).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        minutes = Math.floor(timeStamp / 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        seconds = Math.floor(timeStamp % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    } else {
        minutes = (0).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        seconds = (0).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    }
    return `${hours}:${minutes}:${seconds}`;
};
