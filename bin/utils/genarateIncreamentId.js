export default function genarateIncreamentId(data) {
  // assign increament id for existing record
  data.forEach((record) => {
    record.id = data.indexOf(record) + 1;
  });
}
