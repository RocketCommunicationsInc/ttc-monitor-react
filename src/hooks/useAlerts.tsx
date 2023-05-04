import { useState, useEffect } from "react";
import { generateAlert } from "../data/lib/alerts/generate-alert";
import { generateAlerts } from "../data/lib/alerts/generate-alerts";

import type { Alert, ModifyAlertParams } from "../Types/alerts";
import type { SubscribeOptions } from "../data/types";

const useAlerts = () => {
  const [alertIds, setAlertIds] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<{ [key: string]: Alert }>({});
  const [generating, setGenerating] = useState(false);
  const [generateOptions, setGenerateOptions] = useState<SubscribeOptions>({});

  const addAlert = () => {
    const newAlert = generateAlert();
    setAlertIds([...alertIds, newAlert.id]);
    setAlerts({ ...alerts, [newAlert.id]: newAlert });
  };

  const editAlert = (params: ModifyAlertParams) => {
    const alert = alerts[params.id];
    Object.entries(params).forEach(([key, value]) => {
      // @ts-expect-error key will be an alert property
      alert[key] = value;
    });
    setAlertIds([...alertIds, alert.id]);
    setAlerts({ ...alerts, [alert.id]: alert });
  };

  const deleteAlert = (id: string) => {
    if (id in alerts) {
      const alertIdIndex = alertIds.findIndex((alertId) => alertId === id);
      const { [id]: value, ...newAlerts } = alerts;
      const newAlertIds = [...alertIds];
      newAlertIds.splice(alertIdIndex, 1);
      setAlertIds(newAlertIds);
      setAlerts(newAlerts);
    }
  };

  const generate = (newGenerateOptions?: SubscribeOptions) => {
    if (newGenerateOptions && Object.keys(newGenerateOptions).length) {
      const newOptions = { ...generateOptions, newGenerateOptions };
      setGenerateOptions(newOptions);
    }
  };
};
