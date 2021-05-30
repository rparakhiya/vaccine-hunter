import {useState} from 'react';
import { fetchVaccineAvailability } from './fetchVaccineAvailability';
import { Checkbox, Table } from 'semantic-ui-react'
import { useEffect } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';

function AvailabilityTracker({ageLimit, searchArea, areaCode, vaccineAvailabilityInitialData}) {
  const [vaccineAvailability, setVaccineAvailability] = useState(vaccineAvailabilityInitialData);
  const [dataUpdatedOn, setDataUpdatedOn] = useState(null);
  const [showAvailableCentersOnly, setShowAvailableCentersOnly] = useState(true);

  function refreshData() {
    return fetchVaccineAvailability(searchArea, areaCode)
        .then(availability => {
          setVaccineAvailability(availability);
          setDataUpdatedOn(dayjs());
        });
  }

  useEffect(() => {
    refreshData(searchArea);
  }, [searchArea]);

  useEffect(() => {
    const timer = setInterval(refreshData,
      60000
    );
    return () => clearInterval(timer);
  }, [vaccineAvailability]);

  function getRowClassName(availableDoses) {
    return availableDoses > 10 ? 'available' :
      availableDoses > 0 ? 'few_available' :
      'unavailable';
  }

  function renderCenter(availability) {
    return _(availability?.centers)?.map(center => {
        const sessions = center.sessions.filter(session => session.min_age_limit === ageLimit);
        const doses = sessions.reduce((totalDoses, session) => totalDoses + session.available_capacity_dose1, 0);
        
        return {
          date: availability.date,
          name: center.name,
          center_id: center.center_id,
          address: center.address,
          doses: doses
        };
      })
      .sortBy(row => row.doses)
      .reverse().value()
      .filter(row => row.doses || !showAvailableCentersOnly)
      .map(row => (<Table.Row key={`${row.date}_${row.center_id}`} className={getRowClassName(row.doses)}>
            <Table.Cell>{row.date}</Table.Cell>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.address}</Table.Cell>
            <Table.Cell>{row.doses}</Table.Cell>
        </Table.Row>)
      );
  }

  function renderRows(vaccineAvailability) {
    const rows = _(vaccineAvailability)?.flatMap(availability => renderCenter(availability)).value();
    return rows.length > 0 ? rows : (
      <Table.Row>
        <Table.Cell colSpan="4" textAlign="center">
          No slots available! 😕
        </Table.Cell>
      </Table.Row>
    );
  }

  function searchAreaChanged(e, {value}) {
    setSearchArea(value);
  }

  function RenderFilterControls() {
    return (
      <>
        <Checkbox
          toggle
          label='Show Available Centers Only'
          name='available_centers_only'
          value='showAvailableCentersOnly'
          checked={showAvailableCentersOnly}
          onChange={(e, {checked}) => setShowAvailableCentersOnly(checked)}
          className="filter-controls"
          style={{float: 'right'}}
        />
      </>
    );
  }

  return (
    <div className="App">
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
                {RenderFilterControls()}
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Center</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>{`Available Slots (${ageLimit}+)`}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {renderRows(vaccineAvailability)}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='4'>
              Last updated on: {dataUpdatedOn?.format('DD-MM-YYYY hh:mm:ss a')}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}

export default AvailabilityTracker;
