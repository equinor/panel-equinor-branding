import {
  ILabShell,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { Dialog, ISplashScreen, IThemeManager } from '@jupyterlab/apputils';
import { URLExt } from '@jupyterlab/coreutils';
import { ITranslator } from '@jupyterlab/translation';
import { LabIcon } from '@jupyterlab/ui-components';
import { DisposableDelegate } from '@lumino/disposable';
import { Throttler } from '@lumino/polling';
import { Widget } from '@lumino/widgets';

import {
  JUNO_FAVICON_BUSY_SVG,
  JUNO_FAVICON_IDLE_SVG,
  JUNO_LOGO_SVG,
  svgDataUrl
} from './icons';

const NAMESPACE = 'jupyterlab-juno-theme';

/** Same timeout JupyterLab uses before offering workspace recovery on the splash. */
const SPLASH_RECOVER_TIMEOUT = 12000;

const junoIcon = new LabIcon({ name: 'juno:o-mark', svgstr: JUNO_LOGO_SVG });

/**
 * Themes: Juno Light and Juno Dark share one stylesheet; JupyterLab flips
 * body[data-jp-theme-light] from `isLight`, and style/juno.css keys off that.
 */
const themes: JupyterFrontEndPlugin<void> = {
  id: `${NAMESPACE}:themes`,
  description: 'Juno Light and Juno Dark themes (Nebari purple primary).',
  autoStart: true,
  requires: [IThemeManager],
  activate: (app: JupyterFrontEnd, manager: IThemeManager) => {
    const style = `${NAMESPACE}/index.css`;
    manager.register({
      name: 'Juno Light',
      isLight: true,
      themeScrollbars: false,
      load: () => manager.loadCSS(style),
      unload: () => Promise.resolve(undefined)
    });
    manager.register({
      name: 'Juno Dark',
      isLight: false,
      themeScrollbars: true,
      load: () => manager.loadCSS(style),
      unload: () => Promise.resolve(undefined)
    });
  }
};

/**
 * Logo: the Juno o-mark top-left, linking back to the hub home when running
 * under JupyterHub (same behaviour as jupyterlab-nebari-mode's logo, which —
 * like the stock @jupyterlab/application-extension:logo — is disabled in
 * package.json "jupyterlab.disabledExtensions" so only one logo renders).
 */
const logo: JupyterFrontEndPlugin<void> = {
  id: `${NAMESPACE}:logo`,
  description: 'Juno o-mark in the top-left corner, linking to the hub home.',
  autoStart: true,
  requires: [ILabShell, JupyterFrontEnd.IPaths],
  activate: (
    app: JupyterFrontEnd,
    shell: ILabShell,
    paths: JupyterFrontEnd.IPaths
  ) => {
    const widget = new Widget();
    const { hubHost = '', hubPrefix = '' } = paths.urls;
    let container: HTMLElement = widget.node;
    if (hubPrefix) {
      const link = document.createElement('a');
      link.href = hubHost + URLExt.join(hubPrefix, 'home');
      link.target = '_blank';
      link.rel = 'noopener';
      link.className = 'juno-logo-link';
      widget.node.appendChild(link);
      container = link;
    }
    junoIcon.element({
      container,
      elementPosition: 'center',
      margin: '2px 2px 2px 8px',
      height: 'auto',
      width: '22px',
      title: hubPrefix ? 'Juno Home' : 'Juno'
    });
    widget.id = 'jp-MainLogo';
    shell.add(widget, 'top', { rank: 0 });
  }
};

/**
 * Favicon: repoints the page's idle/busy <link class="favicon"> elements (which
 * @jupyterlab/application-extension:faviconbusy toggles) at Juno data URLs.
 */
const favicon: JupyterFrontEndPlugin<void> = {
  id: `${NAMESPACE}:favicon`,
  description: 'Juno o-mark as the browser tab icon, with a busy variant.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    const set = (selector: string, svg: string) => {
      const link = document.querySelector<HTMLLinkElement>(selector);
      if (link) {
        link.type = 'image/svg+xml';
        link.href = svgDataUrl(svg);
      }
    };
    set('link.idle.favicon', JUNO_FAVICON_IDLE_SVG);
    set('link.busy.favicon', JUNO_FAVICON_BUSY_SVG);
    // Firefox needs a reinsert to notice a changed href on the active icon.
    const active = document.querySelector<HTMLLinkElement>(
      'link[rel="icon"].favicon'
    );
    if (active && active.parentNode) {
      active.parentNode.replaceChild(active, active);
    }
  }
};

