Router.configure({
  layoutTemplate: 'layout',
  fastRender: true
});

Router.onBeforeAction('loading');

Router.map(function() {
  this.route('home', {
    path: '/',
    controller: 'HomeController'
  });
  this.route('product', {
    path: '/p/:_id',
    controller: 'ProductController'
  });
});