export const calcTimeToShow = (timeToCalc, velActual=1, inc=false) => {
    if (!timeToCalc) {
    return ""
    }
    // const val60 = 60;
    const val10 = 10;
    const val3600 = inc ? 3600*velActual : 3600/velActual;
    const val60 = inc ? 60*velActual : 60/velActual;
    // const val10 = inc ? 10*velActual : 10/velActual;
    const sec_num = parseInt(timeToCalc, val10);
    // let hours   = Math.floor(sec_num / val3600);
    // let minutes = Math.floor((sec_num - (hours * val3600)) / val60);
    let hours   = Math.floor(sec_num / val3600);
    let minutes = Math.floor((sec_num - (hours * val3600)) / val60);
    let seconds = sec_num - (hours * val3600) - (minutes * val60);

    let hourSeparator = ':';
    const minuteSeparator = ':';

    if(hours == 0){hours = '';hourSeparator = '';}
    // if (minutes < 10 && hours != 0) {minutes = "0"+minutes;}
    // if (seconds < 10) {seconds = "0"+seconds;}
    if (minutes < val10 && hours != 0) {minutes = "0"+minutes;}
    if (seconds < val10) {seconds = "0"+seconds;}
    const time = hours+hourSeparator+minutes+minuteSeparator+seconds;
    return time;
}
