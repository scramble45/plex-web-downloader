var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  var config = res.locals.config;
  var db = config.init_db();

  var shows = [];

  // do all the basic operation later
  db.serialize(function() {

    db.each("SELECT id, title, year"
    + " FROM metadata_items "
    + " WHERE parent_id IS NULL AND library_section_id = ? "
    ,req.params.id, function(err, row) {
      shows.push(row);
    },
    //Nearly all the basic operations
    function(){
        console.log(shows);
        res.render('show_list', { title: 'List of series',shows: shows, channel_id: req.params.id });
    });

  });

  db.close();
});

module.exports = router;
