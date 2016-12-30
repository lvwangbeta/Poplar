export function formatDate(ts) {
  var currentTs = new Date().getTime();
  var diffTs = currentTs - ts;

  //year
  var years = diffTs / (365 * 24 * 3600 * 1000);

  if(years >= 1.0) {
    return Math.ceil(years) + '年前';
  }

  //days
  var days = diffTs / (24 * 3600 * 1000);
  if(days >= 1.0) {
    return Math.ceil(days) + '天前';
  }

  //hours
  var hours = diffTs / (3600 * 1000);
  if(hours >= 1.0) {
    return Math.ceil(hours) + '小时前';
  }

  //minutes
  var minutes = diffTs / (60 * 1000);
  if(minutes >= 1.0 ) {
      return Math.ceil(minutes) + '分钟前';
  }

  return '刚刚';

}
