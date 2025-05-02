const { JSDOM } = require("jsdom");

function cleanHtmlBody(html) {
  const dom = new JSDOM(html);
  const body = dom.window.document.body;
  console.log('attr', body.attributes);

//   function removeAttributeRecursively(element) {
//     if (element.nodeType === 1) {
//       [...element.attributes].forEach((attr) => element.removeAttribute(attr));
//       [...element.children].forEach((child) =>
//         removeAttributeRecursively(child)
//       );
//     }
//   }

//   removeAttributeRecursively(body);

// Recursively remove attributes from a node and its entire subtree
function cleanNode(node) {
    if (node.nodeType === 1) {
      // Remove all attributes
      while (node.attributes.length > 0) {
        node.removeAttribute(node.attributes[0].name);
      }
      // Recurse into children
      Array.from(node.childNodes).forEach(child => cleanNode(child));
    }
  }

  cleanNode(body);

  return `<div>${body.innerHTML}</div>`;
}

if (require.main === module) {
  const fs = require("fs");
  const inputHtml = fs.readFileSync("sample.html", "utf-8");
  const output = cleanHtmlBody(inputHtml);
  const jsonResponse = {
    html: output
  }
  const safeJson = JSON.stringify(jsonResponse);
  console.log("🚀 ~ safeJson:", safeJson)
  
  fs.writeFileSync("output.html", output);
  console.log("ok");
}

module.exports = cleanHtmlBody;
