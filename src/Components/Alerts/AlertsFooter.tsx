import { RuxButton } from "@astrouxds/react";
import useAlerts from "../../hooks/useAlerts";

const styles = {
  footer: {
    display: "flex",
    justifyContent: "center",
    borderTop: "1px solid var(--logHeaderBackgroundColor, rgb(20, 32, 44))",
    boxShadow: " 0 -0.5rem 1.25rem rgba(0, 0, 0, 0.25)",
    paddingTop: "1.5rem",
  },
  dismissBtn: {
    marginRight: "1rem",
    paddingBottom: "1.5rem",
  },
};

type PropTypes = {
  slot: string;
};

const AlertsFooter = ({ slot }: PropTypes) => {
  const { anySelected, deleteSelectedAlerts } = useAlerts();

  return (
    <footer style={styles.footer} slot={slot}>
      <RuxButton
        secondary
        onClick={deleteSelectedAlerts}
        style={styles.dismissBtn}
        disabled={!anySelected}
      >
        Dismiss
      </RuxButton>
      <RuxButton
        onClick={deleteSelectedAlerts}
        disabled={!anySelected}
        style={{ paddingBottom: "1.5rem" }}
      >
        Acknowledge
      </RuxButton>
    </footer>
  );
};

export default AlertsFooter;
