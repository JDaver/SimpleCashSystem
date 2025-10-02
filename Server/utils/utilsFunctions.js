function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // +1 perché i mesi partono da 0
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function groupingPartiesBuilder(partiesResult) {
  const partiesMap = {};
  partiesResult.rows.forEach((row) => {
    if (!partiesMap[row.product_id]) partiesMap[row.product_id] = [];
    partiesMap[row.product_id].push({
      party_id: row.party_id,
      name_party: row.name_party,
    });
  });
  return partiesMap;
}

module.exports = { formatDate, groupingPartiesBuilder };
