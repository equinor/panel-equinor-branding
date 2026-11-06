import {
  ILabShell,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { IThemeManager } from '@jupyterlab/apputils';
import { LabIcon } from '@jupyterlab/ui-components';
import { Widget } from '@lumino/widgets';

import {
  JUNO_FAVICON_BUSY_SVG,
  JUNO_FAVICON_IDLE_SVG,
  JUNO_LOGO_SVG,
  svgDataUrl
} from './icons';

const NAMESPACE = 'jupyterlab-juno-theme';

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
 * Logo: replaces @jupyterlab/application-extension:logo (disabled in package.json
 * "jupyterlab.disabledExtensions") with the Juno o-mark at the same spot and id.
 */
const logo: JupyterFrontEndPlugin<void> = {
  id: `${NAMESPACE}:logo`,
  description: 'Juno o-mark in the top-left corner.',
  autoStart: true,
  requires: [ILabShell],
  activate: (app: JupyterFrontEnd, shell: ILabShell) => {
    const icon = new LabIcon({ name: 'juno:o-mark', svgstr: JUNO_LOGO_SVG });
    const widget = new Widget();
    icon.element({
      container: widget.node,
      elementPosition: 'center',
      margin: '2px 2px 2px 8px',
      height: 'auto',
      width: '22px'
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

export default [themes, logo, favicon];
