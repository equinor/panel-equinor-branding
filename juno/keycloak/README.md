# Keycloak Theme customization preset

Once the Juno branding is published on a realm (Admin Console → Configure → Theme
customization → options menu → Export), save the JSON here as `juno-login-preset.json`.

It is the re-seed source after a cluster teardown: the preset's `config` object goes into the
realm's localization texts under `nebariBrandingConfig` (base64, `base64:` prefix) — see the
theme repo's `docs/theme-customization.md`, "Seeding a preset". Logos are embedded in the
JSON as data URLs, so the file is self-contained.

Nothing here yet.
