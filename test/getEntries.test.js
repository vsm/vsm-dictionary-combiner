/**
 * File used to quick test the `getEntries` function of
 * `DictionaryCombiner.js`
 */

const DictionaryCombiner     = require('../src/DictionaryCombiner');
const VsmDictionaryUniProt   = require('vsm-dictionary-uniprot');
const VsmDictionaryEnsembl   = require('vsm-dictionary-ensembl');
const VsmDictionaryBioPortal = require('vsm-dictionary-bioportal');

const bioPortalAPIKey = '5904481f-f6cb-4c71-94d8-3b775cf0f19e';

const dictCombiner = new DictionaryCombiner({
  dictionaries: [
    new VsmDictionaryUniProt({log: true}),
    new VsmDictionaryBioPortal({apiKey: bioPortalAPIKey, log: true}),
    new VsmDictionaryEnsembl({log: true})
  ],
  errorIfAllErrors: false
});

dictCombiner.getEntries({
  filter: {
    id: [
      'https://www.uniprot.org/uniprot/P52413',
      'https://www.ensembl.org/id/ENSG00000142208',
      'http://purl.bioontology.org/ontology/MEDDRA/10053571',
      'https://www.uniprot.org/uniprot/P53142'
    ],
    dictID: [
      'http://data.bioontology.org/ontologies/MEDDRA',
      'https://www.uniprot.org'
    ]
  },
  page: 1,
  perPage: 2
}, (err, res) => {
  if (err) console.log(JSON.stringify(err, null, 4));
  else {
    console.log(JSON.stringify(res, null, 4));
    console.log('\n#Results: ' + res.items.length);
  }
});
