module.exports = function runOncePlugin(pluginConf, web, next) {
	web.runOnce = function(id, func, cb) {
		if (!web.syspars) {
	      throw new Error('run-once plugin needs oils-plugin-syspars plugin');
	    } else {
	      web.syspars.get(id, function(err, syspar) {
	      	if (!syspar) {
	      		console.log('Running once: ' + id);

	      		func();

	      		web.syspars.set(id, 'Y', function(err, syspar) {
	      			if (cb) {
	      				cb(err, id);	
	      			}
	      		});
	      	}
	      });
	  	}
	};

	next();

}