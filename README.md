**CDM Collage** - A project to search, browse and view images from CONTENTdm in various ways.  Currently it can shuffle or return
a random image from the images returned by the search.  Hovering over an image displays its description.
Images link out to the full image in the ContentDM viewer.

## Setup:

Navigate to the bottom of the file cdm-proxy.php to the line:
```php
$data = new CDMImages("your_cdm_path");
```

Change cdm to your_cdm_path leaving off the http(s)://, like so:  'dc.lib.edu'.  That's it.  You're now ready to roll.

## Usage:

Enter search phrases in double quotes, e.g. "Haw River".  You can enter a maximum of six search phrases and terms.  This
is the maximum number of phrases/terms the CONTENTdm API allows.  It will also return a maximum of 1024 records.  Again the most CONTENTdm will allow.