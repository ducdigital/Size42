if (Meteor.isServer) {
  Meteor.methods({
    getHomePage : function(){
      console.log("getHomePage()");
      return '<div class="list">\
\
  <a class="item item-icon-left" ui-sref="main.tabs.profile">\
    <i class="icon ion-email"></i>\
    Check mail From server\
  </a>\
\
  <a class="item item-icon-left item-icon-right" href="#">\
    <i class="icon ion-chatbubble-working"></i>\
    Call Ma\
    <i class="icon ion-ios7-telephone-outline"></i>\
  </a>\
\
  <a class="item item-icon-left" href="#">\
    <i class="icon ion-mic-a"></i>\
    Record album\
    <span class="item-note">\
      Grammy\
    </span>\
  </a>\
\
  <a class="item item-icon-left" href="#">\
    <i class="icon ion-person-stalker"></i>\
    Friends\
    <span class="badge badge-assertive">0</span>\
  </a>\
\
</div>';
    }
  });
}