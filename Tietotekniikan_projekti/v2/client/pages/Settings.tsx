import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { getSettings, updateSettings } from "@/lib/settings";
import { getLanguage, setLanguage, t, Language } from "@/lib/i18n";
import { Settings as SettingsIcon, Moon, Globe, Bell } from "lucide-react";

export default function Settings() {
  const [language, setLanguageSetting] = useState<Language>(getLanguage());
  const [settings, setSettingsSetting] = useState(getSettings());
  const [saved, setSaved] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguageSetting(lang);
    setLanguage(lang);
  };

  const handleSettingChange = (key: keyof typeof settings, value: boolean) => {
    const updated = { ...settings, [key]: value };
    setSettingsSetting(updated);
    updateSettings(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleToggleDarkMode = () => {
    const newDarkMode = !settings.darkMode;
    const updated = { ...settings, darkMode: newDarkMode };
    setSettingsSetting(updated);
    updateSettings(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              {t("settings.title")}
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage your preferences and application settings
          </p>
        </div>

        {/* Language Settings */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <Globe className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">
                {t("settings.language")}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t("settings.languageDesc")}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {(["en", "fi"] as const).map((lang) => (
              <label
                key={lang}
                className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <input
                  type="radio"
                  name="language"
                  value={lang}
                  checked={language === lang}
                  onChange={() => handleLanguageChange(lang)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="font-medium text-foreground">
                  {lang === "en" ? "English" : "Suomi (Finnish)"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <Moon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">
                {t("settings.darkMode")}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Switch between light and dark theme
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleDarkMode}
            className={`w-full px-4 py-3 rounded-lg font-medium transition-colors border-2 ${
              settings.darkMode
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-muted/50 text-foreground hover:border-primary/50"
            }`}
          >
            {settings.darkMode ? "✓ Dark Mode Enabled" : "Enable Dark Mode"}
          </button>
        </div>

        {/* Map Preferences */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zM9 7a1 1 0 100-2 1 1 0 000 2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">
                {t("settings.mapPreferences")}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t("settings.mapPreferencesDesc")}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <input
                type="checkbox"
                checked={settings.showDeviceMarkers}
                onChange={(e) => handleSettingChange("showDeviceMarkers", e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <div>
                <span className="font-medium text-foreground">{t("settings.deviceMarkers")}</span>
                <p className="text-xs text-muted-foreground">Display device locations on the map</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <input
                type="checkbox"
                checked={settings.showDeviceRoutes}
                onChange={(e) => handleSettingChange("showDeviceRoutes", e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <div>
                <span className="font-medium text-foreground">{t("settings.deviceRoutes")}</span>
                <p className="text-xs text-muted-foreground">Show historical routes on the map</p>
              </div>
            </label>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <Bell className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">
                {t("settings.notifications")}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t("settings.notificationsDesc")}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange("emailNotifications", e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <div>
                <span className="font-medium text-foreground">{t("settings.emailNotifications")}</span>
                <p className="text-xs text-muted-foreground">Receive email notifications for alerts</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <input
                type="checkbox"
                checked={settings.alertNotifications}
                onChange={(e) => handleSettingChange("alertNotifications", e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <div>
                <span className="font-medium text-foreground">{t("settings.alertNotifications")}</span>
                <p className="text-xs text-muted-foreground">Show in-app alerts and notifications</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange("pushNotifications", e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <div>
                <span className="font-medium text-foreground">{t("settings.pushNotifications")}</span>
                <p className="text-xs text-muted-foreground">Enable browser push notifications</p>
              </div>
            </label>
          </div>
        </div>

        {/* Saved Indicator */}
        {saved && (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-lg p-4 text-center">
            <p className="text-sm font-medium text-green-700 dark:text-green-300">
              ✓ Settings saved successfully
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
