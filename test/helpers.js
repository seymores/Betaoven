

exports.clone = function(obj, target){
  Object.keys(target).forEach(function(key){
    if (target.hasOwnProperty(key))
      obj[key] = target[key]
  })

  return obj
}