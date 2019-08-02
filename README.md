# vsm-dictionary-combiner

## Summary

`vsm-dictionary-combiner` is an implementation 
of the 'VsmDictionary' parent-class/interface (from the package
[`vsm-dictionary`](https://github.com/vsmjs/vsm-dictionary)). It differs 
though from other vsm-dictionaries in the sense that it does not communicate
with any external data source directly, but gets results from other `vsm-dictionary-xyz` 
packages and combines them.

## Example use

To see an example of how to use this package to get results from 3 
vsm-dictionaries (namely [vsm-dictionary-uniprot](https://github.com/vsmjs/vsm-dictionary-uniprot), 
[vsm-dictionary-ensembl](https://github.com/vsmjs/vsm-dictionary-ensembl) and 
[vsm-dictionary-bioportal](https://github.com/vsmjs/vsm-dictionary-bioportal)), 
go to the `test` directory and run:
```js
node getDictInfos.test.js
node getEntries.test.js
node getEntryMatchesForString.test.js
```

## 'Build' configuration

To use a VsmDictionary in Node.js, one can simply run `npm install` and then
use `require()`. But it is also convenient to have a version of the code that
can just be loaded via a &lt;script&gt;-tag in the browser.

Therefore, we included `webpack.config.js`, which is a Webpack configuration 
file for generating such a browser-ready package.

By running `npm build`, the built file will appear in a 'dist' subfolder. 
You can use it by including: 
`<script src="../dist/vsm-dictionary-combiner.min.js"></script>` in the
header of an HTML file. 

Note that you should **always include** all other vsm-dictionaries that the 
combiner package will use either by using `require()` (in Node.js) or by 
including the specific script source for each package in the HTML header.

## Specification 

Since the `vsm-dictionary-combiner` follows the parent's class 
[specification](https://github.com/vsmjs/vsm-dictionary/blob/master/Dictionary.spec.md),
it supports the merging of results for the 4 functions:
- `getDictInfos`
- `getEntries`
- `getEntryMatchesForString`
- `getRefTerms`

For each of the above functions, the combiner module concatenates the results 
from the subsequent vsm-dictionaries calls, **in the order the dictionaries 
were given to the constructor**. This means that the `options.perPage` and 
`options.page` for example will be sent unchanged to each dictionary and no 
cutoff whatsoever will be applied to the merged result array object.

- A **key configuration option** is the `dictionaries` property - an array 
of VsmDictionary classes that the combiner package will use (other objects
are ignored):

```js
const DictionaryCombiner          = require('vsm-dictionary-combiner');
const VsmDictionaryUniprot        = require('vsm-dictionary-uniprot');
const VsmDictionaryEnsembl        = require('vsm-dictionary-ensembl');
const VsmDictionaryEnsemblGenomes = require('vsm-dictionary-ensembl-genomes');

const dictCombiner = new DictionaryCombiner({
  dictionaries: [
    new VsmDictionaryUniprot(),
    new VsmDictionaryEnsembl(),
    new VsmDictionaryEnsemblGenomes()
  ]
});
```

- Regarding *error handling*, we use the option: `errorIfAllErrors`. The default
value is *true* (or absent) which means that only if **all** of the subsequent 
vsm-dictionaries return an error, only then the combiner class returns a global 
error object by concatenating the subsequent error objects in an array `arr` and 
sending back the object: `{errors: arr}`. So, in that case even if some of the 
underlying vsm-dictionaries have errors, we still return the results from the 
other dictionaries (*flexible* error handling). If `errorIfAllErrors` is *false*, 
then we return the first error (object) that occurs (*strict* error handling).
