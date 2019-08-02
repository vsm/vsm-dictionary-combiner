/**
 * File used to quick test the `getEntryMatchesForString` function of
 * `DictionaryCombiner.js`
 */

const DictionaryCombiner     = require('../src/DictionaryCombiner');
const VsmDictionaryUniprot   = require('vsm-dictionary-uniprot');
const VsmDictionaryEnsembl   = require('vsm-dictionary-ensembl');
const VsmDictionaryBioPortal = require('vsm-dictionary-bioportal');

const bioPortalAPIKey = '5904481f-f6cb-4c71-94d8-3b775cf0f19e';

const dictCombiner = new DictionaryCombiner({
  dictionaries: [
    new VsmDictionaryUniprot({log: true}),
    new VsmDictionaryBioPortal({apiKey: bioPortalAPIKey, log: true}),
    new VsmDictionaryEnsembl({log: true})
  ],
  errorIfAllErrors: false
});

dictCombiner.getEntryMatchesForString('tp53', { page: 1, perPage: 10,
  filter: { dictID: [
    'http://data.bioontology.org/ontologies/REXO',
    'https://www.ensembl.org'
  ]}
}, (err, res) => {
  if (err) console.log(JSON.stringify(err, null, 4));
  else {
    console.log(JSON.stringify(res, null, 4));
    console.log('\n#Results: ' + res.items.length);
  }
});
