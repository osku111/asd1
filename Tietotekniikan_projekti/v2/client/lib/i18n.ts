export type Language = "en" | "fi";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.devices": "Devices",
    "nav.routes": "Routes",
    "nav.reports": "Reports",
    "nav.settings": "Settings",

    // Dashboard
    "dashboard.title": "GPS Tracking Dashboard",
    "dashboard.subtitle": "Real-time monitoring of all tracked devices and their locations",
    "dashboard.totalDevices": "Total Devices",
    "dashboard.onlineDevices": "Online Devices",
    "dashboard.avgSpeed": "Avg Speed",
    "dashboard.allDevices": "All Devices",

    // Devices
    "devices.title": "Devices",
    "devices.subtitle": "Manage and monitor your GPS devices",
    "devices.addDevice": "Add Device",
    "devices.status": "Status",
    "devices.speed": "Speed",
    "devices.location": "Location",
    "devices.lastUpdate": "Last Update",
    "devices.viewDetails": "View Details",

    // Routes
    "routes.title": "Routes",
    "routes.subtitle": "Track and analyze device routes and journeys",
    "routes.distance": "Distance",
    "routes.duration": "Duration",
    "routes.avgSpeed": "Avg Speed",
    "routes.maxSpeed": "Max Speed",
    "routes.viewOnMap": "View Route on Map",

    // Reports
    "reports.title": "Reports",
    "reports.subtitle": "Detailed analytics and statistics for all devices",
    "reports.export": "Export",
    "reports.totalDistance": "Total Distance",
    "reports.totalTrips": "Total Trips",
    "reports.fuelUsed": "Fuel Used",
    "reports.devicePerformance": "Device Performance Report",

    // Settings
    "settings.title": "Settings",
    "settings.language": "Language",
    "settings.languageDesc": "Choose your preferred language",
    "settings.mapPreferences": "Map Preferences",
    "settings.mapPreferencesDesc": "Configure map display options",
    "settings.notifications": "Notifications",
    "settings.notificationsDesc": "Manage notification settings",
    "settings.darkMode": "Dark Mode",
    "settings.enableDarkMode": "Enable Dark Mode",
    "settings.tileLayer": "Tile Layer",
    "settings.deviceMarkers": "Show Device Markers",
    "settings.deviceRoutes": "Show Device Routes",
    "settings.emailNotifications": "Email Notifications",
    "settings.alertNotifications": "Alert Notifications",
    "settings.pushNotifications": "Push Notifications",

    // Login
    "login.title": "TrackGPS Login",
    "login.subtitle": "Select your account to continue",
    "login.selectUser": "Select User",
    "login.logout": "Logout",
    "login.role": "Role",

    // Search
    "search.placeholder": "Search devices, addresses...",
    "search.noResults": "No devices found",

    // User Menu
    "user.profile": "Profile",
    "user.settings": "Settings",
    "user.logout": "Logout",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.add": "Add",
    "common.close": "Close",
  },
  fi: {
    // Navigation
    "nav.dashboard": "Päämaali",
    "nav.devices": "Laitteet",
    "nav.routes": "Reitit",
    "nav.reports": "Raportit",
    "nav.settings": "Asetukset",

    // Dashboard
    "dashboard.title": "GPS-seurantanäyttö",
    "dashboard.subtitle": "Kaikkien seurattujen laitteiden ja niiden sijainnin reaaliaikainen seuranta",
    "dashboard.totalDevices": "Kaikki Laitteet",
    "dashboard.onlineDevices": "Yhdessä Olevat Laitteet",
    "dashboard.avgSpeed": "Keskimääräinen Nopeus",
    "dashboard.allDevices": "Kaikki Laitteet",

    // Devices
    "devices.title": "Laitteet",
    "devices.subtitle": "Hallitse ja seuraa GPS-laitteita",
    "devices.addDevice": "Lisää Laite",
    "devices.status": "Tila",
    "devices.speed": "Nopeus",
    "devices.location": "Sijainti",
    "devices.lastUpdate": "Viimeksi Päivitetty",
    "devices.viewDetails": "Näytä Tiedot",

    // Routes
    "routes.title": "Reitit",
    "routes.subtitle": "Seuraa ja analysoi laitteiden reittejä ja matkoja",
    "routes.distance": "Matka",
    "routes.duration": "Kesto",
    "routes.avgSpeed": "Keskimääräinen Nopeus",
    "routes.maxSpeed": "Maksimi Nopeus",
    "routes.viewOnMap": "Näytä Reitti Kartalla",

    // Reports
    "reports.title": "Raportit",
    "reports.subtitle": "Yksityiskohtaiset analyytikot ja tilastot kaikista laitteista",
    "reports.export": "Vie",
    "reports.totalDistance": "Kokonaismatka",
    "reports.totalTrips": "Kokonaismatkat",
    "reports.fuelUsed": "Käytetty Polttoaine",
    "reports.devicePerformance": "Laitteen Suorituskykyraportti",

    // Settings
    "settings.title": "Asetukset",
    "settings.language": "Kieli",
    "settings.languageDesc": "Valitse kielesi",
    "settings.mapPreferences": "Kartan Asetukset",
    "settings.mapPreferencesDesc": "Määritä kartan näyttöasetukset",
    "settings.notifications": "Ilmoitukset",
    "settings.notificationsDesc": "Hallitse ilmoitusasetuksia",
    "settings.darkMode": "Tumma Tila",
    "settings.enableDarkMode": "Ota Tumma Tila Käyttöön",
    "settings.tileLayer": "Karttataso",
    "settings.deviceMarkers": "Näytä Laitteen Merkit",
    "settings.deviceRoutes": "Näytä Laitteiden Reitit",
    "settings.emailNotifications": "Sähköposteilmoitukset",
    "settings.alertNotifications": "Ilmoitukset",
    "settings.pushNotifications": "Push-ilmoitukset",

    // Login
    "login.title": "TrackGPS Kirjautuminen",
    "login.subtitle": "Valitse tilisi jatkaaksesi",
    "login.selectUser": "Valitse Käyttäjä",
    "login.logout": "Kirjaudu Ulos",
    "login.role": "Rooli",

    // Search
    "search.placeholder": "Etsi laitteita, osoitteita...",
    "search.noResults": "Laitteita ei löytynyt",

    // User Menu
    "user.profile": "Profiili",
    "user.settings": "Asetukset",
    "user.logout": "Kirjaudu Ulos",

    // Common
    "common.save": "Tallenna",
    "common.cancel": "Peruuta",
    "common.delete": "Poista",
    "common.edit": "Muokkaa",
    "common.add": "Lisää",
    "common.close": "Sulje",
  },
};

export function getLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("language") as Language;
  return saved || "en";
}

export function setLanguage(lang: Language): void {
  localStorage.setItem("language", lang);
}

export function t(key: string, lang?: Language): string {
  const currentLang = lang || getLanguage();
  return translations[currentLang][key] || key;
}
