var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myappdatabase');
var storySchema = new mongoose.Schema({
    date: Date,
    body: String
});
var Story = mongoose.Model('Story', storySchema);
var app = express();

// Location of public assets (JS, CSS, graphics):
app.use(express.static('public'));

// Request for home page:
app.get('/', function(request, response){
    response.sendfile('./views/index.html');
});

// Request for about page:
app.get('/about', function(request, response){
    response.sendfile('./views/about.html');
});

// Request for share page:
app.get('/share', function(request, response){
    response.sendfile('./views/share.html');
});

// Request for stories page:
app.get('/stories', function(request, response){
    response.sendfile('./views/stories.html');
});

// Request for stories JSON:
app.get('/stories', function(request, response){
    Story.find({}).sort('-date').exec(function(err, stories){
        if (err) {
            response.send(err);

            // @todo Send email to notify administator of error.

        }
        else {
            response.send(stories);
        }
    });
});

// Submission of a new story to be saved:
app.post('/story', function(request, response){
    var story = new Story({

        // @todo Use the correct request API to read input params.
        date: request.param('date'),
        body: request.param('text')
    });
    story.save(function(err){
        response.send({errorCode: err});
    });
});

app.listen(3000);   // @todo get port from environment



