# Signal flag images

> International Code of Signals Flag image files in svg vector format.

## Quick start 1 - use in a document

### Download

Download a zip archive containing
[version 2.1.1](https://github.com/signal-flags/signal-flag-images/archive/v2.1.1.zip)
of our images.

For other versions and a `.tar.gz` dowload option see the
[release page on GitHub](https://github.com/signal-flags/signal-flag-images/releases).

### Extract the files

Software to extract zip archives is built in to many operating systems including
Windows, MacOS, and most flavours of Linux.

### Locate the files you want

The main designs are included in the four folders

- sf-outline
- sf-no-outline
- sf-square-outline
- sf-square-no-outline

We have also included images with square alphabet flags in primary colours; this
is the format used on
[WikiPedia](https://en.wikipedia.org/wiki/International_maritime_signal_flags)
and (except for the swallowtail flags A and B) in
[Flags Of the World](https://www.fotw.info/flags/xf~ics.html).

- sf-square-no-outline-primary

## Quick start 2 - use on a website

You can load a single image from the content delivery network (CDN) jsdelivr in
an image tag. You can control the size of the image either by setting properties
on the image itself:

```html
<img
  height="120px"
  src="https://cdn.jsdelivr.net/npm/signal-flag-images@2/sf-outline/a.svg"
/>
```

... or by wrapping in another element:

```html
<div style="width: 240px;">
  <img
    src="https://cdn.jsdelivr.net/npm/signal-flag-images@2/sf-outline/n1.svg"
  />
</div>
```

If you do it this way each image will be loaded separately which will be slow if
you have lots of images. In this case it would be better, and almost as easy,
to use the JavaScript software that generates these images. To see how to do
this visit https://signalflags.org/.

## Documentation

[![Build status](https://github.com/signal-flags/signal-flag-images/actions/workflows/build.yaml/badge.svg)](https://github.com/signal-flags/signal-flag-images/actions/workflows/build.yaml)

These images are free to use: see https://unlicense.org/.

The images are automatically generated by the `signal flags` open source
software for precision and consistency and includes designs for all flags
used internationally:

- Alphabet flags A-Z
- Numeral pennants 0-9
- Answering pennant (AP)
- 1st, 2nd and 3rd substitute
- Various flags defined in the Racing Rules of Sailing (Black Flag for starts,
  Blue and Yellow flags for match racing and umpires' flags).

Images are provided in the SVG vector format and five sets of flag images are
included with the following options:

- with or without outlines for ease of use in print or on screen
- 4x3 and square shapes for alphabet flags
- square alphabet flags in primary colours

These images were created on 15 March 2021 using
`signal-flags` version 2.0.2.
For more information and resources see the
[Signal Flags website](https://signalflags.org/).
