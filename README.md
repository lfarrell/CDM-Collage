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

Enter up to six search terms.  This is the maximum number of phrases/terms the CONTENTdm API allows.
If looking for a phrase put it in double quotes, e.g. "Haw River".    The application will also return a maximum of 1024 records;
 again, this is the most CONTENTdm will allow.