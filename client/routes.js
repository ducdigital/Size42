Router.configure({
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
    layoutTemplate: 'layout',
    controller: 'ProductController'
  });
  this.route('shareverificatiom', {
    path: '/share/:_id',
    layoutTemplate: 'layout',
    controller: 'ShareController'
  });
});