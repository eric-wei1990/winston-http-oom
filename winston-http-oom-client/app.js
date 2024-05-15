'use strict';

const express = require('express');
const http = require('http');
const winston = require('winston');

const getOption = () => {
    return {
        transports: [
            new winston.transports.Http({
                host: 'localhost',
                path: '/log',
                port: 3030,
            })
        ]
    };
};
const logger = winston.createLogger(getOption());
const port = 3000;

const app = express();

app.use(require('express-status-monitor')());
app.use((req, res, next) => {
    logger.info("Log from winston http transport", {
        "logSource": "log-with-sdk",
        "logType": "winston",
        "projectName": "proj-001",
        "projectVersion": "1.0.0",
        "logLevel": "INFO",
        "method": "GET",
        "url": "/api/v3/sites/s_87088408979196312/report",
        "httpVersion": "1.1",
        "statusCode": "200",
        "responseTime": "0.672",
        "userAgent": "test",
        "logEnv": "dev",
        "body": "Log from winston http transport"
    });
    next();
})

app.use('/api', (req, res, next) => {
    res.json([{ "time": "2018-05-21T15:00Z", "day_of_week": 2, "detail_num_users": 115, "num_purchase": 132, "pay_amount": 306228390, "refund_pay_amount": 28774000 }, { "time": "2018-05-26T15:00Z", "day_of_week": 7, "detail_num_users": 19, "num_purchase": 21, "pay_amount": 41723130, "refund_pay_amount": 3145000 }, { "time": "2018-05-22T15:00Z", "day_of_week": 3, "detail_num_users": 12, "num_purchase": 15, "pay_amount": 35641430, "refund_pay_amount": 32594500 }, { "time": "2018-05-23T15:00Z", "day_of_week": 4, "detail_num_users": 13, "num_purchase": 14, "pay_amount": 40778000, "refund_pay_amount": 20478000 }, { "time": "2018-05-24T15:00Z", "day_of_week": 5, "detail_num_users": 12, "num_purchase": 14, "pay_amount": 28321000, "refund_pay_amount": 49085000 }, { "time": "2018-05-31T15:00Z", "day_of_week": 5, "detail_num_users": 11, "num_purchase": 11, "pay_amount": 24650530, "refund_pay_amount": 18915530 }, { "time": "2018-05-27T15:00Z", "day_of_week": 1, "detail_num_users": 5, "num_purchase": 6, "pay_amount": 8930000, "refund_pay_amount": 39318000 }, { "time": "2018-05-28T15:00Z", "day_of_week": 2, "detail_num_users": 8, "num_purchase": 12, "pay_amount": 18970000, "refund_pay_amount": 16365000 }, { "time": "2018-05-30T15:00Z", "day_of_week": 4, "detail_num_users": 8, "num_purchase": 9, "pay_amount": 24019000, "refund_pay_amount": 21678300 }, { "time": "2018-06-03T15:00Z", "day_of_week": 1, "detail_num_users": 7, "num_purchase": 8, "pay_amount": 6668530, "refund_pay_amount": 11546000 }, { "time": "2018-05-25T15:00Z", "day_of_week": 6, "detail_num_users": 10, "num_purchase": 12, "pay_amount": 27569000, "refund_pay_amount": 5130000 }, { "time": "2018-05-29T15:00Z", "day_of_week": 3, "detail_num_users": 2, "num_purchase": 2, "pay_amount": 2493000, "refund_pay_amount": 15301000 }, { "time": "2018-06-04T15:00Z", "day_of_week": 2, "detail_num_users": 4, "num_purchase": 8, "pay_amount": 13550900, "refund_pay_amount": 12060000 }, { "time": "2018-06-02T15:00Z", "day_of_week": 7, "detail_num_users": 6, "num_purchase": 6, "pay_amount": 13535030, "refund_pay_amount": 23073000 }, { "time": "2018-05-20T15:00Z", "day_of_week": 1, "detail_num_users": 2, "num_purchase": 2, "pay_amount": 3546000, "refund_pay_amount": 15915000 }, { "time": "2018-05-19T15:00Z", "day_of_week": 7, "detail_num_users": 4, "num_purchase": 4, "pay_amount": 7582200, "refund_pay_amount": 0 }, { "time": "2018-05-17T15:00Z", "day_of_week": 5, "detail_num_users": 0, "num_purchase": 0, "pay_amount": 0, "refund_pay_amount": 2451000 }, { "time": "2018-06-01T15:00Z", "day_of_week": 6, "detail_num_users": 1, "num_purchase": 1, "pay_amount": 2647000, "refund_pay_amount": 2647000 }]);
});

if (require.main === module) {
    try {
        http.createServer(app).listen(port, () => {
            console.log(`Winston client app listening on port ${port}`)
        });
    } catch (err) {
        process.exit(1);
    }
}

process.on('uncaughtException', (e) => {
    console.error(e);
});

process.on('unhandledRejection', (e) => {
    console.error(e);
});