# jupyterlab-juno-theme

Juno branding for JupyterLab 4 as one prebuilt extension:

- **Juno Light** and **Juno Dark** themes — JupyterLab's own variables re-tinted to the Juno
  palette (Nebari design-system purple primary, data teal, HoloViz blue, Jupyter orange,
  Equinor red; zinc neutrals). See `style/juno.css`; palette source of truth is
  [`../logo/README.md`](../logo/README.md).
- **Logo** — the Juno o-mark replaces the Jupyter logo top-left and links to the hub home
  (the stock `@jupyterlab/application-extension:logo` **and** `jupyterlab-nebari-mode:logo`
  from Nebari's base image are disabled via `package.json`, so only one logo renders).
- **Splash** — the loading screen's orbit animation circles the Juno mark instead of the
  Jupyter logo (`@jupyterlab/apputils-extension:splash` disabled, same CSS reused).
- **Favicon** — the o-mark as the tab icon, with an orange-dot busy variant that JupyterLab's
  own busy toggle picks up.
- **Launcher header** — the o-mark + "Juno" at the top of the launcher, pure CSS
  (`style/launcher.css`), for both JupyterLab's stock launcher and Nebari's
  `jupyterlab-launchpad`.

Generated from [jupyterlab/extension-template](https://github.com/jupyterlab/extension-template)
(`kind: theme`), modelled on [catppuccin/jupyterlab](https://github.com/catppuccin/jupyterlab).

## Build

Needs Node ≥ 20 and a Python with `jupyterlab>=4` + `jupyter-builder` (for `jlpm` and
`jupyter labextension build`). From this directory:

```bash
jlpm install
jlpm build:prod            # → jupyterlab_juno_theme/labextension/
uv build --wheel           # → dist/jupyterlab_juno_theme-<ver>-py3-none-any.whl
```

## Install into the lab image

The wheel is a plain prebuilt labextension — no Node at install time:

```dockerfile
COPY dist/jupyterlab_juno_theme-*.whl /tmp/
RUN pixi add --manifest-path ${PIXI_MANIFEST} --pypi "jupyterlab-juno-theme @ file:///tmp/<wheel>"
```

Make it the default theme with an `overrides.json` in the env's
`share/jupyter/lab/settings/`:

```json
{ "@jupyterlab/apputils-extension:themes": { "theme": "Juno Light", "theme-scrollbars": false } }
```

Once installed, the `custom.css` + favicon hack in `juno-images/branding/` is redundant and
should be removed.

## Development

`jlpm watch` rebuilds on change; switch to *Juno Light* / *Juno Dark* under Settings → Theme.
