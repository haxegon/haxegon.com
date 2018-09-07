# haxegon.com

This is the source for the [Haxegon website](http://www.haxegon.com).

To build the site, make sure you have the following downloaded and installed first:

1. [Ruby version 2.2.5](https://www.ruby-lang.org/en/news/2016/04/26/ruby-2-2-5-released) or above.
2. [Jekyll version 3.7.3](https://jekyllrb.com) or above.
3. [Node.js and npm](https://nodejs.org).

The website is powered by Jekyll for static content, using a modified [Minima](https://github.com/jekyll/minima) theme. Refer to the [Jekyll documentation](https://jekyllrb.com/docs/home) for more information. Node.js is used to generate the documentation.

## Instructions

Once you have completed the above steps:

1. Clone the repository.
2. `cd repository`.
3. Run `bundle exec jekyll serve`.
4. Browse to `http://localhost:4000`.

To generate documentation:

1. Make your documentation modification in `commandlist.js`.
2. Run `node builddocs.js`.

The HTML files for the documentation will be generated into the `docs` folder.

## How To Contribute

Contributions are welcome! Feel free to contribute corrections, better examples or clearer documentation!