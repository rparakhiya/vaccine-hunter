import dayjs from 'dayjs';

export default (req, res) => {
  const {searchArea, areaCode} = req.query;

  const today = dayjs();
  const dates = [
      today,
      today.add(7, 'day').startOf('week')
  ]
  .map(date => date.format('DD-MM-YYYY'));

  const promises = dates.map(date => {
    const url = searchArea === 'pincode' ? `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${areaCode}&date=${date}`
        : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${areaCode}&date=${date}`;

    return fetch(url, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
        .then(res => res.json())
        .then(data => ({
            date: date,
            centers: data.centers
        }));
  });
  
  return Promise.all(promises)
    .then((values) => {
      res.json(values);
    });
}
