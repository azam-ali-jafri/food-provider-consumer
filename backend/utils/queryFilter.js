class QueryFilter {
  constructor(list, queryStr, coordinates) {
    this.list = list;
    this.queryStr = queryStr;
    this.coordinates = coordinates;
  }

  searchAndFilter = () => {
    const keyword = this.queryStr.address
      ? {
          address: {
            $regex: this.queryStr.address,
            $options: "i",
          },
        }
      : {};

    this.list = this.list.find(keyword);

    const rangeOptions = this.queryStr.range
      ? {
          location: {
            $geoWithin: {
              $centerSphere: [
                [this.coordinates[0], this.coordinates[1]],
                this.queryStr.range / 0.621371 / 3963.2,
              ],
            },
          },
        }
      : {
          location: {
            $geoWithin: {
              $centerSphere: [
                [this.coordinates[0], this.coordinates[1]],
                50 / 3963.2,
              ],
            },
          },
        };

    this.list = this.list.find(rangeOptions);

    if (range) {
      const miles = range / 0.621371;
      const options = {
        location: {
          $geoWithin: {
            $centerSphere: [
              [this.coordinates[0], this.coordinates[1]],
              miles / 3963.2,
            ],
          },
        },
      };
      this.list = this.list.find(options);
    }

    if (address) {
      const options = {
        address: {
          $regex: address,
          $options: "i",
        },
      };
      this.list = this.list.find(options);
    }

    if (foodName) {
      this.list = this.list.find({ name: foodName });
    }

    return this;
  };
}

module.exports = QueryFilter;
