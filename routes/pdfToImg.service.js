var Canvas = require('canvas');
var assert = require('assert');
var fs = require('fs');

module.exports = (fileName,res) => {
  function NodeCanvasFactory() {}
  NodeCanvasFactory.prototype = {
    create: function NodeCanvasFactory_create(width, height) {
      assert(width > 0 && height > 0, 'Invalid canvas size');
      var canvas = new Canvas(width, height);
      var context = canvas.getContext('2d');
      return {
        canvas: canvas,
        context: context,
      };
    },

    reset: function NodeCanvasFactory_reset(canvasAndContext, width, height) {
      assert(canvasAndContext.canvas, 'Canvas is not specified');
      assert(width > 0 && height > 0, 'Invalid canvas size');
      canvasAndContext.canvas.width = width;
      canvasAndContext.canvas.height = height;
    },

    destroy: function NodeCanvasFactory_destroy(canvasAndContext) {
      assert(canvasAndContext.canvas, 'Canvas is not specified');

      // Zeroing the width and height cause Firefox to release graphics
      // resources immediately, which can greatly reduce memory consumption.
      canvasAndContext.canvas.width = 0;
      canvasAndContext.canvas.height = 0;
      canvasAndContext.canvas = null;
      canvasAndContext.context = null;
    },
  };

  var pdfjsLib = require('pdfjs-dist');

  // Relative path of the PDF file.
  var pdfURL = 'storage/'+fileName;

  // Read the PDF file into a typed array so PDF.js can load it.
  var rawData = new Uint8Array(fs.readFileSync(pdfURL));

  // Load the PDF file. The `disableFontFace` and `nativeImageDecoderSupport`
  // options must be passed because Node.js has no native `@font-face` and
  // `Image` support.
  pdfjsLib.getDocument({
    data: rawData,
    disableFontFace: true,
    nativeImageDecoderSupport: 'none',
  }).then(function (pdfDocument) {
    console.log('# PDF document loaded.');

    // Get the first page.
    pdfDocument.getPage(1).then(function (page) {
      // Render the page on a Node canvas with 100% scale.
      var viewport = page.getViewport(1.0);
      var canvasFactory = new NodeCanvasFactory();
      var canvasAndContext = canvasFactory.create(viewport.width, viewport.height);
      var renderContext = {
        canvasContext: canvasAndContext.context,
        viewport: viewport,
        canvasFactory: canvasFactory
      };

      page.render(renderContext).then(function () {
        // Convert the canvas to an image buffer.
        var image = canvasAndContext.canvas.toBuffer();
        fs.writeFile('storage/'+fileName+'.png', image, function (error) {
          if (error) {
            console.error('Error: ' + error);
          } else {
            console.log('Finished converting first page of PDF file to a PNG image.');
            res.json({error_code:0,err_desc:null});
            // return 6;
          }
        });
      });
    });
  }).catch(function(reason) {
    console.log(reason);
  });
}
