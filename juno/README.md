# Juno brand assets

Project-specific branding for **Juno** (the Nebari/HoloViz/JupyterHub data platform), parked
here alongside the Equinor `brand` package. Deliberately **not** wired into the Python
package yet — these are plain files in logical folders until we decide whether to merge the
Equinor and Juno brands into one library.

| Folder | What |
|---|---|
| [`logo/`](logo/) | The settled marks (SVG) + `preview.html` to view them on light/dark, in a login card, at favicon sizes |
| [`logo/archive/`](logo/archive/) | Earlier iterations, kept for comparison only |
| [`keycloak/`](keycloak/) | Exported Keycloak *Theme customization* preset (JSON) once published on a realm — the re-seed source after a cluster teardown |

Consumers today and how they get the files:

- **Keycloak login page** (`nebari-dev/nebari-keycloak-theme`): upload `logo/juno-o-mark-v3-*.svg`
  (or the lockup) in Configure → Theme customization; export the preset to `keycloak/`.
- **JupyterHub**: `hub.extraFiles` (base64) in the cluster's gitops values + `c.JupyterHub.logo_file`.
- **JupyterLab image** (`nic-pilot`): copy from this folder at build time.
- **Landing page** (`nebari-dev/nebari-landing`): its frontend branding config.

See [`logo/README.md`](logo/README.md) for colour meanings, hex values and geometry.
