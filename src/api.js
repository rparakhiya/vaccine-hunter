import dayjs from 'dayjs';

export async function fetchVaccineAvailability(searchArea = 'district') {
    const today = dayjs();
    const dates = [
        today,
        today.add(7, 'day').startOf('week')
    ]
    .map(date => date.format('DD-MM-YYYY'));

    const availability = [];
    for(const date of dates) {
        const data = await getAvailability(date, searchArea);
        availability.push(data);
    }

    return availability;

    // Fake data
    // const data = [
    //     {
    //         date: dayjs().format('DD-MM-YYYY'),
    //         centers: [{"center_id":666775,"name":"Vasti Clinic Viman Nagar","address":"Viman Nagar Vasti Clinic Yamuna Nagar Pune","state_name":"Maharashtra","district_name":"Pune","block_name":"Haveli","pincode":411014,"lat":18,"long":73,"from":"10:00:00","to":"17:00:00","fee_type":"Free","sessions":[{"session_id":"b68b99ec-fa4c-490f-82da-cbcf146af2d1","date":"30-05-2021","available_capacity":57,"min_age_limit":45,"vaccine":"COVISHIELD","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":57,"available_capacity_dose2":0}]},{"center_id":668150,"name":"Kharadi Hospital PMC","address":"Nagar Hadapsar Bypass","state_name":"Maharashtra","district_name":"Pune","block_name":"Haveli","pincode":411014,"lat":18,"long":73,"from":"10:00:00","to":"17:00:00","fee_type":"Free","sessions":[{"session_id":"62341b8f-7010-421f-ae6a-cbe81f49c8fd","date":"30-05-2021","available_capacity":49,"min_age_limit":45,"vaccine":"COVISHIELD","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":49,"available_capacity_dose2":0}]},{"center_id":607164,"name":"Wadgaonsheri Minatai Thakre","address":"Wadgaonsheri","state_name":"Maharashtra","district_name":"Pune","block_name":"Haveli","pincode":411014,"lat":18,"long":73,"from":"10:00:00","to":"17:00:00","fee_type":"Free","sessions":[{"session_id":"12876106-4d79-4c08-b54b-6d93f2bc2ca7","date":"30-05-2021","available_capacity":47,"min_age_limit":45,"vaccine":"COVISHIELD","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":47,"available_capacity_dose2":0}]},{"center_id":668146,"name":"Galande Hospital Nagar Road","address":"Kalyani Nagar Shastri Chouk Pune","state_name":"Maharashtra","district_name":"Pune","block_name":"Haveli","pincode":411014,"lat":18,"long":73,"from":"10:00:00","to":"17:00:00","fee_type":"Free","sessions":[{"session_id":"4fdc9ea5-fae9-410b-bec5-ef516dcd248c","date":"30-05-2021","available_capacity":0,"min_age_limit":45,"vaccine":"COVAXIN","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":0,"available_capacity_dose2":0}]},{"center_id":716148,"name":"Apollo Clinic Kharadi","address":"Floor Cool Space Oppo Reliance Mart Kharadi Pune","state_name":"Maharashtra","district_name":"Pune","block_name":"Haveli","pincode":411014,"lat":18,"long":73,"from":"10:00:00","to":"17:00:00","fee_type":"Paid","sessions":[{"session_id":"ad6c5909-34b4-4ae6-b569-36a17189e81f","date":"31-05-2021","available_capacity":0,"min_age_limit":18,"vaccine":"COVISHIELD","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":0,"available_capacity_dose2":0},{"session_id":"33fbc060-1b13-4ee4-81cf-a8fdbdbe78fe","date":"31-05-2021","available_capacity":0,"min_age_limit":45,"vaccine":"COVISHIELD","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":0,"available_capacity_dose2":0}],"vaccine_fees":[{"vaccine":"COVISHIELD","fee":"850"}]},{"center_id":718749,"name":"APOLLO CLINIC VIMAN NAGAR","address":"1ST FLOOR NYATI MILLENIUM SOCIETY VIMAN NAGAR","state_name":"Maharashtra","district_name":"Pune","block_name":"Haveli","pincode":411014,"lat":18,"long":73,"from":"10:00:00","to":"17:00:00","fee_type":"Paid","sessions":[{"session_id":"adee0541-f45f-4cca-84ec-6e6e71ff0b11","date":"31-05-2021","available_capacity":1,"min_age_limit":45,"vaccine":"COVISHIELD","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":1,"available_capacity_dose2":0},{"session_id":"80f2d659-e0f9-4f8d-b6d3-fd00bfd1cfea","date":"31-05-2021","available_capacity":0,"min_age_limit":18,"vaccine":"COVISHIELD","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":0,"available_capacity_dose2":0}],"vaccine_fees":[{"vaccine":"COVISHIELD","fee":"850"}]}]
    //     },
    //     {
    //         date: dayjs().add(1, 'day').format('DD-MM-YYYY'),
    //         centers: [{"center_id":666775,"name":"Vasti Clinic Viman Nagar","address":"Viman Nagar Vasti Clinic Yamuna Nagar Pune","state_name":"Maharashtra","district_name":"Pune","block_name":"Haveli","pincode":411014,"lat":18,"long":73,"from":"10:00:00","to":"17:00:00","fee_type":"Free","sessions":[{"session_id":"b68b99ec-fa4c-490f-82da-cbcf146af2d1","date":"30-05-2021","available_capacity":57,"min_age_limit":45,"vaccine":"COVISHIELD","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":57,"available_capacity_dose2":0}]},{"center_id":668150,"name":"Kharadi Hospital PMC","address":"Nagar Hadapsar Bypass","state_name":"Maharashtra","district_name":"Pune","block_name":"Haveli","pincode":411014,"lat":18,"long":73,"from":"10:00:00","to":"17:00:00","fee_type":"Free","sessions":[{"session_id":"62341b8f-7010-421f-ae6a-cbe81f49c8fd","date":"30-05-2021","available_capacity":49,"min_age_limit":45,"vaccine":"COVISHIELD","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":49,"available_capacity_dose2":0}]},{"center_id":607164,"name":"Wadgaonsheri Minatai Thakre","address":"Wadgaonsheri","state_name":"Maharashtra","district_name":"Pune","block_name":"Haveli","pincode":411014,"lat":18,"long":73,"from":"10:00:00","to":"17:00:00","fee_type":"Free","sessions":[{"session_id":"12876106-4d79-4c08-b54b-6d93f2bc2ca7","date":"30-05-2021","available_capacity":47,"min_age_limit":45,"vaccine":"COVISHIELD","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":47,"available_capacity_dose2":0}]},{"center_id":668146,"name":"Galande Hospital Nagar Road","address":"Kalyani Nagar Shastri Chouk Pune","state_name":"Maharashtra","district_name":"Pune","block_name":"Haveli","pincode":411014,"lat":18,"long":73,"from":"10:00:00","to":"17:00:00","fee_type":"Free","sessions":[{"session_id":"4fdc9ea5-fae9-410b-bec5-ef516dcd248c","date":"30-05-2021","available_capacity":0,"min_age_limit":45,"vaccine":"COVAXIN","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":0,"available_capacity_dose2":0}]},{"center_id":716148,"name":"Apollo Clinic Kharadi","address":"Floor Cool Space Oppo Reliance Mart Kharadi Pune","state_name":"Maharashtra","district_name":"Pune","block_name":"Haveli","pincode":411014,"lat":18,"long":73,"from":"10:00:00","to":"17:00:00","fee_type":"Paid","sessions":[{"session_id":"ad6c5909-34b4-4ae6-b569-36a17189e81f","date":"31-05-2021","available_capacity":0,"min_age_limit":18,"vaccine":"COVISHIELD","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":0,"available_capacity_dose2":0},{"session_id":"33fbc060-1b13-4ee4-81cf-a8fdbdbe78fe","date":"31-05-2021","available_capacity":0,"min_age_limit":45,"vaccine":"COVISHIELD","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":0,"available_capacity_dose2":0}],"vaccine_fees":[{"vaccine":"COVISHIELD","fee":"850"}]},{"center_id":718749,"name":"APOLLO CLINIC VIMAN NAGAR","address":"1ST FLOOR NYATI MILLENIUM SOCIETY VIMAN NAGAR","state_name":"Maharashtra","district_name":"Pune","block_name":"Haveli","pincode":411014,"lat":18,"long":73,"from":"10:00:00","to":"17:00:00","fee_type":"Paid","sessions":[{"session_id":"adee0541-f45f-4cca-84ec-6e6e71ff0b11","date":"31-05-2021","available_capacity":1,"min_age_limit":45,"vaccine":"COVISHIELD","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":1,"available_capacity_dose2":0},{"session_id":"80f2d659-e0f9-4f8d-b6d3-fd00bfd1cfea","date":"31-05-2021","available_capacity":0,"min_age_limit":18,"vaccine":"COVISHIELD","slots":["10:00AM-12:00PM","12:00PM-02:00PM","02:00PM-04:00PM","04:00PM-05:00PM"],"available_capacity_dose1":0,"available_capacity_dose2":0}],"vaccine_fees":[{"vaccine":"COVISHIELD","fee":"850"}]}]
    //     }
    // ];

    // return Promise.resolve(data);
}

function getAvailability(date, searchArea) {
    const pincode = process.env.REACT_APP_PINCODE;
    const districtId = process.env.REACT_APP_DISTRICT_ID;
    const url = searchArea === 'pincode' ? `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}`
        : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${date}`;

    return fetch(url)
        .then(res => res.json())
        .then(data => ({
            date: date,
            centers: data.centers
        }));
}