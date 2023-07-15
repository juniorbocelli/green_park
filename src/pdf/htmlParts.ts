export const css = `
@import url("//fonts.googleapis.com/css?family=Montserrat:400,500,600,700");

body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #fafafa;
  color: #414142;
  font: 12pt "Montserrat", sans-serif;
  -webkit-print-color-adjust: exact !important;
}
* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.page-container {
  width: 210mm;
  min-height: 297mm;
  padding: 0mm;
  margin: 10mm auto;
  border: 1px #d3d3d3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.page-inner {
  padding: 0;
  height: 297mm;
  padding: 10mm;
}

.page-inner table,
.page-inner td,
.page-inner th {
  padding: 0.5mm;
  border-collapse: collapse;
  border: 1px solid #414142;
  font-size: 1mm;
}

@page {
  size: A4;
  margin: 0;
}

@media print {
  html,
  body {
    width: 210mm;
    height: 297mm;
  }
  .page-container {
    margin: 0;
    border: initial;
    border-radius: initial;
    width: initial;
    min-height: initial;
    box-shadow: initial;
    background: initial;
    page-break-after: always;
  }
}
table {
  margin-top: 1cm;
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}`;

export const startDocument = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <title>Page</title>

    <style>
      {{css}}
    </style>
  </head>

  <body>
  <page size="A4">`;

export const endDocument = `
    </page>
  </body>
</html>`;

export const startTable = `
<table>
  <tr>
    <th>ID</th>
    <th>Nome do Sacado</th>
    <th>Id do Lote</th>
    <th>Nome do Lote</th>
    <th>Valor</th>
    <th>Linha Digitável</th>
  </tr>`;

export const endTable = `
</table>`;

export const newTableRow = `
<tr>
  <td>{{id}}</td>
  <td>{{payerName}}</td>
  <td>{{idLot}}</td>
  <td>{{name}}</td>
  <td>{{value}}</td>
  <td>{{customText}}</td>
</tr>`;