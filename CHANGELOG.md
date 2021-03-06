CHANGELOG
=========
## v3.1.0
* Added `containerStyle` prop to allow for the styling of the container surrounding the editor.
* Added the ability to pass a sanitized prop into the component allowing for usage of all pieces of the DraftJS API
* Updates dependencies of draft-js-export-html to prevent issues when working with post react 0.15.3.
* Updates dependencies for react 16
* Includes scss, however this is deprecated and will be removed in v4.0.0
* Added ability to pass optional decorator prop to DraftJSEditor, overriding the defaults if provided.

## v3.0.4
* Remove onClick in wrapper div

## v3.0.3
* Fix prop-type deprecation warning we missed in DraftJSEditor

## v3.0.2
* Fix deprecation warnings
* Fix image and video blocks
* Fix onChange not firing when custom blocks are added

## v3.0.0
* Update for React v15.5 deprecation warnings: PropTypes is now a separate `prop-types` package
* Added prettier formatting
* Updated all dependencies– most notably babel v5 -> v6.
* Added storybook for demo/gh-pages/development purposes (no more webpack config!)

## v2.5.0

## v2.4.3
* Fix issue with undefined variable

## v2.4.2
* Fix issue with link decorators not being applied to loaded content

## v2.4.1
* Allow readOnly editor views to update when their props change

## v2.4.0
* Replace default controls with individual icons, added mouseover hover that displays label text
* Fixed bug with active custom control styling not toggling on/off when selected

## v2.3.0
* Remove default styling for h1/h2/h3/etc. from draftjs scss file– this should be handled by the app, not by draftjs editor
* Rather than rendering empty divs, we won't render the control blocks if the editor has the readOnly prop passed to it

## v2.0.0

## v1.0.0 - 2016-08-10

* Refactor decorators to move them out of the main component
* Add support for custom atomic blocks via renderers

## v0.0.1 - 2016-06-22

* Initial release
