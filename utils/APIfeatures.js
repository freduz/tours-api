class APIfeatures {
  constructor(query, querySting) {
    this.query = query;
    this.querySting = querySting;
  }

  filter() {
    let queryStr = { ...this.querySting };

    const excludeFields = ['sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryStr[el]);
    let queryStringData = JSON.stringify(queryStr);

    queryStringData = queryStringData.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStringData));
    return this;
  }

  sort() {
    if (this.querySting.sort) {
      const sortBy = this.querySting.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createAt');
    }
    return this;
  }

  limitFields() {
    if (this.querySting.fields) {
      const fieldData = this.querySting.fields.split(',').join(' ');
      this.query = this.query.select(fieldData);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.querySting.page * 1 || 1;
    const limit = this.querySting.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIfeatures;
