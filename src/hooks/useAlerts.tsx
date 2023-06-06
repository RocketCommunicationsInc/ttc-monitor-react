import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from "react";
import { generateAlert, generateAlerts } from "@astrouxds/mock-data";
import { Alert } from "@astrouxds/mock-data/dist/types";
import type { ModifyAlertParams, Children, GenerateOptions } from "../Types";

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
  deleteSelectedAlerts: () => void;
  clearAlerts: () => void;
  generate: (newGenerateOptions?: GenerateOptions) => void;
  stopGenerating: () => void;
  initialize: () => void;
  toggleSelected: (id: string) => void;
  selectAll: () => void;
  selectNone: () => void;
  allSelected: boolean;
  anySelected: boolean;
};

const AlertsContext = createContext<PropTypes>({
  alertIds: [],
  alerts: {},
  addAlert: () => null,
  editAlert: () => null,
  deleteSelectedAlerts: () => null,
  clearAlerts: () => null,
  generate: () => null,
  stopGenerating: () => null,
  initialize: () => null,
  toggleSelected: () => null,
  selectAll: () => null,
  selectNone: () => null,
  allSelected: false,
  anySelected: false,
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

  const allSelected = useMemo(() => {
    const alertsArray = Object.values(alerts);
    if (alertsArray.length) return alertsArray.every((alert) => alert.selected);
    else return false;
  }, [alerts]);

  const anySelected = useMemo(
    () => !Object.values(alerts).every((alert) => !alert.selected),
    [alerts]
  );

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

  const deleteSelectedAlerts = useCallback(() => {
    const filteredAlerts = { ...alerts };
    Object.entries(filteredAlerts).forEach(
      ([alertId, alert]: [string, Alert]) => {
        if (alert.selected) delete filteredAlerts[alertId];
      }
    );
    const filteredAlertIds = Object.keys(filteredAlerts);
    setAlertIds(filteredAlertIds);
    setAlerts(filteredAlerts);
  }, [alerts]);

  const toggleSelected = useCallback(
    (id: string) => {
      if (id in alerts) {
        setAlerts((prevState) => {
          const newState = { ...prevState };
          newState[id].selected = !alerts[id].selected;
          return newState;
        });
      }
    },
    [alerts]
  );

  const selectAll = useCallback(() => {
    const newAlerts = { ...alerts };
    for (const id in newAlerts) {
      newAlerts[id].selected = true;
    }
    setAlerts(newAlerts);
  }, [alerts]);

  const selectNone = useCallback(() => {
    const newAlerts = { ...alerts };
    for (const id in newAlerts) {
      newAlerts[id].selected = false;
    }
    setAlerts(newAlerts);
  }, [alerts]);

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
      deleteSelectedAlerts,
      clearAlerts,
      generate,
      stopGenerating,
      initialize,
      toggleSelected,
      selectAll,
      selectNone,
      allSelected,
      anySelected,
    }),
    [
      alertIds,
      alerts,
      addAlert,
      editAlert,
      deleteSelectedAlerts,
      generate,
      initialize,
      toggleSelected,
      selectAll,
      selectNone,
      allSelected,
      anySelected,
    ]
  );

  return (
    <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>
  );
};
