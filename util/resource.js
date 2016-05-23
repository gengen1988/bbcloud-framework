module.exports = function resource(Model) {
  return {
    /**
     *
     */
    findAll: function(args, done) {
      var limit = args.limit;
      var offset = args.offset;

      Promise.all([
        Model.count(),
        Model.find()
      ]).spread(function(count, entities) {
        done(null, {count, entities});
      }).catch(function(err) {
        done(err);
      });
    },

    /**
     *
     */
    create: function(args, done) {
      var id = args.id;
      Model.findById(id).then(function(entity) {
        done(null, entity);
      }).catch(function(err) {
        done(err);
      });
    },

    /**
     *
     */
    findById: function(args, done) {
      var id = args.id;
      Model.findById(id).then(function(entity) {
        done(null, entity);
      }).catch(function(err) {
        done(err);
      });
    },

    /**
     *
     */
    updateById: function(args, done) {
      var id = args.id;
      Model.findById(id).then(function(entity) {
        done(null, entity);
      }).catch(function(err) {
        done(err);
      });
    },

    /**
     *
     */
    destroyById: function(args, done) {
      var id = args.id;
      Model.findById(id).then(function(entity) {
        done(null, entity);
      }).catch(function(err) {
        done(err);
      });
    }
  }
};
