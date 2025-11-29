import dayjs from 'dayjs';
import 'dayjs/locale/es';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('es');

export const translateDate = (utcDate: string, onlyDate: boolean = false) => {
    const localDate = dayjs.utc(utcDate).tz('America/Bogota');
    const dateFormat = onlyDate ? 'D [de] MMMM [de] YYYY' : 'dddd, D [de] MMMM [de] YYYY h:mm A';
    return localDate.format(dateFormat);
};
