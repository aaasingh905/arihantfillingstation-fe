export const formatDate = (value) => {
  if (value) {
    let date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    let month = date
      .toLocaleString('default', { month: 'short' })
      .toUpperCase();
    if (month === 'SEP') {
      month = 'SEPT';
    }
    const year = date.toLocaleString('default', { year: 'numeric' });
    return day + '-' + month + '-' + year;
  }
  return false;
};
