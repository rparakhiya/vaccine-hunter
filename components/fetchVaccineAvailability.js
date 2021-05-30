import dayjs from 'dayjs';

export async function fetchVaccineAvailability(searchArea, areaCode) {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/availability?searchArea=${searchArea}&areaCode=${areaCode}`)
        .then(res => res.json());
}
