Template.share.helpers({
	isShared: function () {
		return Session.get("shareResult") || false;
	},
	isFailed: function () {
		return (Session.get("shareResult") == -1);
	}
});

Template.share.rendered = function() {
	if(!this._rendered) {
		this._rendered = true;

		Deps.autorun(function(){
		  if(Meteor.userId() && Session.get("shareResult") == false){
			Meteor.call("verifyShare", Router.current().params._id, function(err, result){
				Session.set("shareResult", result);
			});
		  }
		});
	}
}
