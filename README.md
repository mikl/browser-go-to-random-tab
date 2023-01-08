# “Go to random tab” browser extension

Simple browser extension, provides a button to to switch to a random, open tab.

Compatible with [Firefox][], [Chrome][], and [Opera][], and
theoretically, all browsers supporting the Web Extensions API.

Uses [Iconic][] icons.

## Development

To publish a new version of the extension, package the extension in a zip file
with this command:

```sh
git archive --format zip --output ./go-to-random-tab.zip master
```

[Chrome]: https://google.com/chrome/
[Firefox]: https://mozilla.org/firefox
[Iconic]: https://useiconic.com/
[Opera]: http://www.opera.com/
