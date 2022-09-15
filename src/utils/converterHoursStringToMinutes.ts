export function converterHourStringToMinutes(hourString: string): number{
    let [ hours, minutes] = hourString.split(":").map(Number);
    minutes += (hours * 60);
    return minutes;
}