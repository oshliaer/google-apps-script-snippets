Boolean.prototype.call = function () {
  return this;
};
/*
{
'eventType': [ENUM] 
'handlerFunction': [string]
'triggerSource': [ENUM]
'triggerSourceId': [string]
'uniqueId': [string]
} 
*/
function deleteTrigger(parameter) {
  Logger.log(parameter);
  var trgrs = ScriptApp.getProjectTriggers();
  if (trgrs.length == 0) return 0;
  //
  //  var res = [];
  //    for(var m in obj) {
  //        if(typeof obj[m] == "function") {
  //            res.push(m)
  //        }
  //    }
  //    return res;
  //
  //
  var eventType = parameter.eventType ? inArray_ : true;
  var handlerFunction = parameter.handlerFunction ? inArray_ : true;
  var triggerSource = parameter.triggerSource ? inArray_ : true;
  var triggerSourceId = parameter.triggerSourceId ? inArray_ : true;
  var uniqueId = parameter.uniqueId ? inArray_ : true;

  trgrs.forEach(function (tr) {
    if (
      eventType.call(tr, parameter.eventType, 'getEventType') &&
      handlerFunction.call(tr, parameter.handlerFunction, 'getHandlerFunction') &&
      triggerSource.call(tr, parameter.triggerSource, 'getTriggerSource') &&
      triggerSourceId.call(tr, parameter.triggerSourceId, 'getTriggerSourceId') &&
      uniqueId.call(tr, parameter.uniqueId, 'getUniqueId')
    ) {
      ScriptApp.deleteTrigger(tr);
    }
  });
}

function inArray_(values, nameFunct) {
  return values.indexOf(this[nameFunct]()) != -1;
}

function test() {
  var p = { handlerFunction: ['deleteTrigger'] };
  deleteTrigger(p);
}
