// File: components/Forwarder.js
var noflo = require("noflo");
var alasql = require("alasql");

exports.getComponent = function() {
  var component = new noflo.Component;
  component.description = "This component receives data and SQL expression,\
  process it and sends result data out to the output port";
  component.icon = 'database';

  component.inPorts.add('sql', { 
      datatype: 'string',
      description: 'SQL expression',
      control: true
  });

  component.inPorts.add('in', { 
      datatype: 'all',
      description: 'Result data'
  });

  component.outPorts.add('out', { datatype: 'all' });

  component.process(function (input,output) {

    if(!input.has('sql')) return;
    if(!input.has('in')) return;

    var sql = input.get('sql');
    var data = input.get('in');
    alasql.promise(sql.data, [eval(data.data)]).then(function(res){
      output.sendDone({out:res});
    }).catch(function(err){
      // Catch error
    });
  });

  return component; // Return new instance
};