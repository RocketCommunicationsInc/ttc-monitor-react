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
  deleteAlerts: (id: string[]) => void;
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
  deleteAlerts: () => null,
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

  const allSelected = useMemo(
    () => Object.values(alerts).every((alert) => alert.selected),
    [alerts]
  );
  const anySelected = !Object.values(alerts).every((alert) => !alert.selected);

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

  const deleteAlerts = useCallback(
    (ids: string[]) => {
      const idArr = [...alertIds];
      const newAlerts = { ...alerts };
      ids.forEach((id) => {
        if (id in newAlerts) {
          const alertIdIndex = idArr.findIndex((alertId) => alertId === id);
          delete newAlerts[id];
          idArr.splice(alertIdIndex, 1);
        }
      });
      setAlertIds(idArr);
      setAlerts(newAlerts);
    },
    [alerts, alertIds]
  );

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
      deleteAlerts,
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
      deleteAlerts,
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
