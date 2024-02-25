export function formatTable(data) {
  const headers = ["Name", "Email", "PhoneNumber", "Hobbies"];

//   headers.forEach((h) => console.log(data[h.toLowerCase()]));
  const maxLengths = {};
  headers.forEach(header => {
      maxLengths[header] = Math.max(header.length, ...data.map(item => item[header.toLowerCase()].length));
  });

  let table = headers.map(header => header.padEnd(maxLengths[header])).join(' | ') + '%3C%2Fbr%3E';

  const separator = headers.map(header => '-'.repeat(maxLengths[header])).join('-|-') + '%3C%2Fbr%3E';

  data.forEach(item => {
      table +=  headers.map(header => item[header.toLowerCase()].toString().padEnd(maxLengths[header])).join(' | ') + '%3C%2Fbr%3E';
  });

  return table;
}
