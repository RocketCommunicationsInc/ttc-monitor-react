import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from "react";
import { generateAlert } from "../data/generators/alerts/generate-alert";
import { generateAlerts } from "../data/generators/alerts/generate-alerts";
import type {
  Alert,
  ModifyAlertParams,
  Children,
  GenerateOptions,
} from "../Types";

const defaultOptions = {
  initial: 5,
  interval: 2,
  limit: 74,
};

type PropTypes = {
  alertIds: string[];
  alerts: { [key: string]: Alert };
  addAlert: () => void;
  editAlert: (params: ModifyAlertParams) => void;
  deleteAlert: (id: string) => void;
  clearAlerts: () => void;
  generate: (newGenerateOptions?: GenerateOptions) => void;
  stopGenerating: () => void;
  initialize: () => void;
};

const AlertsContext = createContext<PropTypes>({
  alertIds: [],
  alerts: {},
  addAlert: () => null,
  editAlert: () => null,
  deleteAlert: () => null,
  clearAlerts: () => null,
  generate: () => null,
  stopGenerating: () => null,
  initialize: () => null,
});

export default function useAlerts() {
  return useContext(AlertsContext);
}

export const AlertsContextProvider = ({ children }: Children) => {
  const [alertIds, setAlertIds] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<{ [key: string]: Alert }>({});
  const [generating, setGenerating] = useState(false);
  const [generateOptions, setGenerateOptions] =
    useState<GenerateOptions>(defaultOptions);

  const addAlert = useCallback(() => {
    const newAlert = generateAlert();
    if (alertIds.length < generateOptions.limit) {
      setAlertIds((prevState) => [...prevState, newAlert.id]);
      setAlerts((prevState) => ({ ...prevState, [newAlert.id]: newAlert }));
    }
  }, [alertIds.length, generateOptions.limit]);

  const editAlert = useCallback((params: ModifyAlertParams) => {
    setAlerts((prevState) => {
      const alert = prevState[params.id];
      Object.entries(params).forEach(([key, value]) => {
        // @ts-expect-error key will be an alert property
        alert[key] = value;
      });
      return { ...prevState, [alert.id]: alert };
    });
  }, []);

  const deleteAlert = useCallback(
    (id: string) => {
      if (id in alerts) {
        const alertIdIndex = alertIds.findIndex((alertId) => alertId === id);
        const { [id]: value, ...newAlerts } = alerts;
        const newAlertIds = [...alertIds];
        newAlertIds.splice(alertIdIndex, 1);
        setAlertIds(newAlertIds);
        setAlerts(newAlerts);
      }
    },
    [alerts, alertIds]
  );

  const clearAlerts = () => {
    setAlertIds([]);
    setAlerts({});
  };

  const initialize = useCallback(() => {
    const generatedAlerts = generateAlerts(4);
    const newAlerts: { [key: string]: Alert } = {};
    const newAlertIds: string[] = [];
    generatedAlerts.forEach((alert) => {
      newAlertIds.push(alert.id);
      newAlerts[alert.id] = alert;
    });
    setAlertIds(newAlertIds);
    setAlerts(newAlerts);
  }, []);

  const generate = useCallback(
    (newGenerateOptions?: Partial<GenerateOptions>) => {
      if (newGenerateOptions && Object.keys(newGenerateOptions).length) {
        const newOptions = { ...generateOptions, newGenerateOptions };
        setGenerateOptions(newOptions);
      }
      setGenerating(true);
    },
    [generateOptions]
  );

  const stopGenerating = () => {
    setGenerating(false);
  };

  useEffect(() => {
    if (generating) {
      const generateData = setInterval(() => {
        addAlert();
      }, generateOptions.interval * 1000);
      return () => {
        clearInterval(generateData);
      };
    }
  }, [generating, generateOptions.interval, addAlert]);

  const value = useMemo(
    () => ({
      alertIds,
      alerts,
      addAlert,
      editAlert,
      deleteAlert,
      clearAlerts,
      generate,
      stopGenerating,
      initialize,
    }),
    [alertIds, alerts, addAlert, editAlert, deleteAlert, generate, initialize]
  );

  return (
    <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>
  );
};
