export function converterMinutesToHourString(minutes: number): string{
    let hours = checkStartZero(Math.floor((minutes/60)));
    let tmpMinutes = checkStartZero(minutes%60);
    return `${hours}:${tmpMinutes}`;
}

function checkStartZero(num: number): string{
    if(num < 10) return `0${num}`;
    return `${num}`;
}