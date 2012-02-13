

module.exports = function(schema){
  schema.add({ createdAt: Date, modifiedAt: Date })

  schema.pre('save', function(next, done) {
    if (this.isNew)
      this.set('createdAt', new Date())

    this.set('modifiedAt', new Date())

    next()
  })
}