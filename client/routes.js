Router.configure({
  layoutTemplate: 'layout'
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
  });/*
  this.route('home', {
    path: '/',
    template: 'home'
  });*/
});