// Imports:
import { JournalEntry } from '../models'

// Constants:
const journalEntries = [
  {
    author: {
      email: 'kt@tdmn.co',
      firstname: 'Kasper',
      id: '1',
      lastname: 'Tidemann'
    },
    content: 'Greve, Denmark – We are tremendously happy and proud to announce the opening of the brand new Alefarm Brewing at the new location in Greve, just outside Copenhagen.\n\nWe have been on a journey that took nearly a year from finding the right location to getting all equipment installed and running smoothly. It has been quite the ride - fun, challenging and deeply rewarding.\n\nAt the new brewery, we have invested in a 26 hectoliter brewhouse along with 10 fermentation tanks. Combined with our new canning line, this makes for an excellent setup to get fresh beers out the door.\n\nWe will have a fixed line-up of beers supplemented by seasonal offerings, new releases and collaborations. The production is carried forward by an explorative, creative and spontaneous brewing philosophy.\n\nWe are delighted to welcome two new brewers, a brand manager and an operations manager to the Alefarm family. Every single person at Alefarm Brewing is a part of our common story and we are ecstatic to have such talented people join us.\n\nI would like to say a profound thank you to everyone involved in the process. Thank you for helping out, for believing in us and for lending an ear when times were tough.\n\nNow, good times await and excellent beers are to be made. We are so excited and look forward to welcoming you to the new brewery. Cheers!',
    created: '2018-07-24T10:13:23.120Z',
    excerpt: 'We are tremendously happy and proud to announce the opening of the brand new Alefarm Brewing at the new location in Greve, just outside Copenhagen.',
    id: '1',
    slug: 'proudly-presenting-alefarm-brewing-2-0',
    title: 'Proudly presenting Alefarm Brewing 2.0'
  },
  {
    author: {
      email: 'kt@tdmn.co',
      firstname: 'Kasper',
      id: '1',
      lastname: 'Tidemann'
    },
    content: 'Gentofte, Denmark – We are pleased to announce the general availability of <a href="https://github.com/tdmnco/model-js/releases/tag/0.1.0">Model.js in version 0.1.0</a>, a fresh release that contains new features for working with data models in modern web applications.\n\nNotable additions to the library include enhanced querying capabilities along with improved test coverage and bug fixes. All changes are listed in <a href="https://github.com/tdmnco/model-js/blob/master/CHANGELOG.md">the changelog</a> of the project.\n\nThis release is a part of our ongoing effort to open source the work that we do. Sharing is caring and open source benefits all of us. We are excited to share even more with you in the future. Happy coding!',
    created: '2018-07-28T10:13:23.120Z',
    excerpt: 'Fresh off the code press is the release of Model.js version 0.1.0, our simple model layer for modern web applications.',
    id: '2',
    slug: 'release-of-model-js-version-0-1-0',
    title: 'Release of Model.js version 0.1.0'
  }
]

// Context:
for (let journalEntry of journalEntries) {
  new JournalEntry(journalEntry).save()
}

// Exports:
export { journalEntries }
