var LOG = require("./node_modules/pdfreader/lib/LOG.js").toggle(false);
var PdfReader = require("PdfReader").PdfReader;
var TablerParser = require("PdfReader").TableParser;

const columnQuantitizer = (item) => parseFloat(item.x) >= 20;

var tableParser = new TablerParser();

var tableRow = {

};
for (let i = 0; i < 10; i++) {
  const columnName = 'col' + i;
  tableRow[columnName] = i;
}

console.log(tableRow);

tableRow['col1']
function printRawItems(filename, callback){
  new PdfReader().parseFileItems(filename, function(err, item){
    console.log(item);
    if (err)
      callback(err);
    else if (!item)
      callback();
    else if (item.file)
      console.log("file =", item.file.path);
    else if (item.page)
      console.log("page =", item.page);
    else if (item.x)
      console.log([item.x, item.y, item.oc, item.A, Math.floor(item.w), item.text].join("\t"));
    else
      console.warn(item);
  });
}

function printTableItems(filename, callback){
  new PdfReader().parseFileItems(filename, function(err, item){
    if (err)
      callback(err);
    else if (!item)
      callback();
    else if (item.x) {
      tableParser.processItem(item.text, item.y);
      console.log([item.x, item.y, item.oc, item.A, Math.floor(item.w), item.text].join("\t"));
    } else
      console.warn(item);
  });
}

var filename = process.argv[2];
if (!filename) {
  console.error("please provide the name of a PDF file");
}
else {
  console.warn("printing raw items from file:", filename, "...");
  printTableItems(filename, function(){
    console.warn("done.");
    console.log(tableParser.getRows());
  });
}
