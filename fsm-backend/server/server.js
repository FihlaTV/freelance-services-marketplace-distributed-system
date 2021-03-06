const connection        = new require('../resources/kafka-setup/Connection');
const mongoose          = require('../database/mongo/mongoose');
const producer          = connection.getProducer();
const userService       = require('../services/user/user.service');
const projectService    = require('../services/project/project.service');
const profileService    = require('../services/profile/profile.service');
const transactionService= require('../services/transaction/transaction.service');

// Consumers: [naming - consumer_service_topic]...Topics: [naming - service_function_topic]
const consumer_user_register        = connection.getConsumer('user_register_topic');
const consumer_user_login           = connection.getConsumer('user_login_topic');
const consumer_user_authenticate    = connection.getConsumer('user_authenticate_topic');

const consumer_project_post         = connection.getConsumer('project_post_topic');
const consumer_project_open         = connection.getConsumer('project_open_topic');
const consumer_project_relevant     = connection.getConsumer('project_relevant_topic');
const consumer_project_published    = connection.getConsumer('project_published_details');
const consumer_project_bids         = connection.getConsumer('project_bid_details');
const consumer_project_get_bids     = connection.getConsumer('project_get_bid_details_topic');
const consumer_project_details      = connection.getConsumer('project_project_details');
const consumer_post_bid             = connection.getConsumer('project_post_bid');
const consumer_submit_project       = connection.getConsumer('project_submit_project');
const consumer_hire_freelancer      = connection.getConsumer('project_hire_freelancer');

const consumer_profile_info         = connection.getConsumer('profile_update_info');
const consumer_profile_get_visitor  = connection.getConsumer('profile_fetch_visitor');

const consumer_transaction_details  = connection.getConsumer('transaction_user_details');
const consumer_transaction_submit   = connection.getConsumer('transaction_submit_details');
// Server and Database Logs
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection error: '));
db.once('open', function() { console.log("MongoDB Connection Successful! \n"); });
console.log('Backend Server is running!');

// Consumers
// ************** User **************
consumer_user_register.on('message', function (message) {

    console.log('User register message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    userService.handle_register_request(data.data, function(err,result){
        console.log('Register request handle: ' + JSON.stringify(result));
        let payloads = [{
                topic   : data.replyTo,
                messages: JSON.stringify
                ({
                    correlationId: data.correlationId,
                    data: result
                }),
                partition: 0
            }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

consumer_user_login.on('message', function (message) {

    console.log('User login message received');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    userService.handle_login_request(data.data, function(err,result){
        console.log('Login request handle: ' + JSON.stringify(result));
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

consumer_user_authenticate.on('message', function (message) {

    console.log('User authenticate message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    userService.handle_authenticate_request(data.data, function(err,result){
        console.log('Authenticate request handle: ' + JSON.stringify(result));
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

// ************** Project **************
consumer_project_post.on('message', function (message) {

    console.log('Post project message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    projectService.handle_post_project(data.data, function(err,result){
        console.log('Post project request handle: ' + JSON.stringify(result));
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

consumer_project_open.on('message', function (message) {

    console.log('Open project message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    projectService.handle_open_project(data.data, function(err,result){
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

consumer_project_relevant.on('message', function (message) {

    console.log('Relevant project message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    projectService.handle_relevant_project(data.data, function(err,result){
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

consumer_project_published.on('message', function (message) {

    console.log('Published project message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    projectService.handle_published_project(data.data, function(err,result){
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

consumer_project_bids.on('message', function (message) {

    console.log('Bid project message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    projectService.handle_bid_project(data.data, function(err,result){
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

consumer_project_get_bids.on('message', function (message) {

    console.log('Get Bid details message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    projectService.handle_get_bids_project(data.data, function(err,result){
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

consumer_project_details.on('message', function (message) {

    console.log('Fetch project details message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    projectService.handle_project_details(data.data, function(err,result){
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

consumer_post_bid.on('message', function (message) {

    console.log('Post bid message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    projectService.handle_posting_bid(data.data, function(err,result){
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

consumer_submit_project.on('message', function (message) {

    console.log('Submit project message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    projectService.handle_submit_project(data.data, function(err,result){
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

consumer_hire_freelancer.on('message', function (message) {

    console.log('Hire freelancer message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    projectService.handle_hire_freelancer(data.data, function(err,result){
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

// ************** Profile **************
consumer_profile_info.on('message', function (message) {

    console.log('Update profile information message received. ');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    console.log("Field: " + data.data.field);

    profileService.handle_profile_info(data.data, function(err,result){
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

consumer_profile_get_visitor.on('message', function (message) {

    console.log('Fetch visitor profile message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    profileService.handle_visitor_profile(data.data, function(err,result){
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

// ************** Transaction **************
consumer_transaction_details.on('message', function (message) {

    console.log('Fetch user transaction details message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    transactionService.handle_user_transaction(data.data, function(err,result){
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});

consumer_transaction_submit.on('message', function (message) {

    console.log('Submit user transaction details message received.');
    console.log(JSON.stringify(message.value));

    const data = JSON.parse(message.value);

    transactionService.handle_make_transaction(data.data, function(err,result){
        let payloads = [{
            topic   : data.replyTo,
            messages: JSON.stringify
            ({
                correlationId: data.correlationId,
                data: result
            }),
            partition: 0
        }];
        producer.send(payloads, function(err, data){
            console.log(data);
            console.log();
        });
        return;
    });
});