export const emailConfig = {
  from: {
    verification: "Ephub <cuentas@ephub.com>",
    passwordReset: "Ephub <admin@ephub.com>",
    default: "Ephub <noreply@ephub.com>",
  },
  tokenExpiration: "1 hora",
} as const;
