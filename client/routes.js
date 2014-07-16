Router.configure({
  layoutTemplate: 'layout',
  fastRender: true
});

Router.onBeforeAction('loading');

Router.map(function() {
  this.route('home', {
    path: '/',  
    layoutTemplate: 'layoutHome',
    controller: 'HomeController'
  });
  this.route('product', {
    path: '/p/:_id',
    controller: 'ProductController'
  });
  this.route('shareverificatiom', {
    path: '/share/:_id',
    controller: 'ShareController'
  });
});