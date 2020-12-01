import moment from 'moment-timezone';

const timeFormat = (date: Date) => {
  return moment.tz(String(date), 'Asia/Seoul').format();
};

export default timeFormat;
