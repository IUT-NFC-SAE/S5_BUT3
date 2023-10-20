class ControllerAnswer {

    constructor() {
      if (ControllerAnswer.exists) {
        return ControllerAnswer.singleton
      }
      this.error = 0
      this.status = 200
      this.data = null
      ControllerAnswer.exists = true
      ControllerAnswer.singleton = this
      return this
    }
  
    /**
     * reset the fields to default state
     * CAUTION: normally, each controller function should call this function as their first instruction.
     */
    reset() {
      this.error = 0
      this.status = 200
      this.data = null
    }
  
    /**
     * set each of the three fields with a JSON object containing the same 3 fields.
     * @param obj
     */
    set(obj) {
      this.error = obj.error
      this.status = obj.status
      this.data = obj.data
    }
  
    /**
     * set only the err field
     * @param err
     */
    setError(error) {
      this.error = error
    }
  
    /**
     * set only the data field
     * @param data
     */
    setPayload(data) {
      this.data = data
    }
  
    /**
     * get the data field value
     * @return {null}
     */
    getPayload() {
      return this.data
    }
  
    /**
     * test if there is an error
     * @return {boolean}
     */
    isError() {q
      return this.error !== 0;
  
    }
  
    /**
     * get the error code
     * @return {number}
     */
    getError() {
      return this.error
    }
}

// create a single instance that is the only object exported
// Rk: the constructor is written to avoid that another call to new creates a new instance => singleton
const answer = new ControllerAnswer()

module.exports = {
  answer
}