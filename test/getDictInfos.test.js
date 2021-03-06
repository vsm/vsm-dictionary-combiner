/**
 * File used to quick test the `getDictInfos` function of
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

dictCombiner.getDictInfos({ filter: {
  id: [
    'https://www.uniprot.org',
    'https://www.ensembl.org',
    'http://data.bioontology.org/ontologies/CHEAR',
    'http://data.bioontology.org/ontologies/GO',
    'nonValidOntologyName'
  ]},
}, (err, res) => {
  if (err) console.log(JSON.stringify(err, null, 4));
  else {
    console.log(JSON.stringify(res, null, 4));
    console.log('\n#Results: ' + res.items.length);
  }
});