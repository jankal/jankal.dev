const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

const files = fs.readdirSync(path.resolve(__dirname, './content/articles'));

for (const file of files) {
  if (file.endsWith('.md')) {
    fs.rename(
      path.resolve(__dirname, './content/articles', file),
      path.resolve(
        __dirname,
        './content/articles',
        slugify(file.substr(0, file.length - 3), {
          lower: true,
          strict: true,
          locale: 'en'
        }) + '.md'
      ),
      (err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    );
  }
}
