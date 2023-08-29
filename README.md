## Hexlet tests and linter status:
[![Actions Status](https://github.com/TAndrei17/js-jest-testing-project-67/workflows/hexlet-check/badge.svg)](https://github.com/TAndrei17/js-jest-testing-project-67/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/c79b2bf94ca4952bca26/maintainability)](https://codeclimate.com/github/TAndrei17/js-jest-testing-project-67/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/c79b2bf94ca4952bca26/test_coverage)](https://codeclimate.com/github/TAndrei17/js-jest-testing-project-67/test_coverage)

### Step 1. Page Loader. Save html-page

Command-line utility "Page Loader". It downloads HTML from the provided URL and saves it in the projects folders. If the path is not specified, the file is created at the root of the project. If the directory doesn't exist, the utility raises an error.

[![asciicast](https://asciinema.org/a/602255.svg)](https://asciinema.org/a/602255)

### Steps 2-3. Page Loader. Save assets

The utility creates a directory for saving files: 'page_files'. After that, it retrieves the 'href' and 'src' attributes from the &lt;img&gt;, &lt;link&gt;, and &lt;script&gt; tags of the previously downloaded HTML-file. Subsequently, the utility generates links and downloads resources using these links. The 'href' and 'src' attributes in the original HTML-file are modified to point to the paths of the downloaded files. Resources from external pages are ignored.

[![asciicast](https://asciinema.org/a/605280.svg)](https://asciinema.org/a/605280)

