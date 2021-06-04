import Head from "next/head";
import styles from "../../../../../styles/Home.module.css";
import AvailabilityTracker from "../../../../../components/AvailabilityTracker";
import { useRouter } from "next/router";
import { fetchVaccineAvailability } from "../../../../../components/fetchVaccineAvailability";
import { Segment, List } from "semantic-ui-react";

export default function AvailabilityByPincode({ vaccineAvailability }) {
  const router = useRouter();
  const { searchArea, areaCode, ageLimit, doseNumber } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>Check Vaccine availability</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Segment className={styles.header}>
        <List>
          <List.Item>
            <strong>{searchArea}</strong>: {areaCode}
          </List.Item>
          <List.Item>
            <strong>Age:</strong> {ageLimit}+
          </List.Item>
          <List.Item>
            <strong>Dose:</strong> {doseNumber}
          </List.Item>
        </List>
      </Segment>
      <main className={styles.main}>
        <AvailabilityTracker
          ageLimit="18"
          searchArea={searchArea}
          areaCode={areaCode}
          ageLimit={ageLimit}
          doseNumber={doseNumber}
          vaccineAvailabilityInitialData={vaccineAvailability}
        />
      </main>

      <footer className={styles.footer}>💻 by Rumit Parakhiya</footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { searchArea, areaCode } = context.params;
  const vaccineAvailability = await fetchVaccineAvailability(
    searchArea,
    areaCode
  );
  return { props: { vaccineAvailability } };
}
