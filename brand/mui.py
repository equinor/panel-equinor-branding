
from typing import Any, Dict

import panel as pn
import panel_material_ui as pmui

from .assets import FAVICON_PATH, LOGO_PATH, RAW_CSS
from .colors import DARK_THEME, LIGHT_THEME


_BODY_FONT_FAMILY = "Inter, Helvetica Neue, Arial, sans-serif"
_HEADING_FONT_FAMILY = "Equinor, Inter, Helvetica Neue, Arial, sans-serif"
_BORDER_RADIUS_ROUNDED = 4
_BORDER_RADIUS_NONE = 0
_CHIP_BORDER_RADIUS = 9999
_BASE_FONT_SIZE = 14
_FONT_WEIGHT_REGULAR = 400
_FONT_WEIGHT_MEDIUM = 500
_BODY_LINE_HEIGHT = 20 / 14

_DISCONNECT_NOTIFICATION = (
    "The connection to the server was lost. Please refresh to reconnect."
)

_INTER_FONT_URL = (
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
)


def _build_theme_config(
    *,
    mode: str,
    primary: str,
    secondary: str,
    success: str,
    error: str,
    warning: str,
    info: str,
    background_default: str,
    background_paper: str,
    text_primary: str,
    text_secondary: str,
    divider: str,
    primary_contrast_text: str,
) -> Dict[str, Any]:
    return {
        "palette": {
            "mode": mode,
            "primary": {
                "main": primary,
                "contrastText": primary_contrast_text,
            },
            "secondary": {
                "main": secondary,
            },
            "success": {
                "main": success,
            },
            "error": {
                "main": error,
            },
            "warning": {
                "main": warning,
            },
            "info": {
                "main": info,
            },
            "background": {
                "default": background_default,
                "paper": background_paper,
            },
            "text": {
                "primary": text_primary,
                "secondary": text_secondary,
            },
            "divider": divider,
            "contrastThreshold": 3,
            "tonalOffset": 0.2,
        },
        "shape": {
            "borderRadius": _BORDER_RADIUS_ROUNDED,
        },
        "typography": {
            "fontFamily": _BODY_FONT_FAMILY,
            "fontSize": _BASE_FONT_SIZE,
            "fontWeightRegular": _FONT_WEIGHT_REGULAR,
            "fontWeightMedium": _FONT_WEIGHT_MEDIUM,
            "fontWeightBold": _FONT_WEIGHT_MEDIUM,
            "body1": {
                "fontFamily": _BODY_FONT_FAMILY,
                "fontSize": _BASE_FONT_SIZE,
                "fontWeight": _FONT_WEIGHT_REGULAR,
                "lineHeight": _BODY_LINE_HEIGHT,
                "letterSpacing": 0,
            },
            "body2": {
                "fontFamily": _BODY_FONT_FAMILY,
                "fontSize": 12,
                "fontWeight": _FONT_WEIGHT_REGULAR,
                "lineHeight": 16 / 12,
                "letterSpacing": 0,
            },
            "button": {
                "fontFamily": _BODY_FONT_FAMILY,
                "fontSize": _BASE_FONT_SIZE,
                "fontWeight": _FONT_WEIGHT_MEDIUM,
                "lineHeight": _BODY_LINE_HEIGHT,
                "letterSpacing": 0,
                "textTransform": "none",
            },
            "h1": {
                "fontFamily": _HEADING_FONT_FAMILY,
                "fontWeight": _FONT_WEIGHT_MEDIUM,
                "letterSpacing": 0,
            },
            "h2": {
                "fontFamily": _HEADING_FONT_FAMILY,
                "fontWeight": _FONT_WEIGHT_MEDIUM,
                "letterSpacing": 0,
            },
            "h3": {
                "fontFamily": _HEADING_FONT_FAMILY,
                "fontWeight": _FONT_WEIGHT_MEDIUM,
                "letterSpacing": 0,
            },
            "h4": {
                "fontFamily": _HEADING_FONT_FAMILY,
                "fontWeight": _FONT_WEIGHT_MEDIUM,
                "letterSpacing": 0,
            },
            "h5": {
                "fontFamily": _HEADING_FONT_FAMILY,
                "fontWeight": _FONT_WEIGHT_MEDIUM,
                "letterSpacing": 0,
            },
            "h6": {
                "fontFamily": _HEADING_FONT_FAMILY,
                "fontWeight": _FONT_WEIGHT_MEDIUM,
                "letterSpacing": 0,
            },
        },
        "components": {
            "MuiCssBaseline": {
                "styleOverrides": {
                    "body": {
                        "fontFamily": _BODY_FONT_FAMILY,
                        "backgroundColor": background_default,
                        "color": text_primary,
                    },
                },
            },
            "MuiButtonBase": {
                "defaultProps": {
                    "disableRipple": True,
                },
            },
            "MuiButton": {
                "defaultProps": {
                    "disableElevation": True,
                },
                "styleOverrides": {
                    "root": {
                        "borderRadius": _BORDER_RADIUS_ROUNDED,
                        "textTransform": "none",
                        "fontWeight": _FONT_WEIGHT_MEDIUM,
                    },
                },
            },
            "MuiPaper": {
                "styleOverrides": {
                    "root": {
                        "borderRadius": _BORDER_RADIUS_ROUNDED,
                    },
                },
            },
            "MuiCard": {
                "styleOverrides": {
                    "root": {
                        "borderRadius": _BORDER_RADIUS_ROUNDED,
                    },
                },
            },
            "MuiAccordion": {
                "styleOverrides": {
                    "root": {
                        "borderRadius": _BORDER_RADIUS_ROUNDED,
                    },
                },
            },
            "MuiDialog": {
                "styleOverrides": {
                    "paper": {
                        "borderRadius": _BORDER_RADIUS_ROUNDED,
                    },
                },
            },
            "MuiMenu": {
                "styleOverrides": {
                    "paper": {
                        "borderRadius": _BORDER_RADIUS_ROUNDED,
                    },
                },
            },
            "MuiChip": {
                "styleOverrides": {
                    "root": {
                        "borderRadius": _CHIP_BORDER_RADIUS,
                    },
                },
            },
            "MuiInputBase": {
                "styleOverrides": {
                    "root": {
                        "borderRadius": _BORDER_RADIUS_NONE,
                    },
                },
            },
            "MuiOutlinedInput": {
                "styleOverrides": {
                    "root": {
                        "borderRadius": _BORDER_RADIUS_NONE,
                    },
                    "notchedOutline": {
                        "borderRadius": _BORDER_RADIUS_NONE,
                    },
                },
            },
            "MuiFilledInput": {
                "styleOverrides": {
                    "root": {
                        "borderRadius": _BORDER_RADIUS_NONE,
                    },
                },
            },
            "MuiTextField": {
                "styleOverrides": {
                    "root": {
                        "& .MuiInputBase-root": {
                            "borderRadius": _BORDER_RADIUS_NONE,
                        },
                        "& .MuiOutlinedInput-root": {
                            "borderRadius": _BORDER_RADIUS_NONE,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            "borderRadius": _BORDER_RADIUS_NONE,
                        },
                    },
                },
            },
            "MuiPickersTextField": {
                "styleOverrides": {
                    "root": {
                        "& .MuiInputBase-root": {
                            "borderRadius": _BORDER_RADIUS_NONE,
                        },
                        "& .MuiOutlinedInput-root": {
                            "borderRadius": _BORDER_RADIUS_NONE,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            "borderRadius": _BORDER_RADIUS_NONE,
                        },
                    },
                },
            },
            "MuiPickersInputBase": {
                "styleOverrides": {
                    "root": {
                        "borderRadius": _BORDER_RADIUS_NONE,
                    },
                },
            },
            "MuiPickersOutlinedInput": {
                "styleOverrides": {
                    "root": {
                        "borderRadius": _BORDER_RADIUS_NONE,
                    },
                    "notchedOutline": {
                        "borderRadius": _BORDER_RADIUS_NONE,
                    },
                },
            },
        },
    }


