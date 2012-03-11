TestController = function() {
  this.test = function() {
    this.response.write('Parameters: \n');
    for(param in this.parameters) {
      if(typeof(this.parameters[param]) == 'function') continue;

      this.response.write(param + " = " + this.parameters[param]);
      this.response.write('\n');
    }
    //this.response.end("Test controller greets you!\n");
    this.respond(); 
  }
}
