# panel-equinor-branding

Equinor branding helpers for Panel and `panel-material-ui` applications.

## Install

From the repository root:

```bash
pip install -e .
```

This installs the local `brand` package in editable mode together with its declared runtime dependencies.

## Getting Started

The most important concept in this package is the `pmui.Page` component.

Call `configure()` once near application startup, then build your UI inside `pmui.Page(...)`. The `configure()` function sets the default theme configuration and page-level assets, and those page defaults cascade through the `panel-material-ui` components rendered inside that page.

Typical usage looks like this:

```python
import panel as pn
import panel_material_ui as pmui

from brand.mui import configure

configure()
pn.extension(sizing_mode="stretch_width")

page = pmui.Page(
	main=[
		pmui.Container(
			pmui.Typography("Hello", variant="h4"),
			"Body text and controls inherit the branded page theme.",
		)
	]
)

page.show()
```

If you skip `pmui.Page`, you skip the main application shell this package is designed to brand.