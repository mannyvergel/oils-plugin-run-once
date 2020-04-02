module.exports = async function runOncePlugin(pluginConf, web) {
	if (!web.syspars) {
    throw new Error('run-once plugin needs oils-plugin-syspars plugin');
  }

	web.runOnce = async function(id, func, cb) {
    let syspar = await web.syspars.get(id);
  	if (!syspar) {
  		console.log('Running once: ' + id);
  		await func();
  		await web.syspars.set(id, 'Y');
  	}

  	if (cb) {
  		cb();
  	}
	};

}