_LIGHT_THEME_CONFIG: Dict[str, Any] = _build_theme_config(
    mode="light",
    primary=LIGHT_THEME.primary,
    secondary=LIGHT_THEME.secondary,
    success=LIGHT_THEME.success,
    error=LIGHT_THEME.error,
    warning=LIGHT_THEME.warning,
    info=LIGHT_THEME.info,
    background_default="#fefefe",
    background_paper="#ffffff",
    text_primary="#2c2c2c",
    text_secondary="#636363",
    divider="#bbbbbb",
    primary_contrast_text="#ffffff",
)

_DARK_THEME_CONFIG: Dict[str, Any] = _build_theme_config(
    mode="dark",
    primary=DARK_THEME.primary,
    secondary=DARK_THEME.secondary,
    success=DARK_THEME.success,
    error=DARK_THEME.error,
    warning=DARK_THEME.warning,
    info=DARK_THEME.info,
    background_default="#161c20",
    background_paper="#1d242a",
    text_primary="#e0e2e4",
    text_secondary="#9ba4aa",
    divider="#445460",
    primary_contrast_text="#000000",
)

THEME_CONFIG: Dict[str, Dict[str, Any]] = {
    "light": _LIGHT_THEME_CONFIG,
    "dark": _DARK_THEME_CONFIG,
}


def _configure_session() -> None:
    pn.config.disconnect_notification = _DISCONNECT_NOTIFICATION


@pn.cache
def _configure_general() -> None:
    pmui.Page.param.theme_config.default = THEME_CONFIG

    if RAW_CSS:
        pmui.Page.config.raw_css.append(RAW_CSS)

    if _INTER_FONT_URL not in pmui.Page.config.css_files:
        pmui.Page.config.css_files.append(_INTER_FONT_URL)

    pmui.Page.param.logo.default = LOGO_PATH
    pmui.Page.favicon = FAVICON_PATH

    page = getattr(pmui, "page", None)
    if page is not None and page.meta is None:
        page.meta = pmui.template.base.Meta(
            apple_touch_icon="",
            title="Orbitron",
        )

    pmui.Button.param.disable_elevation.default = True
    pn.pane.Image.stylesheets = ["img { border-radius: 2px; }"]


def configure() -> None:
    """
    Configure the complete theme for the application.

    Examples
    --------
    >>> from brand.mui import configure
    >>> configure()
    >>> app = pmui.Page(title="My Orbitron App")
    """
    _configure_general()
    _configure_session()


if __name__ == "__main__":
    configure()
