import { Language } from "./i18n";

export interface AppSettings {
  language: Language;
  darkMode: boolean;
  showDeviceMarkers: boolean;
  showDeviceRoutes: boolean;
  emailNotifications: boolean;
  alertNotifications: boolean;
  pushNotifications: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  language: "en",
  darkMode: false,
  showDeviceMarkers: true,
  showDeviceRoutes: true,
  emailNotifications: true,
  alertNotifications: true,
  pushNotifications: false,
};

const SETTINGS_KEY = "appSettings";

export function getSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const saved = localStorage.getItem(SETTINGS_KEY);
  if (!saved) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function updateSettings(updates: Partial<AppSettings>): AppSettings {
  const current = getSettings();
  const updated = { ...current, ...updates };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));

  // Apply dark mode class to document
  if (typeof window !== "undefined") {
    if (updated.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return updated;
}

export function resetSettings(): void {
  localStorage.removeItem(SETTINGS_KEY);
  if (typeof window !== "undefined") {
    document.documentElement.classList.remove("dark");
  }
}

// Initialize settings on load
if (typeof window !== "undefined") {
  const settings = getSettings();
  if (settings.darkMode) {
    document.documentElement.classList.add("dark");
  }
}