/**
 * Splash: JupyterLab's loading screen with the Juno mark at the centre of the
 * orbit animation. Mirrors @jupyterlab/apputils-extension:splash (disabled in
 * package.json) and reuses its CSS ids so the stock animation keeps working.
 */
const splash: JupyterFrontEndPlugin<ISplashScreen> = {
  id: `${NAMESPACE}:splash`,
  description: 'Loading screen with the Juno mark.',
  autoStart: true,
  requires: [ITranslator],
  provides: ISplashScreen,
  activate: (app: JupyterFrontEnd, translator: ITranslator) => {
    const trans = translator.load('jupyterlab');
    const { commands, restored } = app;

    const splashEl = document.createElement('div');
    const galaxy = document.createElement('div');
    const mainLogo = document.createElement('div');
    splashEl.id = 'jupyterlab-splash';
    galaxy.id = 'galaxy';
    mainLogo.id = 'main-logo';

    junoIcon.element({ container: mainLogo, stylesheet: 'splash' });
    galaxy.appendChild(mainLogo);
    ['1', '2', '3'].forEach(id => {
      const moon = document.createElement('div');
      const planet = document.createElement('div');
      moon.id = `moon${id}`;
      moon.className = 'moon orbit';
      planet.id = `planet${id}`;
      planet.className = 'planet';
      moon.appendChild(planet);
      galaxy.appendChild(moon);
    });
    splashEl.appendChild(galaxy);

    let dialog: Dialog<unknown> | null = null;
    const recovery = new Throttler(
      async () => {
        if (dialog) {
          return;
        }
        dialog = new Dialog({
          title: trans.__('Loading…'),
          body: trans.__(
            'The loading screen is taking a long time. Would you like to clear the workspace or keep waiting?'
          ),
          buttons: [
            Dialog.cancelButton({ label: trans.__('Keep Waiting') }),
            Dialog.warnButton({ label: trans.__('Clear Workspace') })
          ]
        });
        try {
          const result = await dialog.launch();
          dialog.dispose();
          dialog = null;
          if (result.button.accept && commands.hasCommand('apputils:reset')) {
            return commands.execute('apputils:reset');
          }
          requestAnimationFrame(() => {
            void recovery.invoke().catch(() => undefined);
          });
        } catch {
          /* no-op */
        }
      },
      { limit: SPLASH_RECOVER_TIMEOUT, edge: 'trailing' }
    );

    let splashCount = 0;
    return {
      show: (light = true) => {
        splashEl.classList.remove('splash-fade');
        splashEl.classList.toggle('light', light);
        splashEl.classList.toggle('dark', !light);
        // The theme CSS may not be loaded yet, so colour the ring inline.
        mainLogo.style.color = light ? '#262628' : '#f8f8f8';
        splashCount++;
        document.body.appendChild(splashEl);
        void recovery.invoke().catch(() => undefined);
        return new DisposableDelegate(async () => {
          await restored;
          if (--splashCount === 0) {
            void recovery.stop();
            if (dialog) {
              dialog.dispose();
              dialog = null;
            }
            splashEl.classList.add('splash-fade');
            window.setTimeout(() => {
              if (splashEl.parentNode) {
                document.body.removeChild(splashEl);
              }
            }, 200);
          }
        });
      }
    };
  }
};

export default [themes, logo, favicon, splash];
