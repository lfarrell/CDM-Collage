**CDM Collage** - A project to search, browse and view images from ContentDM in various ways.  Currently it can shuffle or return
a random image from the images returned by the search.  Images link out full image in the ContentDM viewer.

## Setup:

Change the variable $cdm_path to the path to your ContentDM installation in cdm-proxy.php, typically something like: dc.lib.org.
Change the variable cdm_path in js/cd-collage.js to return the full image, typically something like: http://dc.lib.org/cdm/singleitem/collection.
Leave off trailing /.  