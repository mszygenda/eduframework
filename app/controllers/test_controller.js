TestController = function() {
  this.test = function() {
    this.viewModel.msg = "Hello World!";
    this.respond(); 
  }
}
