import moment from 'moment-timezone';

const timeStamp = () => {
  return moment.tz(new Date(), 'Asia/Seoul').format();
};

export default timeStamp;
