import { RuxButton } from "@astrouxds/react";
import useAlerts from "../../hooks/useAlerts";

const styles = {
  footer: {
    display: "flex",
    justifyContent: "center",
    borderTop: "1px solid var(--logHeaderBackgroundColor, rgb(20, 32, 44))",
    boxShadow: " 0 -0.5rem 1.25rem rgba(0, 0, 0, 0.25)",
    height: "3rem",
    padding: "2rem",
    position: "sticky" as "sticky",
    bottom: 0,
    backgroundColor: "#1B2D3E",
  },
};

const AlertsFooter = () => {
  const { anySelected, deleteSelectedAlerts } = useAlerts();

  return (
    <footer style={styles.footer}>
      <RuxButton
        secondary
        onClick={deleteSelectedAlerts}
        style={{ marginRight: "1rem" }}
        disabled={!anySelected}
      >
        Dismiss
      </RuxButton>
      <RuxButton onClick={deleteSelectedAlerts} disabled={!anySelected}>
        Acknowledge
      </RuxButton>
    </footer>
  );
};

export default AlertsFooter;
