import { httpClient } from './http.service';

export interface Setting {
  setting_key: string;
  setting_value: string;
}

export const getSetting = async (key: string): Promise<string> => {
  const response = await httpClient.get<Setting>(`/api/settings/${key}/`);
  return response.setting_value;
};

export const updateSetting = async (key: string, value: string): Promise<void> => {
  await httpClient.put(`/api/settings/${key}/`, {
    setting_key: key,
    setting_value: value,
  });
};