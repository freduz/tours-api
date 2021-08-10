const queryObject = { ...req.query };
const excludeFields = ['page', 'sort', 'limit', 'fields'];
excludeFields.forEach((el) => delete queryObject[el]);

let queryStr = JSON.stringify(queryObject);
queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
let query = Tour.find(JSON.parse(queryStr));

if (req.query.sort) {
  console.log(req.query.sort.split(',').join(' '));
  query = query.sort(req.query.sort.split(',').join(' '));
}

if (req.query.fields) {
  const fields = req.query.fields.split(',').join(' ');
  query = query.select(fields);
} else {
  query = query.select('-__v');
}

pageNumber = req.query.page * 1;
pageLimit = req.query.limit * 1;

skipValue = (pageNumber - 1) * pageLimit;

query = query.skip(skipValue).limit(pageLimit);
