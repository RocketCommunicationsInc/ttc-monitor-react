import { useState, useEffect, useCallback, useMemo } from "react";
import { generateAlert } from "../data/lib/alerts/generate-alert";

import type { Alert, ModifyAlertParams } from "../Types/alerts";
import type { SubscribeOptions } from "../data/types";
import type { GenerateAlertOptions } from "../Types/alerts";

const defaultOptions = {
  initial: 5,
  interval: 2,
  limit: 236,
};

const useAlerts = () => {
  const [alertIds, setAlertIds] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<{ [key: string]: Alert }>({});
  const [generating, setGenerating] = useState(false);
  const [generateOptions, setGenerateOptions] =
    useState<GenerateAlertOptions>(defaultOptions);

  const addAlert = useCallback(() => {
    const newAlert = generateAlert();
    setAlertIds((prevState) => [...prevState, newAlert.id]);
    setAlerts((prevState) => ({ ...prevState, [newAlert.id]: newAlert }));
  }, []);

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

  const generate = useCallback(
    (newGenerateOptions?: SubscribeOptions) => {
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
    }),
    [alertIds, alerts, addAlert, editAlert, deleteAlert, generate]
  );

  return value;
};

export default useAlerts;
