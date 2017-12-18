const path = require('path');
const config = require('./config');
const jsonServer = require('json-server');
const rules = require('./routes');
const dbfile = require(config.DB_FILE);

const ip = config.SERVER;
const port = config.PORT;

const server = jsonServer.create();
const router = jsonServer.router(dbfile());
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

router.render = (req, res) => {
    const data = res.locals.data;
    let count = eval(data).length;
    if (typeof (count) == "undefined") {
        count = 1;
    }
    console.log(eval(data).length);
    res.jsonp({
        count: count,
        result: data
    })
}

server.use((req, res, next) => {
    if (req.method === "PUT") {
        console.log(req.body);
        /*
		 res.jsonp({
			result:{},
			status:"ok"
         });*/
        next();
    } else {
        next();
    }

})

server.use("/api", router);
server.use(jsonServer.rewriter(rules));
server.use(router);

server.listen({
    host: ip,
    port: port,
}, function () {
    console.log(JSON.stringify(jsonServer));
    console.log(`JSON Server is running in http://${ip}:${port}`);
});