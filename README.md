# Signal flag images

> International Code of Signals Flag image files in svg vector format.

## Quick start 1

Go to the (signalflags.org)[https://signalflags.org/] website where you can see
all of our images and download them all or copy and paste them individually in
a couple of clicks.

## Quick start 2 - use in a document

### Download

Download a zip archive containing
[version 3.0.0](https://github.com/signal-flags/signal-flag-images/archive/v3.0.0.zip)
of our images.

For other versions and a `.tar.gz` dowload option see the
[release page on GitHub](https://github.com/signal-flags/signal-flag-images/releases).

### Extract the files

Software to extract zip archives is built in to many operating systems including
Windows, MacOS, and most flavours of Linux.

### Locate the files you want

The image files are located in the following directories:

|                                          | A-Z and other flags            | 0-9 and answering pennants      | substitutes                      |
| ---------------------------------------- | ------------------------------ | ------------------------------- | -------------------------------- |
| Main set (natural colours with outlines) | `sf-rectangle-outline`         | `sf-pennant-outline`            | `sf-triangle-outline`            |
| Alternative shapes                       | `sf-square-outline`            | `sf-short-outline`              |                                  |
| Without outlines                         | `sf-rectangle-no-outline`      | `sf-pennant-no-outline`         | `sf-triangle-no-outline`         |
| Alternative shapes without outlines      | `sf-square-no-outline`         | `sf-short-no-outline`           |                                  |
| Primary colours without outlines         | `sf-square-no-outline-primary` | `sf-pennant-no-outline-primary` | `sf-triangle-no-outline-primary` |

### Insert the images into a document

Use the functions of the editing software you are using to insert the images you
want and resize them appropriately.

## Quick start 3 - use on a website

If you just want to try something out you can load a single image from the
content delivery network (CDN)
[jsdelivr](https://www.jsdelivr.com/)
in an image tag. You can control the size of the image either by setting
properties on the image itself:

```html
<img
  height="120px"
  src="https://cdn.jsdelivr.net/npm/signal-flag-images@3/sf-rectangle-outline/a.svg"
/>
```

... or by wrapping in another element:

```html
<div style="width: 240px;">
  <img
    src="https://cdn.jsdelivr.net/npm/signal-flag-images@3/sf-pennant-outline/n1.svg"
  />
</div>
```

This is going to slow down your website though, so you will be better off
downloading all the images from the link above and saving them in your website.
Better still, and almost as easy, is using the JavaScript software that
generates these images. To see how to do this visit https://signalflags.org/.

## Documentation

These images are free to use: see https://unlicense.org/.

The images are automatically generated by the `signal flags` open source
software for precision and consistency and includes designs for all flags
used internationally:

- Alphabet flags A-Z
- Numeral pennants 0-9
- Answering pennant (AP)
- First, second, third and fourth substitutes.
- All flags used in the Racing Rules of Sailing:
  - orange flag for the start line
  - black flag for starts
  - blue and yellow flags for match racing
  - umpires’ green, green and white and red flags, and a black and white flag
    for team racing umpires
  - +/-, red square and green triangle flags for moving marks.

Images are provided in the SVG vector format and sets of flag images are
included with the following options:

- with or without outlines for ease of use in print or on screen against any
  background
- 4×3 or square shapes for alphabet and other flags
- 3×1 or 2×1 ('short') shapes for pennants
- square alphabet flags, short pennants and triangles in primary colours for 3rd
  party compatibility.

## Changes

**v3.0.0** _30 March 2021_
Version 3 introduces a new directory structure which breaks compatibility with
previous versions. Images are now sorted into separate directories described
above (individual flag names have not changed however). In addition, v3 has the
following new features and improvements:

- 11 new flags
- improvements to some designs for greater familiarity with 'real' flags and
  pennants (I, P and S flags and 1 and 2 pennents)
- pennants are now in a 3×1 aspect ratio, again for greater familiarity
  with the prototype (2×1 aspect ratio pennants are still available as `short`
  pennants)
- images are now grouped into directories by 'type' (flag, pennant, triangle),
  avoiding the duplication of identical images in previous versions.

**v2.2.0** _16 March 2021_

- White elements are now 'white smoke' `#f5f5f5` (except for primary colour
  option).

**v2.1.1** _15 March 2021_

- Fixed path of bottom white stripe on 3rd Substitute.

**v2.1.1** _15 March 2021_

- Breaking: new images folder locations.

These images were created on 30 March 2021 using
`signal-flags` version 2.4.0.
For more information and resources see the
[Signal Flags website](https://signalflags.org/).
